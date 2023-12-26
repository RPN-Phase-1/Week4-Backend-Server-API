const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const prisma = require('../../prisma/client');

const getOrderItems = async (page, size) => {
  return prisma.orderItem.findMany({
    skip: page,
    take: size,
  });
};

const getOrderItemById = async (orderItemId) => {
  return prisma.orderItem.findFirst({
    where: {
      id: orderItemId,
    },
  });
};

const createOrderItem = async (reqBody) => {
  const orderItem = await prisma.orderItem.create({
    data: reqBody,
  });

  const totalPrice = await prisma.order.update({
    where: {
      id: reqBody.orderId,
    },
    data: {
      totalPrice: reqBody.unitPrice * reqBody.quantity,
    },
  });

  const jumlahBarang = await prisma.product.findUnique({
    where: {
      id: reqBody.productId,
    },
  });

  const updateQuantiyProudct = await prisma.product.update({
    where: {
      id: reqBody.productId,
    },
    data: {
      quantityInStock: jumlahBarang.quantityInStock - reqBody.quantity,
    },
  });

  return orderItem;
};

const updateOrderItem = async (orderItemId, updateBody) => {
  const orderItem = prisma.orderItem.update({
    where: {
      id: orderItemId,
    },
    data: updateBody,
  });

  const totalPrice = await prisma.order.update({
    where: {
      id: updateBody.orderId,
    },
    data: {
      totalPrice: updateBody.unitPrice * updateBody.quantity,
    },
  });

  const jumlahBarang = await prisma.product.findUnique({
    where: {
      id: updateBody.productId,
    },
  });

  const updateQuantiyProudct = await prisma.product.update({
    where: {
      id: updateBody.productId,
    },
    data: {
      quantityInStock: jumlahBarang.quantityInStock - updateBody.quantity,
    },
  });

  return orderItem;
};

const deleteOrderItem = async (orderItemId) => {
  const orderItem = await getOrderItemById(orderItemId);

  if (!orderItem) throw new ApiError(httpStatus.NOT_FOUND, 'Order Item not found');

  return prisma.orderItem.deleteMany({
    where: {
      id: orderItemId,
    },
  });
};

module.exports = {
  getOrderItems,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
};
