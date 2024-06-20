/* eslint-disable no-restricted-syntax */
import { BAD_REQUEST, OK, UNAUTHORIZED } from 'http-status';
import { supertest } from '../helpers';
import { userOne, insertUsers } from '../fixtures/user.fixture';
import { userOneAccessToken } from '../fixtures/token.fixture';
import prisma from '../../src/lib/database';
import {
  categoryOne,
  insertCategory,
  insertProduct,
  productOne,
  productThree,
  productTwo,
} from '../fixtures/product.fixture';

let agent: Awaited<typeof supertest>;
beforeAll(async () => {
  agent = await supertest;
});

describe('Product route', () => {
  describe('GET /v1/products', () => {
    it('should return ok (200) and show the list of products', async () => {
      await insertUsers(userOne);
      await insertCategory(categoryOne);
      await insertProduct(productOne);
      const productCount = await prisma.product.count();
      const response = await agent
        .get('/v1/products')
        .auth(userOneAccessToken, {
          type: 'bearer',
        })
        .query({
          pageIndex: 1,
          pageSize: productCount,
        })
        .expect(OK);
      const { data } = response.body;
      expect(data.datas.length).toEqual(productCount);
    });

    it('should return ok (200) and correctly doing paginated', async () => {
      const pageSize = 2;
      await insertUsers(userOne);
      await insertCategory(categoryOne);
      await insertProduct(productOne, productTwo, productThree);
      const responses = await Promise.all([
        agent
          .get('/v1/products')
          .auth(userOneAccessToken, {
            type: 'bearer',
          })
          .query({
            pageIndex: 1,
            pageSize,
          })
          .expect(OK),
        agent
          .get('/v1/products')
          .auth(userOneAccessToken, {
            type: 'bearer',
          })
          .query({
            pageIndex: 2,
            pageSize,
          })
          .expect(OK),
      ]);

      let passed = true;
      const visited = new Set<unknown>();
      // eslint-disable-next-line no-labels
      loop1: for (const response of responses) {
        expect(response.body.data.datas.length).toBeLessThanOrEqual(pageSize);
        for (const data of response.body.data.datas) {
          if (visited.has(data.id)) {
            passed = false;
            // eslint-disable-next-line no-labels
            break loop1;
          }
          visited.add(data.id);
        }
      }

      expect(passed).toEqual(true);
    });

    it("should return unauthorized (401) if bearer token isn't in headers", async () => {
      await agent.get('/v1/products').expect(UNAUTHORIZED);
    });

    it('should return bad request (400) if query pageIndex or pageSize is missing', async () => {
      await insertUsers(userOne);
      await Promise.all([
        agent.get('/v1/products').auth(userOneAccessToken, { type: 'bearer' }).expect(BAD_REQUEST),
        agent.get('/v1/products').auth(userOneAccessToken, { type: 'bearer' }).query({ pageIndex: 1 }).expect(BAD_REQUEST),
        agent.get('/v1/products').auth(userOneAccessToken, { type: 'bearer' }).query({ pageSize: 1 }).expect(BAD_REQUEST),
      ]);
    });

    it('should return bad request (400) if pageIndex or pageSize is less than 1', async () => {
      await insertUsers(userOne);
      await agent
        .get('/v1/products')
        .auth(userOneAccessToken, { type: 'bearer' })
        .query({
          pageIndex: 1,
          pageSize: 0,
        })
        .expect(BAD_REQUEST);
      await agent
        .get('/v1/products')
        .auth(userOneAccessToken, { type: 'bearer' })
        .query({
          pageIndex: 0,
          pageSize: 1,
        })
        .expect(BAD_REQUEST);
    });

    it('should return ok (200) and data of the last index if the pageIndex is out of range', async () => {
      await insertUsers(userOne);
      await insertCategory(categoryOne);
      await insertProduct(productOne, productTwo, productThree);
      const response = await agent
        .get('/v1/products')
        .auth(userOneAccessToken, { type: 'bearer' })
        .query({
          pageIndex: 69,
          pageSize: 1,
        })
        .expect(OK);
      expect(response.body.data.index).toEqual(response.body.data.numOfPages);
      expect(response.body.data.datas.length).toBeGreaterThan(0);
    });
  });
});
