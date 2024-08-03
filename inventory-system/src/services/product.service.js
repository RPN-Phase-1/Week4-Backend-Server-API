const httpStatus = require('http-status');
const prisma = require('../../prisma');
const ApiError = require('../utils/ApiError');

const createProduct = async (productBody) => {
  return prisma.product.create({
    data: productBody
  });

};

const queryProducts = async (filter, options) => {
  const { name, greater, lower } = filter;
  const { take, skip } = options;

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: name,
      },
      price: {
        gte: greater && parseInt(greater),
        lte: lower && parseInt(lower),
      },
    },
    take: take && parseInt(take),
    skip: skip && parseInt(skip),
  });
  return products;
};

const getProductById = async (id) => {
  return prisma.product.findFirst({
    where: {
      id,
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

  const deleteProducts = await prisma.product.deleteMany({
    where: {
      id: productId,
    },
  });

  return deleteProducts;
};

module.exports = {
  createProduct,
  queryProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
