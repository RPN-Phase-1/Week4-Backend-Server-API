const express = require("express");
const { auth } = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const productValidation = require("../../validations/product.validation");
const productController = require("../../controllers/product.controller");

const router = express.Router();

router
  .route("/")
  .get(auth(), validate(productValidation.getAllProducts), productController.getAllProducts)
  .post(auth(), validate(productValidation.createProduct), productController.createProduct);

router
  .route("/:productId")
  .get(auth(), validate(productValidation.getProductById), productController.getProductById)
  .put(auth(), validate(productValidation.updateProduct), productController.updateProduct)
  .delete(auth(), validate(productValidation.deleteProduct), productController.deleteProduct);

module.exports = router;
