/* eslint-disable no-restricted-syntax */

import { BAD_REQUEST, CREATED, NOT_FOUND, OK, UNAUTHORIZED } from 'http-status';
import { supertest } from '../helpers';
import { createFakeUser, insertUsers, userAdmin, userOne, userTwo } from '../fixtures/user.fixture';
import { adminAccessToken, userOneAccessToken } from '../fixtures/token.fixture';
import prisma from '../../src/lib/database';
import pick from '../../src/lib/utils/Pick';

let agent: Awaited<typeof supertest>;
beforeAll(async () => {
  agent = await supertest;
});

describe('Users Routes', () => {
  describe('GET /v1/users', () => {
    it('should return ok (200) and show the list of users', async () => {
      await insertUsers(userAdmin, userOne, userTwo);
      const userCount = await prisma.user.count();
      const response = await agent
        .get('/v1/users')
        .auth(adminAccessToken, {
          type: 'bearer',
        })
        .query({
          pageIndex: 1,
          pageSize: userCount,
        })
        .expect(OK);
      const { data } = response.body;
      expect(data.datas.length).toEqual(userCount);
    });

    it('should return ok (200) and correctly doing paginated', async () => {
      const pageSize = 2;
      await insertUsers(userAdmin, userOne, userTwo);
      const responses = await Promise.all([
        agent
          .get('/v1/users')
          .auth(adminAccessToken, {
            type: 'bearer',
          })
          .query({
            pageIndex: 1,
            pageSize,
          })
          .expect(OK),
        agent
          .get('/v1/users')
          .auth(adminAccessToken, {
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
      await agent.get('/v1/users').expect(UNAUTHORIZED);
    });

    it("should return unauthorized (401) if user role isn't admin", async () => {
      await insertUsers(userOne);
      await agent.get('/v1/users').auth(userOneAccessToken, { type: 'bearer' }).expect(UNAUTHORIZED);
    });

    it('should return bad request (400) if query pageIndex or pageSize is missing', async () => {
      await insertUsers(userAdmin);
      await agent.get('/v1/users').auth(adminAccessToken, { type: 'bearer' }).expect(BAD_REQUEST);
      await agent.get('/v1/users').auth(adminAccessToken, { type: 'bearer' }).query({ pageIndex: 1 }).expect(BAD_REQUEST);
      await agent.get('/v1/users').auth(adminAccessToken, { type: 'bearer' }).query({ pageSize: 1 }).expect(BAD_REQUEST);
    });

    it('should return bad request (400) if pageIndex or pageSize is less than 1', async () => {
      await insertUsers(userAdmin);
      await agent
        .get('/v1/users')
        .auth(adminAccessToken, { type: 'bearer' })
        .query({
          pageIndex: 1,
          pageSize: 0,
        })
        .expect(BAD_REQUEST);
      await agent
        .get('/v1/users')
        .auth(adminAccessToken, { type: 'bearer' })
        .query({
          pageIndex: 0,
          pageSize: 1,
        })
        .expect(BAD_REQUEST);
    });

    it('should return ok (200) and data of the last index if the pageIndex is out of range', async () => {
      await insertUsers(userAdmin, userOne, userTwo);
      const response = await agent
        .get('/v1/users')
        .auth(adminAccessToken, { type: 'bearer' })
        .query({
          pageIndex: 69,
          pageSize: 1,
        })
        .expect(OK);
      expect(response.body.data.index).toEqual(response.body.data.numOfPages);
      expect(response.body.data.datas.length).toBeGreaterThan(0);
    });

    it('should return ok (200) and make thePageSize equal to database size if pageSize is out of range', async () => {
      await insertUsers(userAdmin, userOne, userTwo);
      const response = await agent
        .get('/v1/users')
        .auth(adminAccessToken, { type: 'bearer' })
        .query({
          pageIndex: 1,
          pageSize: 69,
        })
        .expect(OK);
      expect(response.body.data.datas.length).toEqual(3);
      expect(response.body.data.numOfPages).toEqual(1);
    });
  });

  describe('POST /v1/users', () => {
    const newUser = pick(createFakeUser(), ['name', 'email', 'password']);
    it('should return created (201) and succesfully created user', async () => {
      await insertUsers(userAdmin);
      const response = await agent
        .post('/v1/users')
        .auth(adminAccessToken, { type: 'bearer' })
        .send(newUser)
        .expect(CREATED);
      const { data } = response.body;

      expect(data).toEqual({
        id: expect.anything(),
        email: newUser.email,
        name: newUser.name,
        password: expect.anything(),
        role: 'User',
        isEmailVerified: expect.anything(),
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });

      const dbFetch = prisma.user.findFirst({ where: { id: data.id } });
      expect(dbFetch).toBeDefined();
    });

    it("should return bad request (400) if name, email, or password doesn't contain in body", async () => {
      await insertUsers(userAdmin);
      await Promise.all([
        agent.post('/v1/users').auth(adminAccessToken, { type: 'bearer' }).expect(BAD_REQUEST),

        agent
          .post('/v1/users')
          .auth(adminAccessToken, { type: 'bearer' })
          .send(pick(newUser, ['email']))
          .expect(BAD_REQUEST),

        agent
          .post('/v1/users')
          .auth(adminAccessToken, { type: 'bearer' })
          .send(pick(newUser, ['name', 'email']))
          .expect(BAD_REQUEST),
      ]);
    });

    it('should return bad request (400) if email, is already taken', async () => {
      await insertUsers(userAdmin);
      await agent
        .post('/v1/users')
        .auth(adminAccessToken, { type: 'bearer' })
        .send({ ...newUser, email: userAdmin.email })
        .expect(BAD_REQUEST);
    });
  });

  describe('GET /v1/users/:userId', () => {
    it('should return ok (200) and succesfully get user data', async () => {
      await insertUsers(userAdmin, userOne);
      await agent.get(`/v1/users/${userOne.id}`).auth(adminAccessToken, { type: 'bearer' }).expect(OK);
    });
  });

  describe('PUT /v1/users/:userId', () => {
    it('should return ok (200) and succesfully updated user', async () => {
      await insertUsers(userAdmin, userOne);
      await agent
        .put(`/v1/users/${userOne.id}`)
        .auth(adminAccessToken, { type: 'bearer' })
        .send({ name: 'updatedName' })
        .expect(OK);
      const user = await prisma.user.findFirst({ where: { id: userOne.id } });
      expect(user?.name === userOne.name).toBeFalsy();
    });

    it('should return unauthorized (401) if email is already taken', async () => {
      await insertUsers(userAdmin, userOne);
      await agent
        .put(`/v1/users/${userOne.id}`)
        .auth(adminAccessToken, { type: 'bearer' })
        .send({ email: userAdmin.email })
        .expect(UNAUTHORIZED);
    });

    it("should return not found (404) if user isn't in database", async () => {
      await insertUsers(userAdmin);
      await agent
        .put(`/v1/users/${userOne.id}`)
        .auth(adminAccessToken, { type: 'bearer' })
        .send({ name: 'updatedName' })
        .expect(NOT_FOUND);
    });
  });

  describe('DELETE /v1/users/:userId', () => {
    it('should return ok (200) and succesfully deleted user', async () => {
      await insertUsers(userAdmin, userTwo);
      await agent.delete(`/v1/users/${userTwo.id}`).auth(adminAccessToken, { type: 'bearer' }).expect(OK);
    });
  });
});
