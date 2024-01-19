// const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const prisma = require('../../prisma/client');
// const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  // eslint-disable-next-line no-param-reassign
  userBody.password = bcrypt.hashSync(userBody.password, 8);

  return prisma.user.create({
    data: userBody,
  });
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
  getUserByEmail,
};
