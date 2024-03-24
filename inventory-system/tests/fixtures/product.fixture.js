const faker = require('faker');
const prisma = require('../../prisma');
const { v4 } = require('uuid');
const { insertCategories } = require('../fixtures/category.fixture');
const { insertUsers } = require('../fixtures/user.fixture');

const productOne = {
  id: v4(),
  name: faker.vehicle.vehicle(),
  description: faker.lorem.sentence(),
  price: faker.datatype.float({ min: 10, max: 100, precision: 2 }),
  quantityInStock: faker.datatype.number({ min: 10, max: 100 }),
};

const insertProducts = async (user, category, products) => {
  await insertUsers([user]);
  await insertCategories([category]);

  products.map((product) => ({ ...product, categoryId: category.id, userId: user.id }));
  await prisma.product.createMany({
    data: products,
    skipDuplicates: true,
  });
};

const deleteProducts = async () => {
  await prisma.product.deleteMany({});
};

module.exports = {
  productOne,
  insertProducts,
  deleteProducts,
};
