const httpStatus = require('http-status');
const prisma = require('../../prisma/client');
const ApiError = require('../utils/apiError');

const createProduct = async (productBody) => {
  const product = await prisma.product.create({
    data: productBody,
  });

  return product;
};

const getProduct = async () => {
  const result = await prisma.product.findMany();
  return result;
};

const getProductById = async (productId) => {
  const result = await prisma.product.findFirst({
    where: {
      id: productId,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found');
  }

  return result;
};

const updateProduct = async (productId, productBody) => {
  const target = await getProductById(productId);
  const result = await prisma.product.update({
    where: {
      id: productId,
    },
    data: productBody,
  });
  return result;
};

const deleteProduct = async (productId) => {
  const result = await prisma.product.delete({
    where: { id: productId },
  });

  return result;
};

module.exports = {
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
