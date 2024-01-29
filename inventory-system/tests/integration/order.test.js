const request = require('supertest');
const httpStatus = require('http-status');
const { faker } = require('@faker-js/faker');
const { v4 } = require('uuid');
const app = require('../../src/app');
const { userOne, admin, insertUsers } = require('../fixtures/user.fixture');
const { userOneAccessToken, adminAccessToken } = require('../fixtures/token.fixture');
const { categoryOne } = require('../fixtures/category.fixture');
const prisma = require('../../prisma');
const { insertOrders, orderOne } = require('../fixtures/order.fixture');

describe('Order Routes', () => {
  let newOrder;
  beforeEach(async () => {
    await insertUsers([admin]);
    await insertOrders(userOne, [orderOne]);

    newOrder = {
      date: faker.date.recent(),
      totalPrice: 0,
    };
  });
  describe('POST', () => {
    test('Should return 201 and created order', async () => {
      await request(app)
        .post('/v1/orders')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send({ ...newOrder, customerName: userOne.name, customerEmail: userOne.email, userId: userOne.id })
        .expect(httpStatus.CREATED);
    });
  });
});
