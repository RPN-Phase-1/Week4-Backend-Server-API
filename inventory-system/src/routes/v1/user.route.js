const express = require('express');
const { auth } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { productValidation } = require('../../validations');
const productController = require('../../controllers/product.controller');

const router = express.Router();

router
  .route('/:userId/products')
  .get(auth(), validate(productValidation.getProductByUser), productController.getProductsByUser);
module.exports = router;
