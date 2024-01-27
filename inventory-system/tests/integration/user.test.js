const request = require('supertest');
const httpStatus = require('http-status');
const { faker } = require('@faker-js/faker');
const { v4 } = require('uuid');
const app = require('../../src/app');
const { userOne, insertUsers } = require('../fixtures/user.fixture');
const { userOneAccessToken } = require('../fixtures/token.fixture');
const prisma = require('../../prisma');

describe('User routes', () => {
  let newUser;
  beforeEach(async () => {
    await insertUsers([userOne]);

    newUser = {
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      role: 'user',
      password: 'password1',
    };
  });
  describe('POST /v1/users', () => {
    test('Should return 201 if user is created', async () => {
      const res = await request(app)
        .post('/v1/users')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newUser)
        .expect(httpStatus.CREATED);

      const userData = res.body.data;

      expect(userData).toMatchObject({
        id: expect.anything(),
        name: newUser.name,
        email: newUser.email,
        password: expect.anything(),
        role: newUser.role,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
        isEmailVerified: false,
      });
    });
    test('Should return 400 if email already taken', async () => {
      await prisma.user.create({ data: newUser });

      await request(app)
        .post('/v1/users')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });
    test('Should return 400 if no email given', async () => {
      delete newUser.email;

      await request(app)
        .post('/v1/users')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });
    test('Should return 400 if no name given', async () => {
      delete newUser.name;

      await request(app)
        .post('/v1/users')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });
    test('Should return 400 if no password given', async () => {
      delete newUser.password;

      await request(app)
        .post('/v1/users')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });
  });
});
