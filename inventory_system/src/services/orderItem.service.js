const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const prisma = require('../../prisma/client');

const getOrderItems = async (options, filter) => {
  const page = Number(options.skip) || 0;
  const size = Number(options.take) || 5;

  options = {
    skip: page,
    take: size,
    where: {
      id: filter,
    },
  };

  return prisma.orderItem.findMany(options);
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

  await prisma.order.update({
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

  await prisma.product.update({
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
  const orderItem = await prisma.orderItem.update({
    where: {
      id: orderItemId,
    },
    data: updateBody,
  });

  await prisma.order.update({
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

  await prisma.product.update({
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

  if (!orderItem || orderItem.length == 0) throw new ApiError(httpStatus.NOT_FOUND, 'Order Item not found');

  const jumlahBarang = await prisma.product.findUnique({
    where: {
      id: orderItem.productId,
    },
  });

  await prisma.product.update({
    where: {
      id: orderItem.productId,
    },
    data: {
      quantityInStock: jumlahBarang.quantityInStock + orderItem.quantity,
    },
  });

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
