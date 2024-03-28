const request = require('supertest'); // Request HTTP
const faker = require('faker'); // Fake data
const httpStatus = require('http-status');
const app = require('../../src/app');
const { userOne, admin, insertUsers, deleteUsers } = require('../fixtures/user.fixture');
const { userOneAccessToken, adminAccessToken } = require('../fixtures/token.fixture');
const prisma = require('../../prisma');

describe('User Routes', () => {
  let newUser = null;
  beforeEach(async () => {
    await insertUsers([userOne, admin]);

    newUser = {
      name: faker.name.findName(),
      email: faker.internet.email().toLowerCase(),
      password: 'password1',
      role: 'user',
    };
  });
  afterEach(async () => {
    await deleteUsers();
  });

  describe('Authentication and CRUD test', () => {
    describe('Authentication', () => {
      test('Should return 401 error if no access token', async () => {
        await request(app).get('/v1/users').expect(httpStatus.UNAUTHORIZED);
      });

      // POST
      test('Should return 401 if role is not admin', async () => {
        await request(app)
          .post('/v1/users')
          .set('Authorization', `Bearer ${userOneAccessToken}`)
          .expect(httpStatus.UNAUTHORIZED);
      });

      // GET
      test('Should return 401 if role is not admin', async () => {
        await request(app)
          .get('/v1/users')
          .set('Authorization', `Bearer ${userOneAccessToken}`)
          .expect(httpStatus.UNAUTHORIZED);
      });

      // PUT
      test('Should return 401 if role is not admin', async () => {
        await request(app)
          .put(`/v1/users/${userOne.id}`)
          .set('Authorization', `Bearer ${userOneAccessToken}`)
          .expect(httpStatus.UNAUTHORIZED);
      });

      // DELETE
      test('Should return 401 if role is not admin', async () => {
        await request(app)
          .delete(`/v1/users/${userOne.id}`)
          .set('Authorization', `Bearer ${userOneAccessToken}`)
          .expect(httpStatus.UNAUTHORIZED);
      });
    });

    describe('CRUD test', () => {
      describe('POST User', () => {
        test('Should return 201 if request body is valid and role is admin', async () => {
          const res = await request(app)
            .post('/v1/users')
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .send(newUser)
            .expect(httpStatus.CREATED);
          const resData = res.body.data;

          expect(resData).toEqual({
            id: expect.anything(),
            name: newUser.name,
            email: newUser.email,
            password: expect.anything(),
            role: 'user',
            isEmailVerified: false,
            createdAt: expect.anything(),
            updatedAt: expect.anything(),
          });

          const dbUser = await prisma.user.findUnique({
            where: {
              email: newUser.email,
            },
          });

          expect(dbUser).toBeDefined();
          expect(dbUser.password).not.toBe(newUser.password);
        });

        test('Should return 400 if email is already used', async () => {
          newUser.email = userOne.email;
          await request(app)
            .post('/v1/users')
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .send(newUser)
            .expect(httpStatus.BAD_REQUEST);
        });

        test('Should return 400 if email is invalid', async () => {
          newUser.email = 'invalidEmail';
          await request(app)
            .post('/v1/users')
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .send(newUser)
            .expect(httpStatus.BAD_REQUEST);
        });

        test('Should return 400 if request body is not a valid data type', async () => {
          newUser.name = 12345;
          await request(app)
            .post('/v1/users')
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .send(newUser)
            .expect(httpStatus.BAD_REQUEST);
        });

        test('Should return 400 if password less than 8 characters', async () => {
          newUser.password = 'passwo1';
          await request(app)
            .post('/v1/users')
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .send(newUser)
            .expect(httpStatus.BAD_REQUEST);
        });

        test('Should return 400 if password does not contain both letters and numbers', async () => {
          newUser.password = 'password';
          await request(app)
            .post('/v1/users')
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .send(newUser)
            .expect(httpStatus.BAD_REQUEST);
        });
      });

      describe('GET User', () => {
        test('Should return 200 if database is not empty and role is admin', async () => {
          const res = await request(app)
            .get('/v1/users')
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .expect(httpStatus.OK);
          const resData = res.body.data.sort((a, b) => {
            if (a.role < b.role) {
              return -1;
            }
            if (a.role > b.role) {
              return 1;
            }
            return 0;
          });

          expect(resData).toEqual([
            {
              id: expect.anything(),
              name: admin.name,
              email: admin.email,
              password: expect.anything(),
              role: 'admin',
              isEmailVerified: false,
              createdAt: expect.anything(),
              updatedAt: expect.anything(),
            },
            {
              id: expect.anything(),
              name: userOne.name,
              email: userOne.email,
              password: expect.anything(),
              role: 'user',
              isEmailVerified: false,
              createdAt: expect.anything(),
              updatedAt: expect.anything(),
            },
          ]);

          expect(resData[0].password).not.toBe(admin.password);
          expect(resData[1].password).not.toBe(userOne.password);
        });

        test('Should return 200 if role is admin and params userId is exists', async () => {
          const res = await request(app)
            .get(`/v1/users/${userOne.id}`)
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .expect(httpStatus.OK);
          const resData = res.body.data;

          expect(resData).toEqual({
            id: expect.anything(),
            name: userOne.name,
            email: userOne.email,
            password: expect.anything(),
            role: 'user',
            isEmailVerified: false,
            createdAt: expect.anything(),
            updatedAt: expect.anything(),
          });
          expect(resData.password).not.toBe(userOne.password);
        });

        test('Should return 200 if request query is ok and role is admin', async () => {
          const arrayOfValidOrderBy = ['name:asc', 'name:desc', 'role:asc', 'role:desc'];
          // Get the random index
          const randomIndex = Math.floor(Math.random() * arrayOfValidOrderBy.length);
          const res = await request(app).get('/v1/users').set('Authorization', `Bearer ${adminAccessToken}`).query({
            page: 0,
            size: 10,
            name: userOne.name,
            role: userOne.role,
            orderBy: arrayOfValidOrderBy[randomIndex],
          });
          const resData = res.body.data;

          expect(resData).toEqual([
            {
              id: expect.anything(),
              name: userOne.name,
              email: userOne.email,
              password: expect.anything(),
              role: 'user',
              isEmailVerified: false,
              createdAt: expect.anything(),
              updatedAt: expect.anything(),
            },
          ]);
          expect(resData.password).not.toBe(userOne.password);
        });

        test('Should return 404 not found if the params userId is not found', async () => {
          await request(app)
            // Set dummy UUID
            .get('/v1/users/52b516e3-5be5-4166-a4fb-5c682b4213dc')
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .expect(httpStatus.NOT_FOUND);
        });

        test('Should return 400 if params is not a valid UUID', async () => {
          const res = await request(app)
            // Set invalid UUID
            .get('/v1/users/invalidUUID')
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .expect(httpStatus.BAD_REQUEST);
        });

        test('Should return 400 error if query is not valid', async () => {
          await request(app)
            .get('/v1/users')
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .query({
              notValidQuery: userOne.name,
            })
            .expect(httpStatus.BAD_REQUEST);
        });

        test('Should return 400 error if query data is not a valid data types', async () => {
          await request(app)
            .get('/v1/users')
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .query({
              page: 'notValidDataTypes',
              size: 'mustBeANumber',
            })
            .expect(httpStatus.BAD_REQUEST);
        });
      });
    });
  });
});
