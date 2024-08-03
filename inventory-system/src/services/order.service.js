const httpStatus = require('http-status');
const prisma = require('../../prisma');
const ApiError = require('../utils/ApiError');

const createOrder = async (orderBody) => {
  const orderUserId = await prisma.user.findUnique({
    where: { id: orderBody.userId },
  });

  if (!orderUserId) throw new ApiError(httpStatus.NOT_FOUND, 'User Id not found');

  return prisma.order.create({
    data: orderBody,
  });
};

const queryOrders = async (filter, options) => {
  const { name } = filter;
  const { take, skip } = options;

  const orders = await prisma.order.findMany({
    where: {
      customerName: {
        contains: name,
      },
    },
    take: take && parseInt(take),
    skip: skip && parseInt(skip),
    orderBy: {
      customerName: 'asc',
    },
  });
  return orders;
};

const getOrderById = async (id) => {
  return prisma.order.findFirst({
    where: {
      id,
    },
  });
};

const updateOrderById = async (id, updateBody) => {
  const order = await prisma.order.findUnique({
    where: {
      id
    }
  })

  if(!order) throw new ApiError(httpStatus.NOT_FOUND, 'OrderId not found')

  return prisma.order.update({
    where: {id},
    data: updateBody
  })
  
};

const deleteOrderById = async (orderId) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }

  const deleteOrders = await prisma.order.deleteMany({
    where: {
      id: orderId,
    },
  });

  return deleteOrders;
};

const getOrderItems = async (orderId) => {
  const order = await prisma.order.findMany({
    where: { id: orderId },
    include: { orderItem: true },
  });

  return order;
};

module.exports = {
  createOrder,
  queryOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  getOrderItems,
};
