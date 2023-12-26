const bcrypt = require('bcryptjs');
const prisma = require('../../prisma/client');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
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

const getUser = async (page, size) => {
  return prisma.user.findMany({
    skip: page,
    take: size,
  });
};

module.exports = {
  createUser,
  getUserByEmail,
  getUser,
};
