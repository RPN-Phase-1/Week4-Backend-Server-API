const request = require("supertest");
const httpStatus = require("http-status");
const { insertUsers, userOne } = require("../fixtures/user.fixture");
const { userOneAccessToken } = require("../fixtures/token.fixture");
const app = require("../../src/app");
const prisma = require("../../prisma");
const { categoryOne, insertCategories, categoryTwo, categoryThree } = require("../fixtures/category.fixture");

describe("Category Routes", () => {
  describe("POST /v1/category", () => {
    let newCategory;
    beforeEach(async () => {
      await insertUsers([userOne]);
      newCategory = {
        name: "newCategory",
      };
    });
    it("should return 201 and successfully create category if request is ok", async () => {
      const res = await request(app)
        .post("/v1/category")
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send(newCategory)
        .expect(httpStatus.CREATED);

      const categoryData = res.body.data;

      expect(categoryData).toEqual({
        id: expect.anything(),
        name: newCategory.name,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });

      const categoryDb = await prisma.category.findUnique({
        where: {
          id: categoryData.id,
        },
      });

      expect(categoryDb).toBeDefined();

      expect(categoryDb).toMatchObject({
        id: categoryData.id,
        name: categoryData.name,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });
    });

    it("should return 400 error if category name is already taken", async () => {
      await insertCategories([categoryOne]);

      newCategory.name = categoryOne.name;

      const res = await request(app)
        .post("/v1/category")
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send(newCategory)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.message).toEqual("Category already taken");
    });
  });

  describe("GET /v1/category", () => {
    beforeEach(async () => {
      await insertUsers([userOne]);

      await insertCategories([categoryOne, categoryTwo, categoryThree]);
    });

    it("should return 200 and successfully get all categories if request is ok", async () => {
      const page = 1;
      const size = 3;

      const res = await request(app)
        .get("/v1/category")
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
        .get("/v1/category")
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 error if query page less than 1 and query size less than 0", async () => {
      // page 0
      const page = 0;
      await request(app)
        .get("/v1/category")
        .query({ page, size: 2 })
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);

      // size -1
      const size = -1;
      await request(app)
        .get("/v1/category")
        .query({ page: 1, size })
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe("GET /v1/category/:categoryId", () => {
    beforeEach(async () => {
      await insertUsers([userOne]);
      await insertCategories([categoryOne]);
    });

    it("should return 200 and successfully get category by id if request is ok", async () => {
      const categoryOneId = categoryOne.id;
      const res = await request(app)
        .get(`/v1/category/${categoryOneId}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        status: httpStatus.OK,
        message: expect.any(String),
        data: expect.objectContaining({
          id: categoryOne.id,
          name: categoryOne.name,
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
        }),
      });
    });

    it("should return 400 error if categoryId is not valid UUID", async () => {
      await request(app)
        .get(`/v1/category/wrongCategoryId`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 404 error if categoryId is not found", async () => {
      const categoryTwoId = categoryTwo.id;

      await request(app)
        .get(`/v1/category/${categoryTwoId}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe("PUT /v1/category/:categoryId", () => {
    let newCategory;
    beforeEach(async () => {
      await insertUsers([userOne]);
      await insertCategories([categoryOne]);

      newCategory = {
        name: "newCategoryName",
      };
    });

    it("should return 200 and successfully update category if request is ok", async () => {
      const res = await request(app)
        .put(`/v1/category/${categoryOne.id}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send(newCategory)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        status: httpStatus.OK,
        message: expect.any(String),
        data: expect.objectContaining({
          id: categoryOne.id,
          name: newCategory.name,
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
        }),
      });

      const categoryDb = await prisma.category.findUnique({
        where: {
          id: categoryOne.id,
        },
      });

      expect(categoryDb).toBeDefined();
      expect(categoryDb).toMatchObject({
        id: categoryOne.id,
        name: newCategory.name,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });
    });

    it("should return 400 error if update body is empty", async () => {
      await request(app)
        .put(`/v1/category/${categoryOne.id}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send({})
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 400 error if categoryId is not valid UUID", async () => {
      await request(app)
        .put(`/v1/category/wrongCategoryId`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send(newCategory)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 404 error if categoryId is not found", async () => {
      await request(app)
        .put(`/v1/category/${categoryTwo.id}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send(newCategory)
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe("DELETE /v1/category/:categoryId", () => {
    beforeEach(async () => {
      await insertUsers([userOne]);
      await insertCategories([categoryOne]);
    });

    it("should return 200 and successfully delete category if request is ok", async () => {
      const res = await request(app)
        .delete(`/v1/category/${categoryOne.id}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        status: httpStatus.OK,
        message: expect.any(String),
        data: null,
      });

      const categoryDb = await prisma.category.findUnique({
        where: {
          id: categoryOne.id,
        },
      });

      expect(categoryDb).toBeNull();
    });

    it("should return 400 error if categoryId is not valid UUID", async () => {
      await request(app)
        .delete(`/v1/category/wrongCategoryId`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("should return 404 error if categoryId is not found", async () => {
      await request(app)
        .delete(`/v1/category/${categoryTwo.id}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.NOT_FOUND);
    });
  });
});
