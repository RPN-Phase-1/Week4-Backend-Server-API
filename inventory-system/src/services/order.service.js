const httpStatus = require('http-status');
const prisma = require('../../prisma/client');
const ApiError = require('../utils/apiError');

const create = async (orderBody) => {
  return prisma.order.create({
    data: orderBody,
  });
};

const getAll = async (filter, options, sorting) => {
  return prisma.order.findMany({
    ...options,
    where: filter,
    orderBy: sorting,
  });
};

const getId = async (id) => {
  return prisma.order.findFirst({
    where: {
      id: id,
    },
  });
};

const update = async (id, update) => {
  const order = await getId(id);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }

  const updateOrder = await prisma.order.update({
    where: {
      id: id,
    },
    data: update,
  });

  return updateOrder;
};

const deleted = async (id) => {
  const order = await getId(id);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }

  const deleteOrder = await prisma.order.delete({
    where: {
      id: id,
    },
  });

  return deleteOrder;
};

module.exports = { create, getAll, getId, update, deleted };
