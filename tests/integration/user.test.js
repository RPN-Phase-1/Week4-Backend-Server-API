const request = require("supertest");
const httpStatus = require("http-status");
const { userOne, insertUsers, admin, userTwo } = require("../fixtures/user.fixture");
const { adminAccessToken } = require("../fixtures/token.fixture");
const app = require("../../src/app");
const prisma = require("../../prisma");
const { insertCategories, categoryOne } = require("../fixtures/category.fixture");
const { insertProducts, productOne } = require("../fixtures/product.fixture");
const { insertOrders, orderOne } = require("../fixtures/order.fixture");

describe("User Routes", () => {
  describe("POST /v1/user", () => {
    let newUser;
    beforeEach(async () => {
      await insertUsers([admin]);
      newUser = {
        name: "new user name",
        email: "newUser@gmail.com",
        password: "newUser12345",
      };
    });

    it("should return 201 and successfully create user if request is ok", async () => {
      const res = await request(app)
        .post("/v1/user")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newUser)
        .expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        status: httpStatus.CREATED,
        message: expect.any(String),
        data: expect.objectContaining({
          id: expect.anything(),
          name: newUser.name,
          email: newUser.email,
          password: expect.anything(),
          role: "user",
          isEmailVerified: false,
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
        }),
      });

      const userId = res.body.data.id;

      const userDb = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      expect(userDb).toBeDefined();
      expect(userDb.password).not.toBe(newUser.password);
      expect(userDb).toMatchObject({
        id: expect.anything(),
        name: newUser.name,
        email: newUser.email,
        password: expect.anything(),
        role: "user",
        isEmailVerified: false,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });
    });

    it("should return a 400 error if the request body has missing or extra properties", async () => {
      // missing properties
      delete newUser.email;
      await request(app)
        .post("/v1/user")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);

      // extra properties
      newUser.age = 9;
      newUser.address = "indonesia";
      await request(app)
        .post("/v1/user")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 error if email is invalid", async () => {
      newUser.email = "invalidEmail";

      await request(app)
        .post("/v1/user")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 error if email is already taken", async () => {
      await insertUsers([userOne]);
      newUser.email = userOne.email;

      await request(app)
        .post("/v1/user")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 error if password length is less than 8 characters", async () => {
      newUser.password = "abcd1";
      await request(app)
        .post("/v1/user")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 error if password not contain both letters and numbers", async () => {
      newUser.password = "testingaja";
      await request(app)
        .post("/v1/user")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);

      newUser.password = "1111111111";
      await request(app)
        .post("/v1/user")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe("GET /v1/user", () => {
    beforeEach(async () => {
      await insertUsers([admin, userOne, userTwo]);
    });

    it("should return 200 and successfully get all users if request is ok", async () => {
      const page = 1;
      const size = 3;

      const res = await request(app)
        .get("/v1/user")
        .query({ page, size })
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        status: httpStatus.OK,
        message: expect.any(String),
        data: expect.arrayContaining([]),
      });

      expect(res.body.data.length).not.toBeLessThan(1);
      expect(res.body.data.length).toBeLessThanOrEqual(size);
    });

    it("should return 400 error if query page and size is not found", async () => {
      await request(app).get("/v1/user").set("Authorization", `Bearer ${adminAccessToken}`).expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 error if query page less than 1 and query size less than 0", async () => {
      const page = 0;
      const size = 0;

      await request(app)
        .get("/v1/category")
        .query({ page, size })
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe("GET /v1/user/:userId", () => {
    beforeEach(async () => {
      await insertUsers([admin, userOne]);
    });

    it("should return 200 and successfully get user by id if request is ok", async () => {
      const res = await request(app)
        .get(`/v1/user/${userOne.id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        status: httpStatus.OK,
        message: expect.any(String),
        data: expect.objectContaining({
          id: userOne.id,
          name: userOne.name,
          email: userOne.email,
          password: expect.anything(),
          role: "user",
          isEmailVerified: userOne.isEmailVerified,
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
        }),
      });
    });

    it("should return 400 error if userId is invalid UUID", async () => {
      await request(app)
        .get(`/v1/user/invalidUserId`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 404 error if userId is not found", async () => {
      const userTwoId = userTwo.id;

      await request(app)
        .get(`/v1/user/${userTwoId}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe("PUT /v1/user/:userId", () => {
    let updatedUser;
    beforeEach(async () => {
      await insertUsers([admin, userOne]);
      updatedUser = {
        name: "updated user",
        email: "updateEmail@gmail.com",
        password: "update12345",
      };
    });

    it("should return 200 and successfully update user if request is ok", async () => {
      const res = await request(app)
        .put(`/v1/user/${userOne.id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(updatedUser)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        status: httpStatus.OK,
        message: expect.any(String),
        data: expect.objectContaining({
          id: userOne.id,
          name: updatedUser.name,
          email: updatedUser.email,
          password: expect.anything(),
          role: "user",
          isEmailVerified: userOne.isEmailVerified,
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
        }),
      });

      const userDb = await prisma.user.findUnique({
        where: {
          id: userOne.id,
        },
      });

      expect(userDb).toBeDefined();
      expect(userDb).toMatchObject({
        id: userOne.id,
        name: updatedUser.name,
        email: updatedUser.email,
        password: expect.anything(),
        role: "user",
        isEmailVerified: userOne.isEmailVerified,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });
    });

    it("should return 400 error if update body is empty", async () => {
      await request(app)
        .put(`/v1/user/${userOne.id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send({})
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 error if userId is invalid UUID", async () => {
      await request(app)
        .put(`/v1/user/invalidUserId`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(updatedUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 404 error if userId is not found", async () => {
      await request(app)
        .put(`/v1/user/${userTwo.id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(updatedUser)
        .expect(httpStatus.NOT_FOUND);
    });

    it("should return 400 error if email is invalid", async () => {
      updatedUser.email = "invalidEmail";

      await request(app)
        .post("/v1/user")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(updatedUser)
        .expect(httpStatus.BAD_REQUEST);
    });
    it("should return 400 error if password length is less than 8 characters", async () => {
      updatedUser.password = "abcd1";
      await request(app)
        .post("/v1/user")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(updatedUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 error if password not contain both letters and numbers", async () => {
      updatedUser.password = "testingaja";
      await request(app)
        .post("/v1/user")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(updatedUser)
        .expect(httpStatus.BAD_REQUEST);

      updatedUser.password = "1111111111";
      await request(app)
        .post("/v1/user")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(updatedUser)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe("DELETE /v1/user/:userId", () => {
    beforeEach(async () => {
      await insertUsers([admin, userOne]);
    });

    it("should return 200 and successfully delete user if request is ok", async () => {
      const res = await request(app)
        .delete(`/v1/user/${userOne.id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        status: httpStatus.OK,
        message: expect.any(String),
        data: null,
      });

      const userDb = await prisma.user.findUnique({
        where: {
          id: userOne.id,
        },
      });

      expect(userDb).toBeNull();
    });

    it("should return 400 error if categoryId is invalid UUID", async () => {
      await request(app)
        .delete(`/v1/user/invalidUserId`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 404 error if userId is not found", async () => {
      await request(app)
        .delete(`/v1/user/${userTwo.id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe("GET /v1/user/:userId/products", () => {
    beforeEach(async () => {
      await insertUsers([admin, userOne]);
      await insertCategories([categoryOne]);
      await insertProducts([productOne]);
    });

    it("should return 200 and successfuly get products by userId if request is ok", async () => {
      const res = await request(app)
        .get(`/v1/user/${userOne.id}/products`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        status: httpStatus.OK,
        message: expect.any(String),
        data: expect.arrayContaining([]),
      });
    });

    it("should return 400 error if userId is invalid UUID", async () => {
      await request(app)
        .get(`/v1/user/invalidUserId/products`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 404 error if user is not found", async () => {
      await request(app)
        .get(`/v1/user/${userTwo.id}/products`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe("GET /v1/user/:userId/orders", () => {
    beforeEach(async () => {
      await insertUsers([admin, userOne]);
      await insertOrders([orderOne]);
    });

    it("should return 200 and successfuly get products by userId if request is ok", async () => {
      const res = await request(app)
        .get(`/v1/user/${userOne.id}/orders`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        status: httpStatus.OK,
        message: expect.any(String),
        data: expect.arrayContaining([]),
      });
    });

    it("should return 400 error if userId is invalid UUID", async () => {
      await request(app)
        .get(`/v1/user/invalidUserId/orders`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 404 error if user is not found", async () => {
      await request(app)
        .get(`/v1/user/${userTwo.id}/orders`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.NOT_FOUND);
    });
  });
});
