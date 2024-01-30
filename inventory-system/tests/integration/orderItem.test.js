const request = require('supertest');
const httpStatus = require('http-status');
const { faker } = require('@faker-js/faker');
const { v4 } = require('uuid');
const app = require('../../src/app');
const { userOne, admin, insertUsers } = require('../fixtures/user.fixture');
const { userOneAccessToken } = require('../fixtures/token.fixture');
const prisma = require('../../prisma');
const { insertOrderItems, orderItemOne } = require('../fixtures/orderItem.fixture');
const { orderOne } = require('../fixtures/order.fixture');
const { productOne } = require('../fixtures/product.fixture');

describe('OrderItem Routes', () => {
  let newOrderItem;
  beforeEach(async () => {
    await insertOrderItems(productOne, orderOne, [orderItemOne]);

    newOrderItem = {
      quantity: faker.number.int({ min: 1, max: 20 }),
    };
  });
  describe('POST', () => {
    test('Should return 201 and created orderItem', async () => {
      const res = await request(app)
        .post('/v1/order-items')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send({
          ...newOrderItem,
          orderId: orderOne.id,
          productId: productOne.id,
        })
        .expect(httpStatus.CREATED);

      const orderItemData = res.body.data;

      expect(orderItemData).toMatchObject({
        id: expect.anything(),
        orderId: orderOne.id,
        productId: productOne.id,
        quantity: newOrderItem.quantity,
        unitPrice: productOne.price,
      });
    });
  });
});
