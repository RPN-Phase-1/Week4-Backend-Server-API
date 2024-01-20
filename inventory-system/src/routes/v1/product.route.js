const express = require('express');
const { auth } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { productValidation } = require('../../validations');
const productController = require('../../controllers/product.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(productValidation.createProduct), productController.createProduct)
  .get(auth(), productController.getAllProducts);

module.exports = router;
