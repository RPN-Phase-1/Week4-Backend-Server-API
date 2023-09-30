const httpStatus = require('http-status');
const prisma = require('../../prisma/client')
const ApiError = require('../utils/ApiError');

const createOrderItem = async (orderItemBody) => {
    const product = await prisma.product.findUnique({
        where: { id: orderItemBody.productId },
    });

    const order = await prisma.order.findUnique({
        where: { id: orderItemBody.orderId },
    });

    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
    }
    if (!order) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Order not found')
    }

    if (orderItemBody.quantity > product.quantityInStock) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Out of stock');
    }

    await prisma.product.update({
        where: { id: product.id },
        data: {
            quantityInStock: product.quantityInStock - orderItemBody.quantity,
        },
    });

    return prisma.orderItem.create({
        data: orderItemBody
    })
}

const queryOrderItems = async (filter, options) => {
    const { keyword } = !filter
    const { page, maxRow } = !options

    const orderItems = await prisma.orderItem.findMany({
        skip: page && parseInt(page),
        take: maxRow && parseInt(maxRow),
        orderBy: {
            createdAt: 'asc'
        }
    })

    return orderItems
}

const getOrderItemById = async (id) => {
    return prisma.orderItem.findFirst({
        where: {
            id
        }
    })
}

const updateOrderItemById = async (orderItemId, updateBody) => {
    const orderItem = await prisma.orderItem.findUnique({
        where: { id: orderItemId },
        include: {
            product: true,
        },
    });

    const order = await prisma.order.findUnique({
        where: { id: updateBody.orderId },
    });

    if (!orderItem) {
        throw new ApiError(httpStatus.NOT_FOUND, 'OrderItem not found')
    }
    if (!order) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Order not found')
    }

    if ((updateBody.quantity - orderItem.quantity) > orderItem.product.quantityInStock) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Out of stock');
    }

    await prisma.product.update({
        where: { id: orderItem.productId },
        data: {
            quantityInStock: orderItem.product.quantityInStock - (updateBody.quantity - orderItem.quantity),
        },
    });

    const updateOrderItem = await prisma.orderItem.update({
        where: {
            id: orderItemId
        },
        data: updateBody
    })

    return updateOrderItem
}

const deleteOrderItemById = async (orderItemId) => {
    const orderItem = await getOrderItemById(orderItemId)
    if (!orderItem) {
        throw new ApiError(httpStatus.NOT_FOUND, 'OrderItem not found')
    }

    const deleteOrderItem = await prisma.orderItem.delete({
        where: {
            id: orderItemId
        },
    })

    return deleteOrderItem
}

module.exports = {
    createOrderItem,
    queryOrderItems,
    getOrderItemById,
    updateOrderItemById,
    deleteOrderItemById,
}