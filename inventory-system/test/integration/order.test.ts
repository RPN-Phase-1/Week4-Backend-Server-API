/* eslint-disable import/no-extraneous-dependencies */
import { BAD_REQUEST, CREATED, NOT_FOUND, OK } from 'http-status';
import { v4 } from 'uuid';
import prisma from '../../src/lib/database';
import pick from '../../src/lib/utils/Pick';
import { createFakeOrder, insertOrder, orderOne } from '../fixtures/order.fixture';
import { userOneAccessToken } from '../fixtures/token.fixture';
import { insertUsers, userOne } from '../fixtures/user.fixture';
import { supertest } from '../helpers';

let agent: Awaited<typeof supertest>;
beforeAll(async () => {
  agent = await supertest;
});

describe('Order routes', () => {
  describe('POST /v1/orders', () => {
    const newOrder = pick(createFakeOrder(userOne.id, userOne.name, userOne.email), [
      'customerEmail',
      'customerName',
      'totalPrice',
      'userId',
      'date',
    ]);

    it('should return created (201) and succesfully create the order', async () => {
      await insertUsers(userOne);
      const { body } = await agent
        .post('/v1/orders')
        .auth(userOneAccessToken, { type: 'bearer' })
        .send(newOrder)
        .expect(CREATED);
      const data = await prisma.order.findFirst({ where: { id: body.data.id } });
      expect(data).toBeDefined();
      expect(data).toMatchObject({
        id: body.data.id,
        date: newOrder.date,
        userId: userOne.id,
        customerName: newOrder.customerName,
        customerEmail: newOrder.customerEmail,
        totalPrice: newOrder.totalPrice,
        createdAt: new Date(body.data.createdAt),
        updatedAt: new Date(body.data.updatedAt),
      });
    });

    it('should return bad request (400) if some of body  parts is missing', async () => {
      await insertUsers(userOne);
      await agent
        .post('/v1/orders')
        .auth(userOneAccessToken, { type: 'bearer' })
        .send({ date: new Date() })
        .expect(BAD_REQUEST);
    });
  });

  describe('GET /v1/orders/:orderId', () => {
    it('should return ok (200) and succesfully get the order details', async () => {
      await insertUsers(userOne);
      await insertOrder(orderOne);
      const { body } = await agent.get(`/v1/orders/${orderOne.id}`).auth(userOneAccessToken, { type: 'bearer' }).expect(OK);
      expect(body.data).toMatchObject({
        id: orderOne.id,
        date: orderOne.date.toISOString(),
        userId: orderOne.userId,
        customerName: orderOne.customerName,
        customerEmail: orderOne.customerEmail,
        totalPrice: orderOne.totalPrice,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });
    });
  });

  describe('PUT /v1/orders/:orderId', () => {
    it('should return ok (200) and succesfully updated the order', async () => {
      await insertUsers(userOne);
      await insertOrder(orderOne);

      const totalPrice = 100;

      await agent
        .put(`/v1/orders/${orderOne.id}`)
        .auth(userOneAccessToken, { type: 'bearer' })
        .send({ totalPrice })
        .expect(OK);

      const data = await prisma.order.findFirst({ where: { id: orderOne.id } });

      expect(data?.totalPrice).toEqual(totalPrice);
    });

    it('should return not found (404) if user trying modified non-existent order', async () => {
      await insertUsers(userOne);
      await insertOrder(orderOne);

      const nonExistentId = v4();

      await agent
        .put(`/v1/orders/${nonExistentId}`)
        .auth(userOneAccessToken, { type: 'bearer' })
        .send({ totalPrice: 100 })
        .expect(NOT_FOUND);
    });
  });

  describe('DELETE /v1/orders/:orderId', () => {
    it('should return ok (200) and succesfully deleted the order', async () => {
      await insertUsers(userOne);
      await insertOrder(orderOne);
      await agent.delete(`/v1/orders/${orderOne.id}`).auth(userOneAccessToken, { type: 'bearer' }).expect(OK);
      const data = await prisma.order.findFirst({ where: { id: orderOne.id } });
      expect(data).toBeNull();
    });
  });
});
