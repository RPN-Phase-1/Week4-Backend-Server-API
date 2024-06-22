/* eslint-disable no-restricted-syntax */
import { BAD_REQUEST, CREATED, OK, UNAUTHORIZED } from 'http-status';
import { supertest } from '../helpers';
import { insertUsers, userOne } from '../fixtures/user.fixture';
import { categoryOne, categoryThree, categoryTwo, insertCategory } from '../fixtures/product.fixture';
import prisma from '../../src/lib/database';
import { userOneAccessToken } from '../fixtures/token.fixture';

let agent: Awaited<typeof supertest>;
beforeAll(async () => {
  agent = await supertest;
});

describe('Category routes', () => {
  describe('GET /v1/categories', () => {
    it('should return ok (200) and show the list of categories', async () => {
      await insertUsers(userOne);
      await insertCategory(categoryOne);
      const categoryCount = await prisma.category.count();
      const response = await agent
        .get('/v1/categories')
        .auth(userOneAccessToken, {
          type: 'bearer',
        })
        .query({
          pageIndex: 1,
          pageSize: categoryCount,
        })
        .expect(OK);
      const { data } = response.body;
      expect(data.datas.length).toEqual(categoryCount);
    });

    it('should return ok (200) and correctly doing paginated', async () => {
      const pageSize = 2;
      await insertUsers(userOne);
      await insertCategory(categoryOne, categoryTwo, categoryThree);
      const responses = await Promise.all([
        agent
          .get('/v1/categories')
          .auth(userOneAccessToken, {
            type: 'bearer',
          })
          .query({
            pageIndex: 1,
            pageSize,
          })
          .expect(OK),
        agent
          .get('/v1/categories')
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
      await agent.get('/v1/categories').expect(UNAUTHORIZED);
    });

    it('should return bad request (400) if query pageIndex or pageSize is missing', async () => {
      await insertUsers(userOne);
      await Promise.all([
        agent.get('/v1/categories').auth(userOneAccessToken, { type: 'bearer' }).expect(BAD_REQUEST),
        agent.get('/v1/categories').auth(userOneAccessToken, { type: 'bearer' }).query({ pageIndex: 1 }).expect(BAD_REQUEST),
        agent.get('/v1/categories').auth(userOneAccessToken, { type: 'bearer' }).query({ pageSize: 1 }).expect(BAD_REQUEST),
      ]);
    });

    it('should return bad request (400) if pageIndex or pageSize is less than 1', async () => {
      await insertUsers(userOne);
      await agent
        .get('/v1/categories')
        .auth(userOneAccessToken, { type: 'bearer' })
        .query({
          pageIndex: 1,
          pageSize: 0,
        })
        .expect(BAD_REQUEST);
      await agent
        .get('/v1/categories')
        .auth(userOneAccessToken, { type: 'bearer' })
        .query({
          pageIndex: 0,
          pageSize: 1,
        })
        .expect(BAD_REQUEST);
    });

    it('should return ok (200) and data of the last index if the pageIndex is out of range', async () => {
      await insertUsers(userOne);
      await insertCategory(categoryOne, categoryTwo, categoryThree);
      const response = await agent
        .get('/v1/categories')
        .auth(userOneAccessToken, { type: 'bearer' })
        .query({
          pageIndex: 69,
          pageSize: 1,
        })
        .expect(OK);
      expect(response.body.data.index).toEqual(response.body.data.numOfPages);
      expect(response.body.data.datas.length).toBeGreaterThan(0);
    });

    it('should return ok (200) and make thePageSize equal to database size if pageSize is out of range', async () => {
      await insertUsers(userOne);
      await insertCategory(categoryOne, categoryTwo, categoryThree);
      const response = await agent
        .get('/v1/categories')
        .auth(userOneAccessToken, { type: 'bearer' })
        .query({
          pageIndex: 1,
          pageSize: 69,
        })
        .expect(OK);
      expect(response.body.data.datas.length).toEqual(3);
      expect(response.body.data.numOfPages).toEqual(1);
    });
  });

  describe('POST /v1/categories', () => {
    it('should return ok (200) and created new category', async () => {
      await insertUsers(userOne);
      await insertCategory(categoryOne);
      const {
        body: { data },
      } = await agent
        .post('/v1/categories/')
        .auth(userOneAccessToken, { type: 'bearer' })
        .send({ name: 'newCategory' })
        .expect(CREATED);
      const categoryData = await prisma.category.findFirst({ where: { id: data.id } });
      expect(data.name).toEqual(categoryData?.name);
    });
  });

  describe('GET /v1/categories/:categoryId', () => {
    it('should return ok (200) and send category based on category id', async () => {
      await insertUsers(userOne);
      await insertCategory(categoryOne);
      const response = await agent
        .get(`/v1/categories/${categoryOne.id}`)
        .auth(userOneAccessToken, { type: 'bearer' })
        .expect(OK);
      const categoryData = await prisma.category.findFirst({ where: { id: categoryOne.id } });
      expect(response.body.data).toMatchObject({
        ...categoryData,
        createdAt: categoryData?.createdAt.toISOString(),
        updatedAt: categoryData?.updatedAt.toISOString(),
      });
    });
  });

  describe('PUT /v1/categories/:categoryId', () => {
    it('should return ok (200) and update category', async () => {
      await insertUsers(userOne);
      await insertCategory(categoryOne);
      const name = 'updatedNAme';
      const response = await agent
        .put(`/v1/categories/${categoryOne.id}`)
        .auth(userOneAccessToken, { type: 'bearer' })
        .send({ name })
        .expect(OK);
      const categoryData = await prisma.category.findFirst({ where: { id: categoryOne.id } });
      expect(response.body.data.name).toEqual(name);
      expect(response.body.data.name).toEqual(categoryData?.name);
    });
  });

  describe('DELETE /v1/categories/:categoryId', () => {
    it('should return ok (200) and deleted category category', async () => {
      await insertUsers(userOne);
      await insertCategory(categoryOne);
      await agent.delete(`/v1/categories/${categoryOne.id}`).auth(userOneAccessToken, { type: 'bearer' }).expect(OK);
      const categoryData = await prisma.category.findFirst({ where: { id: categoryOne.id } });
      expect(categoryData).toBeNull();
    });
  });
});
