const prisma = require("../../prisma/client");

const getProducts = async () => {
  return await prisma.product.findMany();
};

const getProduct = async (productId) => {
  return await prisma.product.findUnique({
    where: { id: productId },
  });
};

const createProduct = async ({ name, description, price, quantityInStock, categoryId, userId }) => {
  return await prisma.product.create({
    data: { name, description, price, quantityInStock, categoryId, userId },
  });
};

const updateProduct = async (productId, { name, description, price, quantityInStock, categoryId, userId }) => {
  return await prisma.product.update({
    where: { id: productId },
    data: { name, description, price, quantityInStock, categoryId, userId },
  });
};

const deleteProduct = async (productId) => {
  return await prisma.product.delete({
    where: { id: productId },
  });
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
