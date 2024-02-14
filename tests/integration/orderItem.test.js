const request = require("supertest");
const httpStatus = require("http-status");
const faker = require("faker");
const { userOne, userTwo, userThree, admin, insertUsers } = require("../fixtures/user.fixture");
const { orderOne, orderTwo, orderThree, insertOrders } = require("../fixtures/order.fixture");
const { productOne, productTwo, productThree, insertProducts } = require("../fixtures/product.fixture");
const { orderItemOne, orderItemTwo, orderItemThree, insertOrderItems } = require("../fixtures/orderItem.fixture");
const { adminAccessToken } = require("../fixtures/token.fixture");
const app = require("../../src/app");
const prisma = require("../../prisma");
const { insertCategories, categoryOne, categoryTwo, categoryThree } = require("../fixtures/category.fixture");

describe("OrderItem Routes", () => {
  describe("POST /v1/order-item", () => {
    let newOrderItem;
    beforeEach(async () => {
      await insertUsers([admin, userOne, userTwo]);
      await insertOrders([orderOne]);
      await insertCategories([categoryOne, categoryTwo]);
      await insertProducts([productOne]);
      newOrderItem = {
        orderId: orderOne.id,
        productId: productOne.id,
        quantity: faker.datatype.number({ min: 1, max: 20 }),
      };
    });
    it("should return 201 and successfully create orderItem if request data is ok", async () => {
      const res = await request(app)
        .post("/v1/order-item")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newOrderItem)
        .expect(httpStatus.CREATED);
      expect(res.body).toEqual({
        status: httpStatus.CREATED,
        message: expect.any(String),
        data: expect.objectContaining({
          id: expect.anything(),
          orderId: newOrderItem.orderId,
          productId: newOrderItem.productId,
          quantity: newOrderItem.quantity,
          unitPrice: newOrderItem.quantity * productOne.price,
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
        }),
      });
      const orderItemDb = await prisma.orderItem.findUnique({
        where: {
          id: res.body.data.id,
        },
      });
      expect(orderItemDb).toBeDefined();
      expect(orderItemDb).toMatchObject({
        id: res.body.data.id,
        orderId: newOrderItem.orderId,
        productId: newOrderItem.productId,
        quantity: newOrderItem.quantity,
        unitPrice: newOrderItem.quantity * productOne.price,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });
      // to cek is quantityInStock in product updated
      const productDb = await prisma.product.findUnique({
        where: {
          id: res.body.data.productId,
        },
      });
      expect(productDb).toBeDefined();
      const { quantityInStock } = productDb;
      const expectedQuantityInStock = productOne.quantityInStock - newOrderItem.quantity;
      expect(quantityInStock).toEqual(expectedQuantityInStock);
      // to cek is totalPrice in order updated
      const orderDb = await prisma.order.findUnique({
        where: {
          id: res.body.data.orderId,
        },
      });
      expect(orderDb).toBeDefined();
      const { totalPrice } = orderDb;
      const expectedTotalPrice = orderOne.totalPrice + res.body.data.unitPrice;
      expect(totalPrice).toEqual(expectedTotalPrice);
    });
    it("should return 400 error if orderId or productId is invalid UUID", async () => {
      newOrderItem.orderId = "invalidUUID";
      newOrderItem.productId = "invalidUUID";
      await request(app)
        .post("/v1/order-item")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newOrderItem)
        .expect(httpStatus.BAD_REQUEST);
    });
    it("should return 404 if orderId or productId not found", async () => {
      newOrderItem.orderId = orderTwo.id;
      newOrderItem.productId = productTwo.id;
      await request(app)
        .post("/v1/order-item")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newOrderItem)
        .expect(httpStatus.NOT_FOUND);
    });
    it("should return 400 error if quantity less than 1", async () => {
      newOrderItem.quantity = -1;
      await request(app)
        .post("/v1/order-item")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newOrderItem)
        .expect(httpStatus.BAD_REQUEST);
    });
    it("should return a 400 error if the request body has missing or extra properties", async () => {
      // missing properties
      delete newOrderItem.orderId;
      await request(app)
        .post("/v1/order-item")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newOrderItem)
        .expect(httpStatus.BAD_REQUEST);
      // extra properties
      newOrderItem.message = "message";
      await request(app)
        .post("/v1/order-item")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newOrderItem)
        .expect(httpStatus.BAD_REQUEST);
    });
  });
  describe("GET /v1/order-item", () => {
    beforeEach(async () => {
      await insertUsers([admin, userOne, userTwo, userThree]);
      await insertOrders([orderOne, orderTwo, orderThree]);
      await insertCategories([categoryOne, categoryTwo, categoryThree]);
      await insertProducts([productOne, productTwo, productThree]);
      await insertOrderItems([orderItemOne, orderItemTwo, orderItemThree]);
    });
    it("should return 200 and successfully get all order if request is ok", async () => {
      const page = 1;
      const size = 2;
      const res = await request(app)
        .get("/v1/order-item")
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
      await request(app)
        .get("/v1/order-item")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });
    it("should return 400 error if query page or query size less than 1", async () => {
      const page = 0;
      const size = 0;
      await request(app)
        .get("/v1/order-item")
        .query({ page, size })
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });
  });
  describe("GET /v1/order-item/:orderItemId", () => {
    beforeEach(async () => {
      await insertUsers([admin, userOne]);
      await insertOrders([orderOne]);
      await insertCategories([categoryOne]);
      await insertProducts([productOne]);
      await insertOrderItems([orderItemOne]);
    });
    it("should return 200 and successfully get orderItem by id if request is ok", async () => {
      const res = await request(app)
        .get(`/v1/order-item/${orderItemOne.id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.OK);
      expect(res.body).toEqual({
        status: httpStatus.OK,
        message: expect.any(String),
        data: expect.objectContaining({
          id: orderItemOne.id,
          orderId: orderItemOne.orderId,
          productId: orderItemOne.productId,
          quantity: orderItemOne.quantity,
          unitPrice: orderItemOne.unitPrice,
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
        }),
      });
    });
    it("should return 400 error if orderItemId is invalid UUID", async () => {
      await request(app)
        .get(`/v1/order-item/invalidOrderItemId`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });
    it("should return 404 error if orderItemId is not found", async () => {
      const orderItemTwoId = orderItemTwo.id;
      await request(app)
        .get(`/v1/order-item/${orderItemTwoId}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe("PUT /v1/order-item/:orderItemId", () => {
    let updatedOrderItem;
    let oldProductId;
    let oldQuantity;
    let oldQuantityInStock;
    let oldTotalPrice;
    beforeEach(async () => {
      await insertUsers([admin, userOne, userTwo]);
      await insertCategories([categoryOne, categoryTwo]);
      await insertProducts([productOne, productTwo]);
      await insertOrders([orderOne]);
      await insertOrderItems([orderItemOne]);

      oldProductId = orderItemOne.productId;
      oldQuantity = orderItemOne.quantity;
      oldQuantityInStock = productOne.quantityInStock - orderItemOne.quantity;
      oldTotalPrice = orderOne.totalPrice + orderItemOne.unitPrice;

      updatedOrderItem = {
        productId: productTwo.id,
        quantity: 25,
      };
    });

    it("should return 200 and successfully update orderItem if request is ok", async () => {
      const res = await request(app)
        .put(`/v1/order-item/${orderItemOne.id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(updatedOrderItem)
        .expect(httpStatus.OK);
      expect(res.body).toEqual({
        status: httpStatus.OK,
        message: expect.any(String),
        data: expect.objectContaining({
          id: orderItemOne.id,
          orderId: orderItemOne.orderId,
          productId: updatedOrderItem.productId,
          quantity: updatedOrderItem.quantity,
          unitPrice: productTwo.price * updatedOrderItem.quantity,
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
        }),
      });
      const orderItemDb = await prisma.orderItem.findUnique({
        where: {
          id: orderItemOne.id,
        },
      });
      expect(orderItemDb).toBeDefined();
      expect(orderItemDb).toMatchObject({
        id: orderItemOne.id,
        orderId: orderItemOne.orderId,
        productId: updatedOrderItem.productId,
        quantity: updatedOrderItem.quantity,
        unitPrice: productTwo.price * updatedOrderItem.quantity,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });

      //  to cek old product restored
      const oldProduct = await prisma.product.findUnique({
        where: {
          id: oldProductId,
        },
      });
      expect(oldProduct).toBeDefined();
      const restoreQuantityInStock = oldQuantityInStock + oldQuantity;
      expect(oldProduct.quantityInStock).toEqual(restoreQuantityInStock);

      // to Cek newProduct Updated
      const newProduct = await prisma.product.findUnique({
        where: {
          id: updatedOrderItem.productId,
        },
      });
      expect(newProduct).toBeDefined();
      const newQuantityInStock = productTwo.quantityInStock - updatedOrderItem.quantity;
      expect(newProduct.quantityInStock).toEqual(newQuantityInStock);

      // to cek Order updated
      const orderDb = await prisma.order.findUnique({
        where: {
          id: orderItemOne.orderId,
        },
      });
      expect(orderDb).toBeDefined();
      const oldTotalPriceValue = orderOne.totalPrice + oldTotalPrice;
      const newUnitPrice = productTwo.price * updatedOrderItem.quantity;
      const expectedNewTotalPrice = orderOne.totalPrice + newUnitPrice;
      expect(orderDb.totalPrice).not.toEqual(oldTotalPriceValue);
      expect(orderDb.totalPrice).toEqual(expectedNewTotalPrice);
    });

    it("should return 400 error if update body is empty", async () => {
      await request(app)
        .put(`/v1/order-item/${orderOne.id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send({})
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 error if orderItemId is invalid UUID", async () => {
      await request(app)
        .put(`/v1/order-item/invalidOrderItemId`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(updatedOrderItem)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 404 error if orderItemId is not found", async () => {
      await request(app)
        .put(`/v1/order-item/${orderItemTwo.id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(updatedOrderItem)
        .expect(httpStatus.NOT_FOUND);
    });

    it("should return 400 error if productId is invalid UUID", async () => {
      updatedOrderItem.productId = "invalidProductId";

      await request(app)
        .put(`/v1/order-item/${orderItemOne.id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(updatedOrderItem)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 404 error if productId is not found", async () => {
      updatedOrderItem.productId = productThree.id;

      await request(app)
        .put(`/v1/order-item/${orderItemOne.id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(updatedOrderItem)
        .expect(httpStatus.NOT_FOUND);
    });

    it("should return 400 error if quantity is less than 1", async () => {
      updatedOrderItem.quantity = 0;

      await request(app)
        .put(`/v1/order-item/${orderItemOne.id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(updatedOrderItem)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe("DELETE /v1/order-item/:orderItemId", () => {
    beforeEach(async () => {
      await insertUsers([admin, userOne]);
      await insertCategories([categoryOne]);
      await insertProducts([productOne]);
      await insertOrders([orderOne]);
      await insertOrderItems([orderItemOne]);
    });

    it("should return 200 and successfully delete orderItem if request is ok", async () => {
      const res = await request(app)
        .delete(`/v1/order-item/${orderItemOne.id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        status: httpStatus.OK,
        message: expect.any(String),
        data: null,
      });

      const orderItemDb = await prisma.orderItem.findUnique({
        where: {
          id: orderItemOne.id,
        },
      });

      expect(orderItemDb).toBeNull();
    });

    it("should return 400 error if orderItemId is invalid UUID", async () => {
      await request(app)
        .delete(`/v1/order-item/invalidOrderItemId`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 404 error if orderItemId is not found", async () => {
      await request(app)
        .delete(`/v1/order-item/${orderItemTwo.id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .expect(httpStatus.NOT_FOUND);
    });
  });
});
