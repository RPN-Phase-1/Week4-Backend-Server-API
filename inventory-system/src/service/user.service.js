const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const prisma = require('../../prisma/client');
const ApiError = require('../utils/apiError');

const createUser = async (userBody) => {
  userBody.password = bcrypt.hashSync(userBody.password, 8);

  return prisma.user.create({
    data: userBody,
  });
};

const getUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

const getAllUsers = async () => {
  return prisma.user.findMany();
};

const getUserById = async (userId) => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  return user;
};

const updateUser = async (userId, userBody) => {
  const user = await getUserById(userId);
  if (userBody.password) {
    userBody.password = bcrypt.hashSync(userBody.password, 8);
  }
  if (user === null) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found');
  }
  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: userBody,
  });

  return result;
};

const deleteUser = async (userId) => {
  const result = await prisma.user.deleteMany({
    where: {
      id: userId,
    },
  });

  return result;
};

module.exports = {
  createUser,
  getUserByEmail,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
