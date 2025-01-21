const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");

router.route("/").get(categoryController.getCategories).post(categoryController.createCategory);

router
  .route("/:id")
  .get(categoryController.getCategory)
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
