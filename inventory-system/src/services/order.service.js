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

  return order;
};

module.exports = {
  createOrder,
  queryOrders,
  getOrderById,
};
