const httpStatus = require('http-status');
const prisma = require('../../prisma/client');
const ApiError = require('../utils/ApiError');
const { userService } = require('../services');

const createProduct = async (productBodys) => {
  return prisma.product.create({
    data: productBodys
  });
};

const getProducts = async () => {
  return prisma.product.findMany();
};

const getProductById = async (id) => {
  return prisma.product.findFirst({
    where: { id: id },
  });
};

const updateProductById = async (productId, productBodys) => {
  const product = await getProductById(productId);

  if (!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');

  return prisma.product.update({
    where: { id: productId },
    data: productBodys,
  });
};

const deleteProductById = async (productId) => {
  const product = await getProductById(productId);

  if (!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');

  return prisma.product.delete({
    where: { id: productId },
  });
};

const getProductByUser = async (userId) => {
  const productUser = await userService.getUserById(userId);

  if (!productUser) throw new ApiError(httpStatus.NOT_FOUND, 'Product or User not found');

  return prisma.user.findMany({
    where: {id: userId},
    include: {products: true}
  })
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  getProductByUser
};
