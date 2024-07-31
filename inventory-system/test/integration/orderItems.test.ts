/* eslint-disable import/no-extraneous-dependencies */
import { BAD_REQUEST, CREATED, NOT_ACCEPTABLE, NOT_FOUND, OK } from 'http-status';
import { v4 } from 'uuid';
import pick from '../../src/lib/utils/Pick';
import { createFakeOrderItem, insertOrder, orderOne, orderItemOne, insertOrderItem } from '../fixtures/order.fixture';
import { categoryOne, insertCategory, insertProduct, productOne } from '../fixtures/product.fixture';
import { userOneAccessToken } from '../fixtures/token.fixture';
import { insertUsers, userOne } from '../fixtures/user.fixture';
import { supertest } from '../helpers';
import prisma from '../../src/lib/database';

let agent: Awaited<typeof supertest>;
beforeAll(async () => {
  agent = await supertest;
});

describe('Order routes', () => {
  describe('POST /v1/order-items', () => {
    let newOrderItem: Omit<typeof orderItemOne, 'id'>;
    beforeEach(async () => {
      await insertUsers(userOne);
      await insertCategory(categoryOne);
      await insertProduct(productOne);
      await insertOrder(orderOne);

      newOrderItem = pick(createFakeOrderItem(orderOne.id, productOne.id, productOne.price), [
        'quantity',
        'unitPrice',
        'productId',
        'orderId',
      ]);
    });

    it('should return created (201) and succesfully create the orderItem', async () => {
      const { body } = await agent
        .post('/v1/order-items')
        .auth(userOneAccessToken, { type: 'bearer' })
        .send(newOrderItem)
        .expect(CREATED);
      const orderItem = await prisma.orderItem.findFirst({ where: { id: body.data.id } });
      expect(orderItem).toBeDefined();
      expect(body.data).toMatchObject({
        ...orderItem,
        createdAt: orderItem?.createdAt.toISOString(),
        updatedAt: orderItem?.updatedAt.toISOString(),
      });
    });

    it('should return bad request (400) if some of body  parts is missing', async () => {
      await agent
        .post('/v1/order-items')
        .auth(userOneAccessToken, { type: 'bearer' })
        .send(pick(newOrderItem, ['productId']))
        .expect(BAD_REQUEST);
    });

    it('should return not acceptable (407) if quantity is greater than product stock', async () => {
      newOrderItem.quantity = 11;
      await agent
        .post('/v1/order-items')
        .auth(userOneAccessToken, { type: 'bearer' })
        .send(newOrderItem)
        .expect(NOT_ACCEPTABLE);
    });
  });

  describe('GET /v1/order-items/:orderId', () => {
    beforeEach(async () => {
      await insertUsers(userOne);
      await insertCategory(categoryOne);
      await insertProduct(productOne);
      await insertOrder(orderOne);
      await insertOrderItem(orderItemOne);
    });

    it('should return ok (200) and succesfully get the order details', async () => {
      const { body } = await agent
        .get(`/v1/order-items/${orderItemOne.id}`)
        .auth(userOneAccessToken, { type: 'bearer' })
        .expect(OK);
      expect(body.data).toMatchObject({ ...orderItemOne, updatedAt: expect.anything(), createdAt: expect.anything() });
    });
  });

  describe('PUT /v1/order-items/:orderId', () => {
    beforeEach(async () => {
      await insertUsers(userOne);
      await insertCategory(categoryOne);
      await insertProduct(productOne);
      await insertOrder(orderOne);
      await insertOrderItem(orderItemOne);
    });

    it('should return ok (200) and succesfully updated the order', async () => {
      const unitPrice = 5_000_000;
      await agent
        .put(`/v1/order-items/${orderItemOne.id}`)
        .send({ unitPrice })
        .auth(userOneAccessToken, { type: 'bearer' })
        .expect(OK);
      const data = await prisma.orderItem.findFirst({ where: { id: orderItemOne.id }, select: { unitPrice: true } });
      expect(data?.unitPrice).toEqual(unitPrice);
    });

    it('should return not found (404) if user trying modified non-existent order', async () => {
      const nonExistent = v4();
      await agent
        .put(`/v1/order-items/${nonExistent}`)
        .send({ unitPrice: 1 })
        .auth(userOneAccessToken, { type: 'bearer' })
        .expect(NOT_FOUND);
    });
  });

  describe('DELETE /v1/order-items/:orderId', () => {
    beforeEach(async () => {
      await insertUsers(userOne);
      await insertCategory(categoryOne);
      await insertProduct(productOne);
      await insertOrder(orderOne);
    });

    it('should return ok (200) and succesfully deleted the order', async () => {
      await insertOrderItem(orderItemOne);
      await agent.delete(`/v1/order-items/${orderItemOne.id}`).auth(userOneAccessToken, { type: 'bearer' }).expect(OK);
      const data = await prisma.orderItem.findFirst({ where: { id: orderItemOne.id } });
      expect(data).toBeNull();
    });
  });
});
