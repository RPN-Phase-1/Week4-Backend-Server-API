const request = require('supertest');
const { faker } = require('@faker-js/faker');
const httpStatus = require('http-status');
const { v4 } = require('uuid');
const app = require('../../src/app');
const { userOne } = require('../fixtures/user.fixture');
const { userOneAccessToken } = require('../fixtures/token.fixture');
const { categoryOne } = require('../fixtures/category.fixture');
const prisma = require('../../prisma');
const { insertProducts, productOne } = require('../fixtures/product.fixture');

describe('Products Route', () => {
  let newProduct;
  let newCategory;
  let newUser;
  beforeEach(async () => {
    newUser = await prisma.user.create({ data: userOne });
    newCategory = await prisma.category.create({ data: categoryOne });

    newProduct = await prisma.product.create({
      data: {
        id: v4(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({ min: 100, max: 200 }),
        quantityInStock: faker.number.int({ max: 100 }),
        categoryId: newCategory.id,
        userId: newUser.id,
      },
    });
  });
  describe('POST Method on /products', () => {
    test('Should return 201 if product is created', async () => {
      const res = await request(app)
        .post('/v1/products')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(productOne)
        .expect(httpStatus.CREATED);

      const productData = res.body.data;

      expect(productData).toEqual({
        id: expect.anything(),
        name: productOne.name,
        description: productOne.description,
        price: productOne.price,
        quantityInStock: productOne.quantityInStock,
        categoryId: expect.anything(),
        userId: expect.anything(),
        category: expect.any(Array),
        user: expect.any(Array),
      });
    });
  });
  describe('GET Method on /products & /products:id', () => {
    describe('GET /products route', () => {
      test('Should return 200 and all products', async () => {
        await insertProducts([newProduct]);
        const res = await request(app)
          .get('/v1/products')
          .set('Authorization', `Bearer ${userOneAccessToken}`)
          .expect(httpStatus.OK);

        const productsData = res.body.data;

        expect(productsData).toEqual([
          {
            id: newProduct.id,
            name: newProduct.name,
            description: newProduct.description,
            price: newProduct.price,
            quantityInStock: newProduct.quantityInStock,
            categoryId: newCategory.id,
            userId: newUser.id,
            category: expect.any(Array),
            user: expect.any(Array),
          },
        ]);
      });

      test('Should return 404 if no product has been found', async () => {
        await prisma.product.deleteMany();
        const res = await request(app)
          .get('/v1/products')
          .set('Authorization', `Bearer ${userOneAccessToken}`)
          .expect(httpStatus.NOT_FOUND);

        const resData = res.body.message;

        expect(resData).toEqual('Product not found');
      });
      test('Should return 404 if user not logged in', async () => {
        const res = await request(app)
          .get('/v1/products')
          .set('Authorization', `Bearer invalidToken `)
          .expect(httpStatus.UNAUTHORIZED);

        const resData = res.body.message;

        expect(resData).toEqual('Please authenticate');
      });
    });

    describe('GET /product:id route', () => {
      test('Should return 200 and product data if id valid', async () => {
        await insertProducts([newProduct]);
        const res = await request(app)
          .get(`/v1/products/${newProduct.id}`)
          .set('Authorization', `Bearer ${userOneAccessToken}`)
          .expect(httpStatus.OK);

        const productData = res.body.data;

        expect(productData).toEqual({
          id: newProduct.id,
          name: newProduct.name,
          description: newProduct.description,
          price: newProduct.price,
          quantityInStock: newProduct.quantityInStock,
          categoryId: newCategory.id,
          userId: newUser.id,
          category: expect.any(Array),
          user: expect.any(Array),
        });
      });

      test('Should return 404 if product not found', async () => {
        const res = await request(app)
          .get(`/v1/products/${v4()}`)
          .set('Authorization', `Bearer ${userOneAccessToken}`)
          .expect(httpStatus.NOT_FOUND);

        const resData = res.body.message;

        expect(resData).toEqual('Product not found');
      });
      test('Should return 400 if invalid id given', async () => {
        const res = await request(app)
          .get(`/v1/products/123`)
          .set('Authorization', `Bearer ${userOneAccessToken}`)
          .expect(httpStatus.BAD_REQUEST);

        const resData = res.body.message;

        expect(resData).toContain('must be a valid UUID');
      });
      test('Should return 404 if user not logged in', async () => {
        const res = await request(app)
          .get('/v1/products')
          .set('Authorization', `Bearer invalidToken `)
          .expect(httpStatus.UNAUTHORIZED);

        const resData = res.body.data;

        expect(resData).toEqual('please authenticate');
      });
    });
  });
});
