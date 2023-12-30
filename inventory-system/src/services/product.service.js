const httpStatus = require('http-status');
const prisma = require('../../prisma/client')
const ApiError = require('../utils/ApiError');

/**
 * Create a product
 * @param {Object} productBody
 * @returns {Promise<Product>}
 */
const createProduct = async (productBody) => {
  return prisma.product.create({
    data: productBody
  });
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
  return prisma.product.findFirst({
    where: {
      id: id
    }
  })
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
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  
  const updateProduct = await prisma.product.update({
    where: {
      id: productId,
    },
    data: updateBody
  })

  return updateProduct;
};

/**
 * Delete product by id
 * @param {ObjectId} productId
 * @returns {Promise<Product>}
 */
const deleteProductById = async (productId) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const deleteProducts = await prisma.product.deleteMany({
    where: {
      id: productId
    },
  })

  return deleteProducts;
};

const getAllProducts = async(category,skip=0,take=10)=>{
  let products = await prisma.product.findMany({
    skip:parseInt(skip),
    take:parseInt(take),
    where:{
      category:{
        name:category
      }
    }
  })

  return products
}

module.exports = {
  createProduct,
  queryProducts,
  getProductById,
  getAllProducts,
  updateProductById,
  deleteProductById,
};