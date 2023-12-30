const httpStatus = require('http-status');
const prisma = require('../../prisma/client')
const ApiError = require('../utils/ApiError');
const { deleteOrderItemById } = require('./orderItem.service');

/**
 * Create a order
 * @param {Object} orderBody
 * @returns {Promise<Order>}
 */
const createOrder = async (orderBody) => {
  return prisma.order.create({
    data: orderBody
  });
};

/**
 * Query for orders
 * @returns {Promise<QueryResult>}
 */
const queryOrders = async (filter, options) => {
  const orders = await prisma.order.findMany();
  return orders;
};

/**
 * Get order by id
 * @param {ObjectId} id
 * @returns {Promise<Order>}
 */
const getOrderById = async (id) => {
  return prisma.order.findFirst({
    where: {
      id: id
    }
  })
};

/**
 * Update order by id
 * @param {ObjectId} orderId
 * @param {Object} updateBody
 * @returns {Promise<Order>}
 */
const updateOrderById = async (orderId, updateBody) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  
  const updateOrder = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: updateBody
  })

  return updateOrder;
};

/**
 * Delete order by id
 * @param {ObjectId} orderId
 * @returns {Promise<Order>}
 */
const deleteOrderById = async (orderId) => {
  const orderItems = await prisma.orderItem.findMany({
    where:{
      orderId:orderId
    }
  })
  if (!orderItems || orderItems.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order items not found');
  }

  for(const orderItem of orderItems){
    await deleteOrderItemById(orderItem.id)
  }


  const deleteOrders = await prisma.order.deleteMany({
    where: {
      id: orderId
    },
  })

  return deleteOrders;
};

const getAllOrder = async (skip=0, take=10) => {
  const orders = await prisma.order.findMany({
    skip: parseInt(skip),
    take: parseInt(take),
  });
  return orders;
};

module.exports = {
  createOrder,
  queryOrders,
  getOrderById,
  getAllOrder,
  updateOrderById,
  deleteOrderById,
};