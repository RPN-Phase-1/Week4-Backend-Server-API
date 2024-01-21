const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const prisma = require('../../prisma/client');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  // eslint-disable-next-line no-param-reassign
  userBody.password = bcrypt.hashSync(userBody.password, 8);

  const user = await prisma.user.create({
    data: userBody,
  });

  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
};

const queryUsers = async (filter, options) => {
  const { name } = filter;
  const { take, skip, sort: orderBy } = options;

  const users = await prisma.user.findMany({
    where: {
      name: {
        contains: name,
      },
    },
    orderBy,
    take: Number(take),
    skip,
  });

  if (!users) throw new ApiError(httpStatus.NOT_FOUND, 'Users not found');

  return users;
};

const getUserById = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

  return user;
};
/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  // getUserByEmail,
};
