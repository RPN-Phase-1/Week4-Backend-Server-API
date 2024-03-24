const request = require('supertest'); // Request HTTP
const faker = require('faker'); // Fake data
const httpStatus = require('http-status');
const app = require('../../src/app');
const { productOne, insertProducts, deleteProducts } = require('../fixtures/product.fixture');
const { categoryOne, insertCategories, deleteCategories } = require('../fixtures/category.fixture');
const { userOne, insertUsers, deleteUsers } = require('../fixtures/user.fixture');
const { userOneAccessToken } = require('../fixtures/token.fixture');
const prisma = require('../../prisma');

describe('Products Route', () => {
  let product = null;
  beforeEach(async () => {
    await insertUsers([userOne]);
    await insertCategories([categoryOne]);

    product = {
      name: faker.vehicle.vehicle(),
      description: faker.lorem.sentence(),
      price: faker.datatype.float({ min: 10, max: 100, precision: 2 }),
      quantityInStock: faker.datatype.number({ min: 10, max: 100 }),
      categoryId: categoryOne.id,
      userId: userOne.id,
    };
  });
  afterEach(async () => {
    await deleteProducts();
    await deleteCategories();
    await deleteUsers();
  });

  describe('Authentication and CRUD test', () => {
    describe('Authentication', () => {
      test('Should return 401 error if no access token', async () => {
        await request(app).post('/v1/products').send(product).expect(httpStatus.UNAUTHORIZED);
      });

      test('Should return 200 if token is valid', async () => {
        await insertProducts(userOne, categoryOne, [productOne]);
        await request(app).get('/v1/products').set('Authorization', `Bearer ${userOneAccessToken}`).expect(httpStatus.OK);
      });
    });

    describe('POST Product', () => {});
  });
});
