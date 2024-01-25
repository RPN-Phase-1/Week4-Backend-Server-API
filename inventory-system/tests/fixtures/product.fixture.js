const { faker } = require('@faker-js/faker');
const { v4 } = require('uuid');
const prisma = require('../../prisma/index');
const { categoryOne, insertCategories } = require('./category.fixture');
const { userOne, insertUsers } = require('./user.fixture');

const productOne = {
  data: {
    id: v4(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price({ min: 100, max: 200 }),
    quantityInStock: faker.number.int({ max: 100 }),
    categoryId: categoryOne.id,
    userId: userOne.id,
  },
};
const insertProducts = async () => {
  await insertCategories([categoryOne]);
  await insertUsers([userOne]);
  await prisma.product.create({ data: productOne });
};

module.exports = {
  productOne,
  insertProducts,
};
