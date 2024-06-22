/* eslint-disable no-restricted-syntax */
import { BAD_REQUEST, CREATED, NOT_FOUND, OK, UNAUTHORIZED } from 'http-status';
import { supertest } from '../helpers';
import { userOne, insertUsers, userAdmin } from '../fixtures/user.fixture';
import { adminAccessToken, userOneAccessToken } from '../fixtures/token.fixture';
import prisma from '../../src/lib/database';
import {
  getFakeProduct,
  categoryOne,
  insertCategory,
  insertProduct,
  productOne,
  productThree,
  productTwo,
} from '../fixtures/product.fixture';
import pick from '../../src/lib/utils/Pick';

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

    it('should return ok (200) and make thePageSize equal to database size if pageSize is out of range', async () => {
      await insertUsers(userOne);
      await insertCategory(categoryOne);
      await insertProduct(productOne, productTwo, productThree);
      const response = await agent
        .get('/v1/products')
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

  describe('POST /v1/products', () => {
    const newProduct = pick(getFakeProduct(userOne.id, categoryOne.id, categoryOne.name), [
      'name',
      'price',
      'userId',
      'categoryId',
      'description',
      'quantityInStock',
    ]);

    it('should return created (201) and succesfully created the product', async () => {
      await insertUsers(userOne);
      await insertCategory(categoryOne);
      const response = await agent
        .post('/v1/products')
        .auth(userOneAccessToken, { type: 'bearer' })
        .send(newProduct)
        .expect(CREATED);

      expect(response.body.data).toMatchObject({
        id: expect.anything(),
        name: newProduct.name,
        price: newProduct.price,
        userId: newProduct.userId,
        categoryId: newProduct.categoryId,
        quantityInStock: newProduct.quantityInStock,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });

      const dbdata = await prisma.product.findFirst({ where: { id: response.body.data.id } });
      expect(dbdata).toBeDefined();
      expect(dbdata).toMatchObject({
        id: expect.anything(),
        name: newProduct.name,
        price: newProduct.price,
        userId: newProduct.userId,
        categoryId: newProduct.categoryId,
        quantityInStock: newProduct.quantityInStock,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });
    });

    it('should return bad request (400) if body is missing', async () => {
      await insertUsers(userOne);
      await insertCategory(categoryOne);
      await agent.post('/v1/products').auth(userOneAccessToken, { type: 'bearer' }).expect(BAD_REQUEST);
    });
  });

  describe('PUT /v1/products/:productId', () => {
    it('should return ok (200) and succesfully updated the products', async () => {
      await insertUsers(userOne);
      await insertCategory(categoryOne);
      await insertProduct(productOne);

      const { name } = getFakeProduct(userOne.id, categoryOne.id, categoryOne.name);

      await agent
        .put(`/v1/products/${productOne.id}`)
        .auth(userOneAccessToken, { type: 'bearer' })
        .send({ name })
        .expect(OK);
      const product = await prisma.product.findFirst({ where: { id: productOne.id } })!;

      expect(product?.name).toEqual(name);
    });

    it('should return not found (404) if product id is not found', async () => {
      await insertUsers(userOne);
      await insertCategory(categoryOne);
      await insertProduct(productOne);

      const nonExistentId = productTwo.id;

      await agent
        .put(`/v1/products/${nonExistentId}`)
        .auth(userOneAccessToken, { type: 'bearer' })
        .send({ name: 'Updated Name' })
        .expect(NOT_FOUND);
    });

    it('should return ok (200) and update only provided fields', async () => {
      await insertUsers(userOne);
      await insertCategory(categoryOne);
      await insertProduct(productOne);

      const updateData = { description: 'New Description' };

      const response = await agent
        .put(`/v1/products/${productOne.id}`)
        .auth(userOneAccessToken, { type: 'bearer' })
        .send(updateData)
        .expect(OK);

      expect(response.body.data.name).toEqual(productOne.name);
      expect(response.body.data.description).toEqual(updateData.description);
    });
  });

  describe('DELETE /v1/products/:productId', () => {
    it('should return ok (200) and succesfully deleted products', async () => {
      await insertUsers(userOne);
      await insertCategory(categoryOne);
      await insertProduct(productOne);
      await agent.delete(`/v1/products/${productOne.id}`).auth(userOneAccessToken, { type: 'bearer' }).expect(OK);

      const product = await prisma.product.findFirst({ where: { id: productOne.id } });

      expect(product).toBeNull();
    });
    it('should return not found (404) if product id is not found', async () => {
      await insertUsers(userOne);
      await insertCategory(categoryOne);
      await insertProduct(productOne);

      const nonExistentId = productTwo.id;

      await agent.delete(`/v1/products/${nonExistentId}`).auth(userOneAccessToken, { type: 'bearer' }).expect(NOT_FOUND);
    });
  });

  describe('GET /v1/products/:productId', () => {
    it('should return ok (200) and succesfully retrieved products', async () => {
      await insertUsers(userOne);
      await insertCategory(categoryOne);
      await insertProduct(productOne);
      const response = await agent
        .get(`/v1/products/${productOne.id}`)
        .auth(userOneAccessToken, { type: 'bearer' })
        .expect(OK);

      expect(response.body.data).toMatchObject({
        id: productOne.id,
        name: productOne.name,
        price: productOne.price,
        userId: productOne.userId,
        categoryId: productOne.categoryId,
        quantityInStock: productOne.quantityInStock,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });
    });
  });

  describe('GET /v1/users/:userId/products', () => {
    it('should return ok (200) and succesfully retrieved user products', async () => {
      await insertUsers(userOne, userAdmin);
      await insertCategory(categoryOne);
      await insertProduct(productOne, productTwo, productThree);
      const response = await agent
        .get(`/v1/users/${userOne.id}/products`)
        .auth(adminAccessToken, { type: 'bearer' })
        .expect(OK);

      expect(response.body.data.length).toEqual(3);
      const data = await prisma.product.findMany({ where: { userId: userOne.id } });
      expect(response.body.data.sort()).toMatchObject(
        data.map((x) => ({ ...x, updatedAt: x.updatedAt.toISOString(), createdAt: x.createdAt.toISOString() })).sort()
      );
    });

    it("should return unauthorized (401) if access token isn't admin", async () => {
      await insertUsers(userOne, userAdmin);
      await insertCategory(categoryOne);
      await insertProduct(productOne, productTwo, productThree);
      await agent.get(`/v1/users/${userOne.id}/products`).auth(userOneAccessToken, { type: 'bearer' }).expect(UNAUTHORIZED);
    });
  });
});
