const httpStatus = require('http-status');
const prisma = require('../../prisma/client');
const ApiError = require('../utils/ApiError');

const createProduct = async (productBodys) => {
  const createProduct = await prisma.product.create({
    data: productBodys
  });

  return createProduct
};

const getProducts = async () => {
  return prisma.product.findMany();
};

const getProductById = async (id) => {
  const getProduct = await prisma.product.findFirst({
    where: { id: id },
  });

  return getProduct
};

const updateProductById = async (productId, productBodys) => {
  const product = await getProductById(productId);

  if (!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');

  const updateProduct = await prisma.product.update({
    where: { id: productId },
    data: productBodys,
  });

  return updateProduct
};

const deleteProductById = async (productId) => {
  const product = await getProductById(productId);

  if (!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');

  const deleteProduct = await prisma.product.delete({
    where: { id: productId },
  });

  return deleteProduct
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById
};
