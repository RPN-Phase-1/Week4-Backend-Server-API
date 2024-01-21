const prisma = require('../../prisma/client');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const createOrderItem = async (data) => {
  const orderItem = await prisma.orderItem.create({
    data,
  });
  return orderItem;
};
