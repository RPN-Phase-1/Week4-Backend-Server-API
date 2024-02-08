const httpStatus = require("http-status");
const prisma = require("../../prisma");
const ApiError = require("../utils/ApiError");

const createCategory = async (categoryName) => {
  return await prisma.category.create({
    data: categoryName,
  });
};

const getAllCategories = async (skip, take) => {
  return await prisma.category.findMany({
    skip,
    take,
  });
};

const getCategoryById = async (categoryId) => {
  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
    },
  });

  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
  }

  return category;
};

const updateCategory = async (categoryId, newCategory) => {
  const category = await getCategoryById(categoryId);

  if (category) {
    return await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: newCategory,
    });
  }
};

const deleteCategory = async (categoryId) => {
  const category = await getCategoryById(categoryId);

  if (category) {
    return await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
  }
};

const getCategoryByName = async (categoryName) => {
  const category = await prisma.category.findFirst({
    where: {
      name: categoryName,
    },
  });

  return category;
};

const getProductByCategory = async (categoryName) => {
  const category = await getCategoryByName(categoryName);

  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
  }

  const products = await prisma.product.findMany({
    where: {
      categoryId: category.categoryId,
    },
  });

  return products;
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getCategoryByName,
  getProductByCategory,
};
