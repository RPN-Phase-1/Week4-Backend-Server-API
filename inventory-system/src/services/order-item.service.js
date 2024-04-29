const httpStatus = require('http-status');
const prisma = require('../../prisma/client');
const ApiError = require('../utils/ApiError');

const createOrderItem = async (orderItemBodys) => {
  const createOrderItem = await prisma.orderItem.create({
    data: orderItemBodys
  })

  return createOrderItem
};

const getOrderItems = async () => {
  return prisma.orderItem.findMany()
};

const getOrderItemById = async (orderItemId) => {
  const getOrderItem = await prisma.orderItem.findFirst({
    where: {id: orderItemId}
  })

  return getOrderItem
};

const updateOrderItemById = async (orderItemId, orderItemBodys) => {
  const orderItem = await getOrderItemById(orderItemId)

  if(!orderItem) throw new ApiError(httpStatus.NOT_FOUND, 'order Item not found');

  const updateOrderItem = await prisma.orderItem.update({
    where: {id: orderItemId},
    data: orderItemBodys
  })

  return updateOrderItem
};

const deleteOrderItemById = async (orderItemId) => {
  const orderItem = await getOrderItemById(orderItemId)

  if(!orderItem) throw new ApiError(httpStatus.NOT_FOUND, 'order Item not found');

  const deleteOrderItem = await prisma.orderItem.delete({
    where: {id: orderItemId}
  })

  return deleteOrderItem
}

module.exports = {
  createOrderItem,
  getOrderItems,
  getOrderItemById,
  updateOrderItemById,
  deleteOrderItemById
}