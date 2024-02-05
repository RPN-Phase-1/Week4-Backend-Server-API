const httpStatus = require('http-status');
const prisma = require('../../prisma/client');
const ApiError = require('../utils/apiError');

const create = async (orderItemBody) => {
  return prisma.orderItem.create({
    data: orderItemBody,
  });
};

const getAll = async (filter, options, sorting) => {
  return prisma.orderItem.findMany({
    ...options,
    where: filter,
    orderBy: sorting,
  });
};

const getId = async (id) => {
  return prisma.orderItem.findFirst({
    where: {
      id: id,
    },
  });
};

const update = async (id, update) => {
  const orderItem = await getId(id);
  if (!orderItem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order Item not found');
  }

  const updateOrderItem = await prisma.orderItem.update({
    where: {
      id: id,
    },
    data: update,
  });

  return updateOrderItem;
};

const deleted = async (id) => {
  const orderItem = await getId(id);
  if (!orderItem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order Item not found');
  }

  const deleteOrderItem = await prisma.orderItem.delete({
    where: {
      id: id,
    },
  });

  return deleteOrderItem;
}

module.exports = { create, getAll, getId, update, deleted };
