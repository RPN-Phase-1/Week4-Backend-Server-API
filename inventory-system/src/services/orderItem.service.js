const httpStatus = require('http-status');
const prisma = require('../../prisma/client')
const ApiError = require('../utils/ApiError');

/**
 * Create a orderitem
 * @param {Object} orderItemBody
 * @returns {Promise<OrderItem>}
 */
const createOrderItem = async (orderItemBody) => {

    
    const currentProduct = await prisma.product.findUnique({
        where:{
            id: orderItemBody.productId,
        },
    })

    const currentOrder = await prisma.order.findUnique({
        where:{
            id: orderItemBody.orderId,
        },
    })

    if (!currentProduct) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }

    if (!currentOrder) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
    }


    if(orderItemBody.quantity > currentProduct.quantityInStock){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Insufficient stock');
    }

    const updatedProduct = await prisma.product.update({
        where: {
          id: orderItemBody.productId,
        },
        data: {
          quantityInStock: currentProduct.quantityInStock - orderItemBody.quantity,
        },
      });
    
    const totalPriceProduct = orderItemBody.quantity * orderItemBody.unitPrice;
    const totalPriceOrder = totalPriceProduct + currentOrder.totalPrice;

    const updatedOrder = await prisma.order.update({
        where:{
            id: orderItemBody.orderId,
        },
        data:{
            totalPrice: totalPriceOrder,
        }
    })


//   return prisma.orderItem.create({
//     data: orderItemBody
//   });
};

/**
 * Query for orderItems
 * @returns {Promise<QueryResult>}
 */
const queryOrderItems = async (filter, options) => {
  const orderItems = await prisma.orderItem.findMany();
  return orderItems;
};

/**
 * Get orderItem by id
 * @param {ObjectId} id
 * @returns {Promise<OrderItem>}
 */
const getOrderItemById = async (id) => {
  return prisma.orderItem.findFirst({
    where: {
      id: id
    }
  })
};

/**
 * Update orderItem by id
 * @param {ObjectId} orderItemId
 * @param {Object} updateBody
 * @returns {Promise<OrderItem>}
 */
const updateOrderItemById = async (orderItemId, updateBody) => {
  const orderItem = await getOrderItemById(orderItemId);
  if (!orderItem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'orderItem not found');
  }
  
  const updateOrderItem = await prisma.orderItem.update({
    where: {
      id: orderItemId,
    },
    data: updateBody
  })

  return updateOrderItem;
};

/**
 * Delete orderitem by id
 * @param {ObjectId} orderItemId
 * @returns {Promise<OrderItem>}
 */
const deleteOrderItemById = async (orderItemId) => {
  const orderItem = await getOrderItemById(orderItemId);
  if (!orderItem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'orderItem not found');
  }

  const deleteOrderItems = await prisma.orderItem.deleteMany({
    where: {
      id: orderItemId
    },
  })

  return deleteOrderItems;
};

module.exports = {
  createOrderItem,
  queryOrderItems,
  getOrderItemById,
  updateOrderItemById,
  deleteOrderItemById,
};