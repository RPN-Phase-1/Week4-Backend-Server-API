// const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const prisma = require('../../prisma');

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

const getUsers = async (filters, options) => {
  const { name, role, email } = filters;
  const { take, skip } = options;

  return prisma.user.findMany({
    where: {
      name: {
        contains: name,
      },
      role: {
        contains: role,
      },
      email: {
        contains: email,
      },
    },
    take: take && parseInt(take),
    skip: skip && parseInt(skip),
    orderBy: {
      name: 'asc',
    },
  });
};

const getUserById = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return user;
};

const updateUserById = async (userId, userBody) => {
  if(userBody.password){
    userBody.password = bcrypt.hashSync(userBody.password, 8);
  }
  
  const updateUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: userBody,
  });

  return updateUser;
};

const deleteUserById = async (userId) => {
  return prisma.user.delete({
    where: { id: userId },
  });
};

const queryProductByUser = async (userId) => {
  const queryProduct = await prisma.user.findMany({
    where: { id: userId },
    include: { products: true },
  });

  return queryProduct;
};

const queryOrderByUser = async (userId) => {
  const queryOrder = await prisma.user.findMany({
    where: { id: userId },
    include: { orders: true },
  });

  return queryOrder;
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getUsers,
  updateUserById,
  deleteUserById,
  queryProductByUser,
  queryOrderByUser,
};
