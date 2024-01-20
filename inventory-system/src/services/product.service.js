const httpStatus = require('http-status');
const prisma = require('../../prisma/client');
const ApiError = require('../utils/ApiError');

const createProduct = async (data) => {
  const result = await prisma.product.create({
    data,
  });

  return result;
};

module.exports = { createProduct };
