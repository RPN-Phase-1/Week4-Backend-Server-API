const request = require("supertest");
const httpStatus = require("http-status");
const faker = require("faker");
const { orderOne, orderTwo, orderThree, insertOrders } = require("../fixtures/order.fixture");
const { userOne, userThree, admin, insertUsers, userTwo } = require("../fixtures/user.fixture");
const { adminAccessToken } = require("../fixtures/token.fixture");
const app = require("../../src/app");
const prisma = require("../../prisma");
const { insertCategories, categoryOne } = require("../fixtures/category.fixture");
const { insertProducts, productOne } = require("../fixtures/product.fixture");
const { insertOrderItems, orderItemOne } = require("../fixtures/orderItem.fixture");

describe("Order Routes", () => {
  describe("POST /v1/order", () => {
    let newOrder;
    beforeEach(async () => {
      await insertUsers([admin, userOne]);

      newOrder = {
        customerName: faker.name.findName(),
        customerEmail: faker.internet.email().toLowerCase(),
        userId: userOne.id,
      };
    });

    it("should return 201 and successfully create order if request is ok", async () => {
      const res = await request(app)
        .post("/v1/order")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newOrder)
        .expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        status: httpStatus.CREATED,
        message: expect.any(String),
        data: expect.objectContaining({
          id: expect.anything(),
          customerName: newOrder.customerName,
          customerEmail: newOrder.customerEmail,
          totalPrice: 0,
          userId: newOrder.userId,
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
        }),
      });

      const orderId = res.body.data.id;
      const orderDb = await prisma.order.findUnique({
        where: {
          id: orderId,
        },
      });

      expect(orderDb).toBeDefined();
      expect(orderDb).toMatchObject({
        id: orderId,
        customerName: newOrder.customerName,
        customerEmail: newOrder.customerEmail,
        totalPrice: 0,
        userId: newOrder.userId,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });
    });

    it("should return a 400 error if the request body has missing or extra properties", async () => {
      // missing properties
      delete newOrder.userId;
      delete newOrder.customerEmail;
      await request(app)
        .post("/v1/order")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newOrder)
        .expect(httpStatus.BAD_REQUEST);

      // extra properties
      newOrder.message = "message";
      await request(app)
        .post("/v1/order")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newOrder)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 error if customerEmail is invalid email", async () => {
      newOrder.customerEmail = "invalidEmail";

      await request(app)
        .post("/v1/order")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newOrder)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 error if userId is invalid UUID", async () => {
      newOrder.userId = "invalidUUID";

      await request(app)
        .post("/v1/order")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newOrder)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 404 error if userId is not found", async () => {
      newOrder.userId = userThree.id;

      await request(app)
        .post("/v1/order")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newOrder)
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe("GET /v1/order", () => {
    beforeEach(async () => {
      await insertUsers([admin, userOne, userTwo, userThree]);
      await insertOrders([orderOne, orderTwo, orderThree]);
    });

    it("should return 200 and successfully get all order if request is ok", async () => {
      const page = 1;
      const size = 3;

      const res = await request(app)
        .get("/v1/order")
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
      await request(app).get("/v1/order").set("Authorization", `Bearer ${adminAccessToken}`).expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 error if query page or query size less than 1", async () => {
      const page = 0;
      const size = 0;
      await request(app)
        .get("/v1/order")
        .query({ page, size })
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe("GET /v1/order/:orderId", () => {
    beforeEach(async () => {
      await insertUsers([admin, userOne]);
      await insertOrders([orderOne]);
    });

    it("should return 200 and successfully get order by id if request is ok", async () => {
      const res = await request(app)
        .get(`/v1/order/${orderOne.id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        status: httpStatus.OK,
        message: expect.any(String),
        data: expect.objectContaining({
          id: orderOne.id,
          customerName: orderOne.customerName,
          customerEmail: orderOne.customerEmail,
          totalPrice: 0,
          userId: orderOne.userId,
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
        }),
      });
    });

    it("should return 400 error if orderId is invalid UUID", async () => {
      await request(app)
        .get(`/v1/order/invalidOrderId`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 404 error if orderId is not found", async () => {
      const orderTwoId = orderTwo.id;

      await request(app)
        .get(`/v1/order/${orderTwoId}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe("PUT /v1/order/:orderId", () => {
    let updatedOrder;
    beforeEach(async () => {
      await insertUsers([admin, userOne]);
      await insertOrders([orderOne]);

      updatedOrder = {
        customerName: "updated name",
        customerEmail: "updatedEmail@gmail.com",
        userId: userOne.id,
      };
    });

    it("should return 200 and successfully update order if request is ok", async () => {
      const res = await request(app)
        .put(`/v1/order/${orderOne.id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(updatedOrder)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        status: httpStatus.OK,
        message: expect.any(String),
        data: expect.objectContaining({
          id: orderOne.id,
          date: expect.anything(),
          customerName: updatedOrder.customerName,
          customerEmail: updatedOrder.customerEmail,
          totalPrice: expect.anything(),
          userId: updatedOrder.userId,
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
        }),
      });

      const orderDb = await prisma.order.findUnique({
        where: {
          id: orderOne.id,
        },
      });

      expect(orderDb).toBeDefined();
      expect(orderDb).toMatchObject({
        id: orderOne.id,
        date: expect.anything(),
        customerName: updatedOrder.customerName,
        customerEmail: updatedOrder.customerEmail,
        totalPrice: orderDb.totalPrice,
        userId: updatedOrder.userId,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });
    });

    it("should return 400 error if update body is empty", async () => {
      await request(app)
        .put(`/v1/order/${orderOne.id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send({})
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 error if orderId is invalid UUID", async () => {
      await request(app)
        .put(`/v1/order/invalidOrderId`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(updatedOrder)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 404 error if orderId is not found", async () => {
      await request(app)
        .put(`/v1/order/${orderTwo.id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(updatedOrder)
        .expect(httpStatus.NOT_FOUND);
    });

    it("should return 400 error if customerEmail is invalid email", async () => {
      updatedOrder.customerEmail = "invalidEmail";

      await request(app)
        .put(`/v1/order/${orderOne.id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(updatedOrder)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 error if userId is invalid UUID", async () => {
      updatedOrder.userId = "invalidUUID";

      await request(app)
        .put(`/v1/order/${orderOne.id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(updatedOrder)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 404 error if userId is not found", async () => {
      updatedOrder.userId = userThree.id;

      await request(app)
        .put(`/v1/order/${orderOne.id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(updatedOrder)
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe("DELETE /v1/order/:orderId", () => {
    beforeEach(async () => {
      await insertUsers([admin, userOne]);
      await insertOrders([orderOne]);
    });

    it("should return 200 and successfully delete order if request is ok", async () => {
      const res = await request(app)
        .delete(`/v1/order/${orderOne.id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        status: httpStatus.OK,
        message: expect.any(String),
        data: null,
      });

      const orderDb = await prisma.order.findUnique({
        where: {
          id: orderOne.id,
        },
      });

      expect(orderDb).toBeNull();
    });

    it("should return 400 error if orderId is invalid UUID", async () => {
      await request(app)
        .delete(`/v1/order/invalidOrderId`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 404 error if orderId is not found", async () => {
      await request(app)
        .delete(`/v1/order/${orderTwo.id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe("GET /v1/order/orderItemId/order-items", () => {
    beforeEach(async () => {
      await insertUsers([admin, userOne]);
      await insertOrders([orderOne]);
      await insertCategories([categoryOne]);
      await insertProducts([productOne]);
      await insertOrderItems([orderItemOne]);
    });

    it("should return 200 and successfuly get order item by order if request is ok", async () => {
      const res = await request(app)
        .get(`/v1/order/${orderOne.id}/order-items`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        status: httpStatus.OK,
        message: expect.any(String),
        data: expect.arrayContaining([]),
      });
    });

    it("should return 400 error if orderId is invalid UUID", async () => {
      await request(app)
        .get(`/v1/order/invalidOrderId/order-items`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 404 error if orderId is not found", async () => {
      await request(app)
        .get(`/v1/order/${orderTwo.id}/order-items`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.NOT_FOUND);
    });
  });
});
