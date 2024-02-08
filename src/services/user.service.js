const prisma = require("../../prisma");
const bcrypt = require("bcrypt");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const createUser = async (userBody) => {
  const salt = bcrypt.genSaltSync(10);
  userBody.password = bcrypt.hashSync(userBody.password, salt);

  return await prisma.user.create({
    data: userBody,
  });
};

const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

const getAllUsers = async (skip, take) => {
  return await prisma.user.findMany({
    skip,
    take,
  });
};

const getUserById = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "user not found");
  }

  return user;
};

const updateUser = async (userId, userBody) => {
  await getUserById(userId);

  if (userBody.password) {
    const salt = bcrypt.genSaltSync(10);
    userBody.password = bcrypt.hashSync(userBody.password, salt);
  }

  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: userBody,
  });
};

const deleteUser = async (userId) => {
  await getUserById(userId);

  return await prisma.user.delete({
    where: {
      id: userId,
    },
  });
};

const getOrderByUser = async (userId) => {
  await getUserById(userId);

  return await prisma.order.findMany({
    where: {
      userId,
    },
  });
};

const getProductByUser = async (userId) => {
  await getUserById(userId);

  return await prisma.product.findMany({
    where: {
      userId,
    },
  });
};

module.exports = {
  createUser,
  getUserByEmail,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getOrderByUser,
  getProductByUser,
};
