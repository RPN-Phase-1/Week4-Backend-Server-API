const prisma = require("../../prisma/client");

const getUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (err) {
    console.log("service error", err);
    throw err;
  }
};

const getUser = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  } catch (err) {
    console.log("service error", err);
    throw err;
  }
};

const createUser = async (data) => {
  try {
    const user = await prisma.user.create({ data: data });
    return user;
  } catch (err) {
    console.log("service error", err);
    throw err;
  }
};

const updateUser = async (id, data) => {
  try {
    console.log(id);
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data,
    });
    return user;
  } catch (err) {
    console.log("service error", err);
    throw err;
  }
};

const deleteUser = async (id) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return user;
  } catch (err) {
    console.log("service error", err);
    throw err;
  }
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
