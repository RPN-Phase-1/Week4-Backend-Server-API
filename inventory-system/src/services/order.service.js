const httpStatus = require('http-status');
const prisma = require('../../prisma/client');
const ApiError = require('../utils/ApiError');

const createOrder = async (body) => {
  const order = await prisma.order.create({ data: body });
  return order;
};

const queryOrders = async (filter, options) => {
  const { total: totalPrice } = filter;
  const { take, skip, sort: orderBy } = options;

  const orders = await prisma.order.findMany({
    where: {
      totalPrice: {
        lte: totalPrice,
      },
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      orderItems: true,
    },
    orderBy,
    take: Number(take),
    skip,
  });

  if (!orders) throw new ApiError(httpStatus.NOT_FOUND, 'Orders not found');

  return orders;
};

const getOrderById = async (id) => {
  const order = await prisma.order.findFirst({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      orderItems: true,
    },
  });

  if (!order) throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');

  return order;
};

const updateOrderById = async (id, body) => {
  const order = await prisma.order.findUnique({
    where: {
      id,
    },
  });

  if (!order) throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');

  const updatedOrder = await prisma.order.update({
    where: {
      id,
    },
    data: body,
  });

  return updatedOrder;
};

const deleteOrderById = async (id) => {
  const order = await prisma.order.findUnique({
    where: {
      id,
    },
  });

  if (!order) throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');

  const deletedOrder = await prisma.order.deleteMany({
    where: {
      id,
    },
  });

  return deletedOrder;
};

module.exports = {
  createOrder,
  queryOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
};
