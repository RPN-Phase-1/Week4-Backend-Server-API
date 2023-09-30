const httpStatus = require('http-status');
const prisma = require('../../prisma/client')
const ApiError = require('../utils/ApiError');

const createOrder = async (orderBody) => {
    return prisma.order.create({
        data: orderBody
    })
}

const queryOrders = async (filter, options) => {
    const { keyword } = !filter
    const { page, maxRow } = !options

    const orders = await prisma.order.findMany({
        skip: page && parseInt(page),
        take: maxRow && parseInt(maxRow),
        orderBy: {
            date: 'asc'
        }

    })

    return orders
}

const getOrderById = async (id) => {
    return prisma.order.findFirst({
        where: {
            id
        }
    })
}

const updateOrderById = async (orderId, updateBody) => {
    const order = await getOrderById(orderId)
    if (!order) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Order not found')
    }

    const updateOrder = await prisma.order.update({
        where: {
            id: orderId
        },
        data: updateBody
    })

    return updateOrder
}

const deleteOrderById = async (orderId) => {
    const order = await getOrderById(orderId)
    if (!order) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Order not found')
    }

    const deleteOrder = await prisma.order.delete({
        where: {
            id: orderId
        },
    })

    return deleteOrder
}

const queryOrderItems = async (orderId, filter, options) => {
    const { keyword } = !filter
    const { page, maxRow } = !options

    const orderItems = await prisma.order.findMany({
        where: {
            id: orderId,
        },
        skip: page && parseInt(page),
        take: maxRow && parseInt(maxRow),
        orderBy: {
            date: 'asc'
        },
        include: {
            orderItem: true
        }
    })
    return orderItems
}

module.exports = {
    createOrder,
    queryOrders,
    getOrderById,
    updateOrderById,
    deleteOrderById,
    queryOrderItems,
}