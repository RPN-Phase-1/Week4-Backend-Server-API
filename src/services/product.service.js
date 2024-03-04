const httpStatus = require("http-status");
const prisma = require("../../prisma");
const ApiError = require("../utils/ApiError");
const userService = require("./user.service");
const categoryService = require("./category.service");

const createProduct = async (dataProduct) => {
  await userService.getUserById(dataProduct.userId);
  await categoryService.getCategoryById(dataProduct.categoryId);

  return prisma.product.create({
    data: dataProduct,
  });
};

const getAllProducts = async (skip, take) => {
  return prisma.product.findMany({
    skip,
    take,
  });
};

const getProductById = async (productId) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "product not found");
  }

  return product;
};

const updateProduct = async (productId, dataProduct) => {
  await getProductById(productId);
  if (dataProduct.userId) await userService.getUserById(dataProduct.userId);
  if (dataProduct.categoryId) await categoryService.getCategoryById(dataProduct.categoryId);

  return prisma.product.update({
    where: {
      id: productId,
    },
    data: dataProduct,
  });
};

const deleteProduct = async (productId) => {
  await getProductById(productId);

  return prisma.product.delete({
    where: {
      id: productId,
    },
  });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
