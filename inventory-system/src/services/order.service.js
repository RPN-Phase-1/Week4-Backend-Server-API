const httpStatus = require('http-status');
const prisma = require('../../prisma/client');
const ApiError = require('../utils/ApiError');

const createOrder = async (orderBodys) => {
  return await prisma.order.create({
    data: orderBodys
  });
};

const getOrders = async () => {
  return await prisma.order.findMany();
};

const getOrderById = async (orderId) => {
  return await prisma.order.findFirst({
    where: {id: orderId}
  });
};

const updateOrderById = async (orderId, orderBodys) => {
  const order = await getOrderById(orderId);

  if(!order) throw new ApiError(httpStatus.NOT_FOUND, 'order not found');

  return await prisma.order.update({
    where: {id: orderId},
    data: orderBodys
  });
};

const deleteOrderById = async (orderId) => {
  const order = await getOrderById(orderId);

  if(!order) throw new ApiError(httpStatus.NOT_FOUND, 'order not found');

  return await prisma.order.delete({
    where: {id: orderId}
  });
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById
}