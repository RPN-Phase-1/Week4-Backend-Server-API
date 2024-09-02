/* eslint-disable import/no-extraneous-dependencies */
import { BAD_REQUEST, CREATED, OK, UNAUTHORIZED } from 'http-status';
import httpMocks from 'node-mocks-http';
import moment from 'moment';
import { supertest } from '../helpers';
import { User, createFakeUser, insertUsers, userOne } from '../fixtures/user.fixture';
import prisma from '../../src/lib/database';
import AuthenticationMiddleware from '../../src/lib/middlewares/AuthenticationMiddleware';
import { userOneAccessToken } from '../fixtures/token.fixture';
import ApiError from '../../src/lib/utils/ApiError';
import Config from '../../src/config/config';
import TokenService from '../../src/services/generateToken';
import TokenTypes from '../../src/config/tokens';
import pick from '../../src/lib/utils/Pick';

let agent: Awaited<typeof supertest>;
beforeAll(async () => {
  agent = await supertest;
});

describe('Authentication routes', () => {
  describe('POST /v1/auth/register', () => {
    let newUser: Omit<User, 'id' | 'isEmailVerified'>;
    beforeEach(() => {
      newUser = pick(createFakeUser(), ['name', 'email', 'password', 'role']);
    });

    it('should return created (201) and sucessfully register user if request data is ok', async () => {
      const response = await agent.post('/v1/auth/register').send(newUser).expect(CREATED);
      const userData = response.body.data.user;
      expect(userData).toEqual({
        id: expect.anything(),
        email: newUser.email,
        name: newUser.name,
        password: expect.anything(),
        role: newUser.role,
        isEmailVerified: false,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });

      const dbUser = await prisma.user.findUnique({ where: { id: userData.id } });
      expect(dbUser).toBeDefined();
      expect(dbUser?.password).not.toBe(newUser.password);

      expect(dbUser).toMatchObject({
        id: expect.anything(),
        email: newUser.email,
        name: newUser.name,
        password: expect.anything(),
        role: newUser.role,
        isEmailVerified: false,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });

      expect(response.body.data.tokens).toEqual({
        access: { token: expect.anything(), expires: expect.anything() },
        refresh: { token: expect.anything(), expires: expect.anything() },
      });
    });

    it('should return bad request (400) error if email is invalid', async () => {
      newUser.email = 'invalidEmail';
      await agent.post('/v1/auth/register').send(newUser).expect(BAD_REQUEST);
    });

    it('should return bad request (400) error if email is already taken', async () => {
      await insertUsers(userOne);
      newUser.email = userOne.email;
      await agent.post('/v1/auth/register').send(newUser).expect(BAD_REQUEST);
    });

    it('should return bad request (400) error if password length is less than 8 character', async () => {
      newUser.password = 'passwo1';
      await agent.post('/v1/auth/register').send(newUser).expect(BAD_REQUEST);
    });

    it("should return bad request (400) error if password doesn't contain both letters and numbers", async () => {
      newUser.password = '111111111';
      await agent.post('/v1/auth/register').send(newUser).expect(BAD_REQUEST);
    });
  });

  describe('POST /v1/auth/login', () => {
    const loginCredentials = {
      email: userOne.email,
      password: userOne.password,
    };

    it('should return ok (200) and login user if email and password match', async () => {
      await insertUsers(userOne);
      const response = await agent.post('/v1/auth/login').send(loginCredentials).expect(OK);
      const userData = response.body.data.user;
      expect(userData).toEqual({
        id: expect.anything(),
        email: userOne.email,
        name: userOne.name,
        password: expect.anything(),
        role: userOne.role,
        isEmailVerified: userOne.isEmailVerified,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });

      expect(response.body.data.tokens).toEqual({
        access: { token: expect.anything(), expires: expect.anything() },
        refresh: { token: expect.anything(), expires: expect.anything() },
      });
    });

    it('should return unauthorized (401) error if password is wrong', async () => {
      await insertUsers(userOne);
      loginCredentials.password = 'wrongPassword1';
      await agent.post('/v1/auth/login').send(loginCredentials).expect(UNAUTHORIZED);
    });
  });
});

describe('Authentication Middlewares', () => {
  it('should call next with no errors if access token is valid', async () => {
    await insertUsers(userOne);
    const request = httpMocks.createRequest({ headers: { Authorization: `Bearer ${userOneAccessToken}` } });
    const next = jest.fn();

    await AuthenticationMiddleware.auth()(request, httpMocks.createResponse(), next);

    expect(next).toHaveBeenCalledWith();
  });

  it('should call next with unauthorize (401) error if access token is not found in header', async () => {
    await insertUsers(userOne);
    const request = httpMocks.createRequest();
    const next = jest.fn();

    await AuthenticationMiddleware.auth()(request, httpMocks.createResponse(), next);

    expect(next).toHaveBeenCalledWith(expect.any(ApiError));
    expect(next).toHaveBeenCalledWith(expect.objectContaining({ statusCode: UNAUTHORIZED, message: 'Please authenticate' }));
  });

  it('should call next with unauthorize (401) error if access token is not a valid jwt token', async () => {
    await insertUsers(userOne);
    const request = httpMocks.createRequest({ headers: { Authorization: `Bearer pretendImAToken ` } });
    const next = jest.fn();

    await AuthenticationMiddleware.auth()(request, httpMocks.createResponse(), next);

    expect(next).toHaveBeenCalledWith(expect.any(ApiError));
    expect(next).toHaveBeenCalledWith(expect.objectContaining({ statusCode: UNAUTHORIZED, message: 'Please authenticate' }));
  });

  it('should call next with unauthorize (401) error if access token is not an access token', async () => {
    await insertUsers(userOne);
    const expires = moment().add(Config.jwt.accessExpirationMinutes, 'minutes');
    const refreshToken = TokenService.generate(userOne.id, expires, TokenTypes.REFRESH);
    const request = httpMocks.createRequest({ headers: { Authorization: `Bearer ${refreshToken}` } });
    const next = jest.fn();

    await AuthenticationMiddleware.auth()(request, httpMocks.createResponse(), next);

    expect(next).toHaveBeenCalledWith(expect.any(ApiError));
    expect(next).toHaveBeenCalledWith(expect.objectContaining({ statusCode: UNAUTHORIZED, message: 'Please authenticate' }));
  });

  it('should call next with unauthorize (401) error if access token is generated with an invalid secret', async () => {
    await insertUsers(userOne);
    const expires = moment().add(Config.jwt.accessExpirationMinutes, 'minutes');
    const token = TokenService.generate(userOne.id, expires, TokenTypes.ACCESS, 'invalidSecret');
    const request = httpMocks.createRequest({ headers: { Authorization: `Bearer ${token}` } });
    const next = jest.fn();

    await AuthenticationMiddleware.auth()(request, httpMocks.createResponse(), next);

    expect(next).toHaveBeenCalledWith(expect.any(ApiError));
    expect(next).toHaveBeenCalledWith(expect.objectContaining({ statusCode: UNAUTHORIZED, message: 'Please authenticate' }));
  });

  it('should call next with unauthorize (401) error if access token is expired', async () => {
    await insertUsers(userOne);
    const expires = moment().subtract(1, 'minutes');
    const token = TokenService.generate(userOne.id, expires, TokenTypes.ACCESS);
    const request = httpMocks.createRequest({ headers: { Authorization: `Bearer ${token}` } });
    const next = jest.fn();

    await AuthenticationMiddleware.auth()(request, httpMocks.createResponse(), next);

    expect(next).toHaveBeenCalledWith(expect.any(ApiError));
    expect(next).toHaveBeenCalledWith(expect.objectContaining({ statusCode: UNAUTHORIZED, message: 'Please authenticate' }));
  });

  it("should call next with unauthorize (401) error if user isn't found", async () => {
    const request = httpMocks.createRequest({ headers: { Authorization: `Bearer ${userOneAccessToken}` } });
    const next = jest.fn();

    await AuthenticationMiddleware.auth()(request, httpMocks.createResponse(), next);

    expect(next).toHaveBeenCalledWith(expect.any(ApiError));
    expect(next).toHaveBeenCalledWith(expect.objectContaining({ statusCode: UNAUTHORIZED, message: 'Please authenticate' }));
  });
});
