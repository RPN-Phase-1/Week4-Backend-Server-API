const request = require("supertest");
const httpStatus = require("http-status");
const faker = require("faker");
const { productOne, productTwo, productThree, insertProducts } = require("../fixtures/product.fixture");
const { userOne, userTwo, userThree, insertUsers } = require("../fixtures/user.fixture");
const { categoryOne, categoryTwo, insertCategories } = require("../fixtures/category.fixture");
const { userOneAccessToken } = require("../fixtures/token.fixture");
const app = require("../../src/app");
const prisma = require("../../prisma");

describe("Product Routes", () => {
  describe("POST /v1/product", () => {
    let newProduct;
    beforeEach(async () => {
      await insertUsers([userOne]);

      await insertUsers([userTwo]);
      await insertCategories([categoryOne]);

      newProduct = {
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: 25.0,
        quantityInStock: 100,
        userId: userTwo.id,
        categoryId: categoryOne.id,
      };
    });

    it("should return 201 and successfully create product if request is ok", async () => {
      const res = await request(app)
        .post("/v1/product")
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send(newProduct)
        .expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        status: httpStatus.CREATED,
        message: expect.any(String),
        data: expect.objectContaining({
          id: expect.anything(),
          name: newProduct.name,
          description: newProduct.description,
          price: newProduct.price,
          quantityInStock: newProduct.quantityInStock,
          userId: newProduct.userId,
          categoryId: newProduct.categoryId,
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
        }),
      });

      const productId = res.body.data.id;
      const productDb = await prisma.product.findUnique({
        where: {
          id: productId,
        },
      });

      expect(productDb).toBeDefined();
      expect(productDb).toMatchObject({
        id: productId,
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        quantityInStock: newProduct.quantityInStock,
        userId: newProduct.userId,
        categoryId: newProduct.categoryId,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });
    });

    it("should return a 400 error if the request body has missing or extra properties", async () => {
      // missing properties
      delete newProduct.price;
      delete newProduct.quantityInStock;

      await request(app)
        .post("/v1/product")
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send(newProduct)
        .expect(httpStatus.BAD_REQUEST);

      // extra properties
      newProduct.color = "red";
      newProduct.material = "logam";

      await request(app)
        .post("/v1/product")
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send(newProduct)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 error if price or quantityInStock in less than 0", async () => {
      newProduct.price = -1;
      newProduct.quantityInStock = -1;
      await request(app)
        .post("/v1/product")
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send(newProduct)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 error if userId or categoryId is invalid UUID", async () => {
      newProduct.userId = "invalidUUID";
      newProduct.categoryId = "invalidUUID";

      await request(app)
        .post("/v1/product")
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send(newProduct)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 404 error if userId or categoryId is not found", async () => {
      newProduct.userId = userThree.id;
      newProduct.categoryId = categoryTwo.id;

      await request(app)
        .post("/v1/product")
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send(newProduct)
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe("GET /v1/product", () => {
    beforeEach(async () => {
      await insertUsers([userOne]);
      await insertProducts([productOne, productTwo, productThree]);
    });

    it("should return 200 and successfully get all product if request is ok", async () => {
      const page = 1;
      const size = 3;

      const res = await request(app)
        .get("/v1/product")
        .query({ page, size })
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        status: httpStatus.OK,
        message: expect.any(String),
        data: expect.arrayContaining([]),
      });

      expect(res.body.data.length).toBeLessThanOrEqual(size);
    });

    it("should return 400 error if query page and size is not found", async () => {
      await request(app)
        .get("/v1/product")
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 error if query page less than 1 and query size less than 0", async () => {
      // page 0
      const page = 0;
      await request(app)
        .get("/v1/product")
        .query({ page, size: 2 })
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);

      // size -1
      const size = -1;
      await request(app)
        .get("/v1/product")
        .query({ page: 1, size })
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe("GET /v1/product/:productId", () => {
    beforeEach(async () => {
      await insertUsers([userOne]);
      await insertProducts([productOne]);
    });

    it("should return 200 and successfully get product by id if request is ok", async () => {
      const res = await request(app)
        .get(`/v1/product/${productOne.id}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        status: httpStatus.OK,
        message: expect.any(String),
        data: expect.objectContaining({
          id: expect.anything(),
          name: productOne.name,
          description: productOne.description,
          price: productOne.price,
          quantityInStock: productOne.quantityInStock,
          userId: productOne.userId,
          categoryId: productOne.categoryId,
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
        }),
      });
    });

    it("should return 400 error if productId is invalid UUID", async () => {
      await request(app)
        .get(`/v1/product/invalidProductId`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 404 error if productId is not found", async () => {
      const productTwoId = productTwo.id;

      await request(app)
        .get(`/v1/product/${productTwoId}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe("PUT /v1/product/:productId", () => {
    let updatedProduct;
    beforeEach(async () => {
      await insertUsers([userOne]);
      await insertProducts([productOne]);

      updatedProduct = {
        name: "new product name",
        description: "new product description",
        price: 30.0,
        quantityInStock: 100,
        userId: userOne.id,
        categoryId: categoryOne.id,
      };
    });

    it("should return 200 and successfully update product if request is ok", async () => {
      const res = await request(app)
        .put(`/v1/product/${productOne.id}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send(updatedProduct)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        status: httpStatus.OK,
        message: expect.any(String),
        data: expect.objectContaining({
          id: expect.anything(),
          name: updatedProduct.name,
          description: updatedProduct.description,
          price: updatedProduct.price,
          quantityInStock: updatedProduct.quantityInStock,
          userId: updatedProduct.userId,
          categoryId: updatedProduct.categoryId,
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
        }),
      });

      const productDb = await prisma.product.findUnique({
        where: {
          id: productOne.id,
        },
      });

      expect(productDb).toBeDefined();
      expect(productDb).toMatchObject({
        id: productOne.id,
        name: updatedProduct.name,
        description: updatedProduct.description,
        price: updatedProduct.price,
        quantityInStock: updatedProduct.quantityInStock,
        userId: updatedProduct.userId,
        categoryId: updatedProduct.categoryId,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });
    });

    it("should return 400 error if update body is empty", async () => {
      await request(app)
        .put(`/v1/product/${productOne.id}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send({})
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 error if productId is invalid UUID", async () => {
      await request(app)
        .put(`/v1/product/invalidProductId`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send(updatedProduct)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 404 error if productId is not found", async () => {
      await request(app)
        .put(`/v1/product/${productTwo.id}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send(updatedProduct)
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe("DELETE /v1/product/:productId", () => {
    beforeEach(async () => {
      await insertUsers([userOne]);
      await insertProducts([productOne]);
    });

    it("should return 200 and successfully delete product if request is ok", async () => {
      const res = await request(app)
        .delete(`/v1/product/${productOne.id}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        status: httpStatus.OK,
        message: expect.any(String),
        data: null,
      });

      const productDb = await prisma.user.findUnique({
        where: {
          id: productOne.id,
        },
      });

      expect(productDb).toBeNull();
    });

    it("should return 400 error if productId is invalid UUID", async () => {
      await request(app)
        .delete(`/v1/product/invalidProductId`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 404 error if productId is not found", async () => {
      await request(app)
        .delete(`/v1/product/${productTwo.id}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.NOT_FOUND);
    });
  });
});
