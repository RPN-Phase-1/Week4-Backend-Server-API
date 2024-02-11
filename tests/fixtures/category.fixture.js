const faker = require("faker");
const prisma = require("../../prisma");
const { v4 } = require("uuid");

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
