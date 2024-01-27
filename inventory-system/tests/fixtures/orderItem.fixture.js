const { faker } = require('@faker-js/faker');
const { v4 } = require('uuid');
const prisma = require('../../prisma/index');
const { insertCategories } = require('./category.fixture');
const { insertUsers } = require('./user.fixture');

const orderItemOne = {
  id: v4(),
  orderId: orderOne.id,
  productId: productOne.id,
  quantity: faker.number.int({ max: 20 }),
};
const insertProducts = async (users, category, product) => {
  await insertUsers([users]);
  await insertCategories([category]);

  const productMapped = product.map((el) => {
    return {
      ...el,
      categoryId: category.id,
      userId: users.id,
    };
  });

  await prisma.product.createMany({
    data: productMapped,
    skipDuplicates: true,
  });
};

module.exports = {
  productOne,
  insertProducts,
};
