const faker = require('faker');
const { v4 } = require('uuid');
const prisma = require('../../prisma/index');

const categoryOne = {
  id: v4(),
  name: faker.name.findName(),
};

const insertCategories = async (categories) => {
  // eslint-disable-next-line no-param-reassign
  categories = categories.map((category) => ({ ...category }));
  await prisma.category.createMany({
    data: categories,
    skipDuplicates: true,
  });
};

module.exports = {
  categoryOne,
  insertCategories,
};
