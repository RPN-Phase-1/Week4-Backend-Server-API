const httpStatus = require('http-status');
const prisma = require('../../prisma/client');
const ApiError = require('../utils/apiError');

const create = async (categoryBody) => {
  return prisma.product.create({
    data: categoryBody,
  });
};

const read = async (filter, options, sorting) => {
  return prisma.product.findMany({
    ...options,
    where: filter,
    orderBy: sorting,
  });
};

module.exports = { create, read };
