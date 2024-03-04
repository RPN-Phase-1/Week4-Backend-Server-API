const express = require("express");
const { auth } = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const categoryController = require("../../controllers/category.controller");
const categoryValidation = require("../../validations/category.validation");

const router = express.Router();

router
  .route("/")
  .get(auth(), validate(categoryValidation.getAllCategories), categoryController.getAllCategories)
  .post(auth(), validate(categoryValidation.createCategory), categoryController.createCategory);

router.get("/products", auth(categoryValidation.getProductByCategory), categoryController.getProductByCategory);

router
  .route("/:categoryId")
  .get(auth(), validate(categoryValidation.getCategoryById), categoryController.getCategoryById)
  .put(auth(), validate(categoryValidation.updateCategory), categoryController.updateCategory)
  .delete(auth(), validate(categoryValidation.deleteCategory), categoryController.deleteCategory);

module.exports = router;
