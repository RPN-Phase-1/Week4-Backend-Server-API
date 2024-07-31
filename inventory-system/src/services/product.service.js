const httpStatus = require("http-status");
const prisma = require("../../prisma/client");
const ApiError = require("../utils/ApiError");

/**
 * Create a category
 * @param {Object} categoryProduct
 * @returns {Promise<Product>}
 */
const createProduct = async (createProduct) => {
  const product = await prisma.product.create({
    data: createProduct,
  });
  return product;
};

/**
 * Query for products
 * @returns {Promise<QueryResult>}
 */
const queryProducts = async (filter, options) => {
  const products = await prisma.product.findMany();
  return products;
};

/**
 * Get product by id
 * @param {ObjectId} id
 * @returns {Promise<Product>}
 */
const getProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });
};

/**
 * Update product by id
 * @param {ObjectId} productId
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const updateProductById = async (productId, updateBody) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }
  const updateProduct = await prisma.product.update({
    where: {
      id: productId,
    },
    data: updateBody,
  });

  return updateProduct;
};

/**
 * Delete category by id
 * @param {ObjectId} productId
 * @returns {Promise<Product>}
 */
const deleteProductById = async (productId) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not foudn");
  }

  const deleteProduct = await prisma.product.delete({
    where: {
        id: productId
    }
  })

  return deleteProduct
};

module.exports = {createProduct, queryProducts, getProductById, updateProductById, deleteProductById}
