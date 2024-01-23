const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const prisma = require('../../prisma/index');
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

  return user;
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

  if (users.length === 0) throw new ApiError(httpStatus.NOT_FOUND, 'Users not found');

  return users;
};

const getUserById = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

  return user;
};

const updateUser = async (userId, updateBody) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: updateBody,
  });

  return updatedUser;
};

const deleteUser = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

  const deletedUser = await prisma.user.deleteMany({
    where: { id: userId },
  });

  return deletedUser;
};

const getUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
};
