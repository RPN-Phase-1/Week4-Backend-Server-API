const request = require("supertest");
const httpStatus = require("http-status");
const httpMocks = require("node-mocks-http");
const moment = require("moment");
const { userOne, insertUsers } = require("../fixtures/user.fixture");
const { userOneAccessToken } = require("../fixtures/token.fixture");
const app = require("../../src/app");
const prisma = require("../../prisma");
const { auth } = require("../../src/middlewares/auth");
const ApiError = require("../../src/utils/ApiError");
const { tokenService } = require("../../src/services");
const tokenTypes = require("../../src/config/tokens");
const config = require("../../src/config/config");

describe("Auth Routes", () => {
  describe("POST /v1/auth/register", () => {
    let newUser;
    beforeEach(async () => {
      newUser = {
        name: "newUser",
        email: "newUser@gmail.com",
        password: "newUser12345",
      };
    });
    it("should return 201 and successfully register user if request data is ok", async () => {
      const res = await request(app).post("/v1/auth/register").send(newUser).expect(httpStatus.CREATED);

      const userData = res.body.userCreated;

      expect(userData).toEqual({
        id: expect.anything(),
        name: newUser.name,
        email: newUser.email,
        password: expect.anything(),
        role: "user",
        isEmailVerified: false,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });

      const dbUser = await prisma.user.findUnique({
        where: {
          id: userData.id,
        },
      });

      expect(dbUser).toBeDefined();
      expect(dbUser.password).not.toBe(newUser.password);

      expect(dbUser).toMatchObject({
        id: expect.anything(),
        name: newUser.name,
        email: newUser.email,
        password: expect.anything(),
        role: "user",
        isEmailVerified: false,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });

      expect(res.body.tokens).toEqual({
        access: { token: expect.anything(), expires: expect.anything() },
        refresh: { token: expect.anything(), expires: expect.anything() },
      });
    });

    it("should return 400 error if email is invalid", async () => {
      newUser.email = "invalidEmail";

      await request(app).post("/v1/auth/register").send(newUser).expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 error if email is already taken", async () => {
      await insertUsers([userOne]);
      newUser.email = userOne.email;

      await request(app).post("/v1/auth/register").send(newUser).expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 error if password length is less than 8 characters", async () => {
      newUser.password = "abcd1";
      await request(app).post("/v1/auth/register").send(newUser).expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 error if password not contain both letters and numbers", async () => {
      newUser.password = "testingaja";
      await request(app).post("/v1/auth/register").send(newUser).expect(httpStatus.BAD_REQUEST);

      newUser.password = "1111111111";
      await request(app).post("/v1/auth/register").send(newUser).expect(httpStatus.BAD_REQUEST);
    });
  });

  describe("POST /v1/auth/login", () => {
    let loginCredencial;

    beforeEach(async () => {
      await insertUsers([userOne]);
      loginCredencial = {
        email: userOne.email,
        password: userOne.password,
      };
    });
    it("should return 200 and login user if email and password match", async () => {
      const res = await request(app).post("/v1/auth/login").send(loginCredencial).expect(httpStatus.OK);

      const userData = res.body.userLogin;

      expect(userData).toEqual({
        id: expect.anything(),
        name: userOne.name,
        email: userOne.email,
        password: expect.anything(),
        role: userOne.role,
        isEmailVerified: userOne.isEmailVerified,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });

      expect(res.body.tokens).toEqual({
        access: { token: expect.anything(), expires: expect.anything() },
        refresh: { token: expect.anything(), expires: expect.anything() },
      });
    });

    it("should return 400 if email is not register", async () => {
      loginCredencial.email = "wrongEmail@gmail.com";

      await request(app).post("/v1/auth/login").send(loginCredencial).expect(httpStatus.BAD_REQUEST);
    });

    it("should return 401 if password is wrong", async () => {
      loginCredencial.password = "wrongpassword1";

      await request(app).post("/v1/auth/login").send(loginCredencial).expect(httpStatus.UNAUTHORIZED);
    });
  });
});

describe("Auth Middleware", () => {
  it("should call next with no errors if access token is valid", async () => {
    await insertUsers([userOne]);
    const req = httpMocks.createRequest({ headers: { Authorization: `Bearer ${userOneAccessToken}` } });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await auth()(req, res, next);

    expect(next).toHaveBeenCalledWith();
    expect(req.user.id).toEqual(userOne.id);
  });

  it("should call next with unauthorized error if token is not found in header", async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await auth()(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(ApiError));
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: httpStatus.UNAUTHORIZED, message: "Please Authenticate" })
    );
  });

  it("should call next with unauthorized error if token is not a valid jwt token", async () => {
    const req = httpMocks.createRequest({ headers: { Authorization: `Bearer randomToken` } });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await auth()(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(ApiError));
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: httpStatus.UNAUTHORIZED, message: "Please Authenticate" })
    );
  });

  it("should call next with unauthrorized error if the token is not an access token", async () => {
    await insertUsers([userOne]);
    const expires = moment().add(config.jwt.accessExpirationMinutes, "minutes");
    const refreshToken = await tokenService.generateToken(userOne.id, expires, tokenTypes.REFRESH);
    const req = httpMocks.createRequest({ headers: { Authorization: `Bearer ${refreshToken}` } });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await auth()(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(ApiError));
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: httpStatus.UNAUTHORIZED, message: "Please Authenticate" })
    );
  });

  it("should call next with unauthorized error if access token is expires", async () => {
    await insertUsers([userOne]);
    const expires = moment().subtract(1, "minutes");
    const accessToken = await tokenService.generateToken(userOne.id, expires, tokenTypes.ACCESS);
    const req = httpMocks.createRequest({ headers: { Authorization: `Bearer ${accessToken}` } });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await auth()(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(ApiError));
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: httpStatus.UNAUTHORIZED, message: "Please Authenticate" })
    );
  });

  it("should call next with unauthorized error if user is not found", async () => {
    const req = httpMocks.createRequest({ headers: { Authorization: `Bearer ${userOneAccessToken}` } });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await auth()(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(ApiError));
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: httpStatus.UNAUTHORIZED, message: "Please Authenticate" })
    );
  });
});
