/* eslint-disable no-param-reassign */
const bcrypt = require("bcrypt");
const httpStatus = require("http-status");
const prisma = require("../../prisma");
const ApiError = require("../utils/ApiError");

const createUser = async (userBody) => {
  const salt = bcrypt.genSaltSync(10);
  userBody.password = bcrypt.hashSync(userBody.password, salt);

  return prisma.user.create({
    data: userBody,
  });
};

const getUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

const getAllUsers = async (skip, take) => {
  return prisma.user.findMany({
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

  return prisma.user.update({
    where: {
      id: userId,
    },
    data: userBody,
  });
};

const deleteUser = async (userId) => {
  await getUserById(userId);

  return prisma.user.delete({
    where: {
      id: userId,
    },
  });
};

const getOrderByUser = async (userId) => {
  await getUserById(userId);

  return prisma.order.findMany({
    where: {
      userId,
    },
  });
};

const getProductByUser = async (userId) => {
  await getUserById(userId);

  return prisma.product.findMany({
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
