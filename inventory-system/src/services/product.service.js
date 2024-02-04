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

const readId = async (id) => {
  return prisma.product.findFirst({
    where: {
      id: id,
    },
  });
};

const update = async (id, update) => {
  const product = await readId(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const updateProduct = await prisma.product.update({
    where: {
      id: id,
    },
    data: update,
  });

  return updateProduct;
};

const deleted = async (id) => {
  const product = await readId(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const deleteProduct = await prisma.product.delete({
    where: {
      id: id,
    },
  });

  return deleteProduct;
};

module.exports = { create, read, readId, update, deleted };
