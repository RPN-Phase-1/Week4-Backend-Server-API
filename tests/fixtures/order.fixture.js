const faker = require("faker");
// eslint-disable-next-line import/no-extraneous-dependencies
const { v4 } = require("uuid");
const prisma = require("../../prisma");
const { userOne, userTwo, userThree } = require("./user.fixture");

const orderOne = {
  id: v4(),
  customerName: faker.name.findName(),
  customerEmail: faker.internet.email().toLowerCase(),
  userId: userOne.id,
  totalPrice: 0,
};

const orderTwo = {
  id: v4(),
  customerName: faker.name.findName(),
  customerEmail: faker.internet.email().toLowerCase(),
  userId: userTwo.id,
  totalPrice: 0,
};

const orderThree = {
  id: v4(),
  customerName: faker.name.findName(),
  customerEmail: faker.internet.email().toLowerCase(),
  userId: userThree.id,
  totalPrice: 0,
};

const insertOrders = async (arrOrders) => {
  await prisma.order.createMany({
    data: arrOrders,
    skipDuplicates: true,
  });
};

module.exports = {
  orderOne,
  orderTwo,
  orderThree,
  insertOrders,
};
