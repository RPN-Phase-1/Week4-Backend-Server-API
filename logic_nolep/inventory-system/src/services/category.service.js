const prisma = require("../../prisma/client");

const getCategories = async () => {
  return await prisma.category.findMany();
};

const getCategory = async (categoryId) => {
  return await prisma.category.findUnique({
    where: { id: categoryId },
  });
};

const createCategory = async ({ name }) => {
  return await prisma.category.create({
    data: { name },
  });
};

const updateCategory = async (categoryId, { name }) => {
  return await prisma.category.update({
    where: { id: categoryId },
    data: { name },
  });
};

const deleteCategory = async (categoryId) => {
  return await prisma.category.delete({
    where: { id: categoryId },
  });
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
