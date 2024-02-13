const faker = require("faker");
// eslint-disable-next-line import/no-extraneous-dependencies
const { v4 } = require("uuid");
const prisma = require("../../prisma");
const { orderOne, orderTwo, orderThree } = require("./order.fixture");
const { productOne, productTwo, productThree } = require("./product.fixture");

const orderItemOne = {
  id: v4(),
  orderId: orderOne.id,
  productId: productOne.id,
  quantity: faker.datatype.number({ min: 1, max: 20 }),
};
orderItemOne.unitPrice = orderItemOne.quantity * productOne.price;

const orderItemTwo = {
  id: v4(),
  orderId: orderTwo.id,
  productId: productTwo.id,
  quantity: faker.datatype.number({ min: 1, max: 20 }),
  unitPrice: this.quantity * productTwo.price,
};
orderItemTwo.unitPrice = orderItemTwo.quantity * productTwo.price;

const orderItemThree = {
  id: v4(),
  orderId: orderThree.id,
  productId: productThree.id,
  quantity: faker.datatype.number({ min: 1, max: 20 }),
  unitPrice: this.quantity * productThree.price,
};
orderItemThree.unitPrice = orderItemThree.quantity * productThree.price;

const insertOrderItems = async (arrOrderItems) => {
  await prisma.orderItem.createMany({
    data: arrOrderItems,
    skipDuplicates: true,
  });
};

module.exports = {
  orderItemOne,
  orderItemTwo,
  orderItemThree,
  insertOrderItems,
};
