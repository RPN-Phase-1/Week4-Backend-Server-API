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
}

const getUserById = async (userId) => {
  return prisma.user.findUnique({
    where : { id: userId }
  })
}

const updateUserById = async (userId, userBody) => {
  const user = await getUserById(userId);

  if(!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

  return prisma.user.update({
    where : { id: userId },
    data : userBody
  })
}

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);

  if(!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

  return prisma.user.delete({
    where : { id: userId }
  })
}

module.exports = {
  createUser,
  getUserByEmail,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById
};