const httpStatus = require('http-status');
const prisma = require('../../prisma/client');
const ApiError = require('../utils/ApiError');

const createProduct = async (data) => {
  const product = await prisma.product.create({
    data,
  });

  return product;
};

const queryProducts = async (filters, options) => {
  const { name, price, category, user } = filters;
  const { take, skip, sort: orderBy } = options;

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: name,
      },
      price: {
        equals: price,
      },
      category: {
        equals: category,
      },
      user: {
        equals: user,
      },
    },
    include: {
      category: true,
      user: true,
    },
    orderBy,
    take,
    skip: skip || 0,
  });

  if (products.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  return products;
};

const getProductById = async (id) => {
  const product = await prisma.product.findFirst({
    where: {
      id,
    },
  });

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }

  return product;
};

const updateProductById = async (productId, updateBody) => {
  const updateProduct = await prisma.product.update({
    where: {
      id: productId,
    },
    data: updateBody,
  });

  return updateProduct;
};

// /**
//  * Delete category by id
//  * @param {ObjectId} categoryId
//  * @returns {Promise<Category>}
//  */
// const deleteProductById = async (categoryId) => {
//   const category = await getCategoryById(categoryId);
//   if (!category) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
//   }

//   const deletecategorys = await prisma.category.deleteMany({
//     where: {
//       id: categoryId,
//     },
//   });

//   return deletecategorys;
// };

module.exports = { createProduct, queryProducts, getProductById, updateProductById };
