const faker = require("faker");
// eslint-disable-next-line import/no-extraneous-dependencies
const { v4 } = require("uuid");
const prisma = require("../../prisma");
const { userOne, userTwo, userThree } = require("./user.fixture");
const { categoryOne, categoryTwo, categoryThree } = require("./category.fixture");

const productOne = {
  id: v4(),
  name: faker.commerce.product(),
  description: faker.commerce.productDescription(),
  price: 10.0,
  quantityInStock: 100,
  userId: userOne.id,
  categoryId: categoryOne.id,
};

const productTwo = {
  id: v4(),
  name: faker.commerce.product(),
  description: faker.commerce.productDescription(),
  price: 15.0,
  quantityInStock: 100,
  userId: userTwo.id,
  categoryId: categoryTwo.id,
};

const productThree = {
  id: v4(),
  name: faker.commerce.product(),
  description: faker.commerce.productDescription(),
  price: 20.0,
  quantityInStock: 100,
  userId: userThree.id,
  categoryId: categoryThree.id,
};

const insertProducts = async (arrProducts) => {
  await prisma.user.createMany({
    data: [userOne, userTwo, userThree],
    skipDuplicates: true,
  });
  await prisma.category.createMany({
    data: [categoryOne, categoryTwo, categoryThree],
    skipDuplicates: true,
  });
  await prisma.product.createMany({
    data: arrProducts,
    skipDuplicates: true,
  });
};

module.exports = {
  productOne,
  productTwo,
  productThree,
  insertProducts,
};
