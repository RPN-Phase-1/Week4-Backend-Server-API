const faker = require("faker");
const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const prisma = require("../../prisma");

const password = "password123";
const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(password, salt);

const userOne = {
  id: v4(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: "user",
  isEmailVerified: false,
};

const userTwo = {
  id: v4(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: "user",
  isEmailVerified: false,
};

const admin = {
  id: v4(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: "admin",
  isEmailVerified: false,
};

const newUser = {
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
};

const insertUsers = async (arrUsers) => {
  const users = arrUsers.map((user) => ({ ...user, password: hashedPassword }));

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });
};

module.exports = {
  userOne,
  userTwo,
  admin,
  newUser,
  insertUsers,
};
