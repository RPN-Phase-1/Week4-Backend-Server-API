const prisma = require("../../prisma/client");

const getUsers = async () => {
  return await prisma.user.findMany();
};

const getUser = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
};

const createUser = async ({ name, email, password, role }) => {
  return await prisma.user.create({
    data: { name, email, password, role },
  });
};

const updateUser = async (userId, { name, email, password, role }) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { name, email, password, role },
  });
};

const deleteUser = async (userId) => {
  return await prisma.user.delete({
    where: { id: userId },
  });
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
