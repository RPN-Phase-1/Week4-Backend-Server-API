const faker = require("faker");
// eslint-disable-next-line import/no-extraneous-dependencies
const { v4 } = require("uuid");
const prisma = require("../../prisma");

const categoryOne = {
  id: v4(),
  name: faker.commerce.department(),
};

const categoryTwo = {
  id: v4(),
  name: faker.commerce.department(),
};

const categoryThree = {
  id: v4(),
  name: faker.commerce.department(),
};

const insertCategories = async (arrCategories) => {
  await prisma.category.createMany({
    data: arrCategories,
    skipDuplicates: true,
  });
};

module.exports = {
  categoryOne,
  categoryTwo,
  categoryThree,
  insertCategories,
};
