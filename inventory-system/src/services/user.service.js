const httpStatus = require('http-status');
const prisma = require('../../prisma/client')
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcryptjs');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  userBody.password = bcrypt.hashSync(userBody.password, 8);

  return prisma.user.create({
    data: userBody
  });
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email }
  });
};

const getUsers = async () => {
  return prisma.user.findMany()
};

const getUserById = async (userId) => {
  const getUserById = await prisma.user.findFirst({
    where : { id: userId }
  })

  return getUserById
};

const updateUserById = async (userId, userBody) => {
  const user = await getUserById(userId);

  if(!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

  const updateUser = await prisma.user.update({
    where : { id: userId },
    data : userBody
  })

  return updateUser
};

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);

  if(!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

  const deleteUser = await prisma.user.delete({
    where : { id: userId }
  });

  return deleteUser
};

const getProductByUser = async (userId) => {
  const productUser = await getUserById(userId);

  if (!productUser) throw new ApiError(httpStatus.NOT_FOUND, 'Product or User not found');

  const getProduct = await prisma.user.findMany({
    where: {id: userId},
    include: {products: true}
  })

  return getProduct
};

const getOrderByUser = async (userId) => {
  const orderUser = await getUserById(userId);

  if (!orderUser) throw new ApiError(httpStatus.NOT_FOUND, 'Order or User not found');

  const getOrder = await prisma.user.findMany({
    where: {id: userId},
    include: {orders: true}
  })

  return getOrder
};

module.exports = {
  createUser,
  getUserByEmail,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getProductByUser,
  getOrderByUser
};