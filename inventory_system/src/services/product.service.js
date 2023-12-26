const httpStatus = require('http-status');
const prisma = require('../../prisma/client');
const ApiError = require('../utils/ApiError');

/**
 * Create a Product
 * @param {Object} productBody
 * @returns {Promise<Product>}
 */
const createProduct = async (productBody) => {
  const newProduct = await prisma.product.create({
    data: productBody,
  });

  return newProduct;
};

const queryProduct = async (page, size) => {
  return prisma.product.findMany({
    skip: page,
    take: size,
  });
};

const getProductById = async (productId) => {
  return prisma.product.findFirst({
    where: {
      id: productId,
    },
  });
};

const updateProductById = async (productId, updateBody) => {
  const product = await getProductById(productId);

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const updateProduct = await prisma.product.update({
    where: {
      id: productId,
    },
    data: updateBody,
  });

  return updateProduct;
};

const deleteProductById = async (productId) => {
  const product = await getProductById(productId);

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const deleteProduct = await prisma.product.deleteMany({
    where: {
      id: productId,
    },
  });

  return deleteProduct;
};

module.exports = {
  createProduct,
  queryProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
