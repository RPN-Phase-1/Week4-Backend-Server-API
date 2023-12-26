const httpStatus = require('http-status');
const prisma = require('../../prisma/client');
const ApiError = require('../utils/ApiError');

const getOrders = async (page, size) => {
  return prisma.order.findMany({
    skip: page,
    take: size,
  });
};

const getOrderById = async (orderId) => {
  return prisma.order.findFirst({
    where: {
      id: orderId,
    },
  });
};

const updateOrder = async (orderId, updateBody) => {
  return prisma.order.update({
    where: {
      id: orderId,
    },
    data: updateBody,
  });
};

const deleteOrder = async (orderId) => {
  const order = await getOrderById(orderId);
  if (!order) throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');

  return prisma.order.deleteMany({
    where: {
      id: orderId,
    },
  });
};

const createOrder = async (orderBody) => {
  return prisma.order.create({
    data: orderBody,
  });
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
