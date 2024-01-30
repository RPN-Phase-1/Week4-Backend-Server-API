const request = require('supertest');
const httpStatus = require('http-status');
const { faker } = require('@faker-js/faker');
const { v4 } = require('uuid');
const app = require('../../src/app');
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
      quantity: faker.number.int({ min: 10, max: 20 }),
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
        unitPrice: expect.anything(),
      });
    });
    test('Should return 401 if access token is invalid', async () => {
      await request(app)
        .post('/v1/order-items')
        .set('Authorization', `Bearer invalidtoken`)
        .send({
          ...newOrderItem,
          orderId: orderOne.id,
          productId: productOne.id,
        })
        .expect(httpStatus.UNAUTHORIZED);
    });
    test('Should return 400 if data required is missing', async () => {
      delete newOrderItem.quantity;

      await request(app)
        .post('/v1/order-items')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send({
          ...newOrderItem,
          orderId: orderOne.id,
          productId: productOne.id,
        })
        .expect(httpStatus.BAD_REQUEST);
    });
  });
  describe('GET', () => {
    test('Should return 200 and list of orderItems', async () => {
      await request(app).get('/v1/order-items').set('Authorization', `Bearer ${userOneAccessToken}`).expect(httpStatus.OK);
    });
    test('Should return 401 if access token is invalid', async () => {
      await request(app).get('/v1/order-items').set('Authorization', `Bearer invalidtoken`).expect(httpStatus.UNAUTHORIZED);
    });
    test('Should return 404 if orderItem is not found', async () => {
      await prisma.orderItem.deleteMany({});

      await request(app)
        .get('/v1/order-items')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.NOT_FOUND);
    });
  });
  describe('GET:id', () => {
    test('Should return 200 and a orderItem', async () => {
      await request(app)
        .get(`/v1/order-items/${orderItemOne.id}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.OK);
    });
    test('Should return 401 if access token is invalid', async () => {
      await request(app)
        .get(`/v1/order-items/${orderItemOne.id}`)
        .set('Authorization', `Bearer invalidtoken`)
        .expect(httpStatus.UNAUTHORIZED);
    });
    test('Should return 404 if orderItem is not found', async () => {
      await prisma.orderItem.deleteMany({});
      await request(app)
        .get(`/v1/order-items/${v4()}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.NOT_FOUND);
    });
    test('Should return 400 if ID is not an UUID', async () => {
      await request(app)
        .get(`/v1/order-items/123`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });
  });
  // describe('PATCH:id', () => {
  //   test('Should return 200 and a orderItem', async () => {
  //     await request(app)
  //       .patch(`/v1/order-items/${orderItemOne.id}`)
  //       .set('Authorization', `Bearer ${userOneAccessToken}`)
  //       .send({ quantity: faker })
  //       .expect(httpStatus.OK);
  //   });
  //   test('Should return 401 if access token is invalid', async () => {
  //     await request(app)
  //       .patch(`/v1/order-items/${orderItemOne.id}`)
  //       .set('Authorization', `Bearer invalidtoken`)
  //       .expect(httpStatus.UNAUTHORIZED);
  //   });
  //   test('Should return 404 if orderItem is not found', async () => {
  //     await prisma.orderItem.deleteMany({});
  //     await request(app)
  //       .patch(`/v1/order-items/${v4()}`)
  //       .set('Authorization', `Bearer ${userOneAccessToken}`)
  //       .expect(httpStatus.NOT_FOUND);
  //   });
  //   test('Should return 400 if ID is not an UUID', async () => {
  //     await request(app)
  //       .patch(`/v1/order-items/123`)
  //       .set('Authorization', `Bearer ${userOneAccessToken}`)
  //       .expect(httpStatus.BAD_REQUEST);
  //   });
  // });
});
