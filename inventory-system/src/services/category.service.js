const httpStatus = require('http-status');
const prisma = require('../../prisma');
const ApiError = require('../utils/ApiError');

const createCategory = async (categoryBody) => {
  return prisma.category.create({
    data: categoryBody,
  });
};

const queryCategorys = async (filter, options) => {
  const { category } = filter;
  const { take, skip } = options;

  const categorys = await prisma.category.findMany({
    where: {
      name: {
        contains: category,
      },
    },
    include: {
      products: true,
    },
    take: take && parseInt(take),
    skip: skip && parseInt(skip),
    orderBy: {
      name: 'asc',
    },
  });
  return categorys;
};

const getCategoryById = async (id) => {
  return prisma.category.findFirst({
    where: {
      id,
    },
    include:{
      products: true
    }
  });
};

const updateCategoryById = async (categoryId, updateBody) => {
  const category = await getCategoryById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }

  const updateCategory = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: updateBody,
  });

  return updateCategory;
};

const deleteCategoryById = async (categoryId) => {
  const category = await getCategoryById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }

  const deleteCategorys = await prisma.category.deleteMany({
    where: {
      id: categoryId,
    },
  });

  return deleteCategorys;
};

const queryProductByCategory = async (filter, options) => {
  const { take, skip } = options;

  return prisma.category.findMany({
    take: take && parseInt(take),
    skip: skip && parseInt(skip),
  });
};

module.exports = {
  createCategory,
  queryCategorys,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  queryProductByCategory,
};
