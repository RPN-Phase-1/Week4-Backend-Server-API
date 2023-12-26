const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const productValidation = require('../../validations/product.validation');
const productController = require('../../controllers/product.controller');

const router = express.Router();

router
  .route('/')
  .post( validate(productValidation.createProduct), productController.createProduct)
  .get( productController.getProducts);

router
  .route('/:productId')
  .get( validate(productValidation.getProduct), productController.getProduct)
  .patch( validate(productValidation.updateProduct), productController.updateProduct)
  .delete( validate(productValidation.deleteProduct), productController.deleteProduct);

module.exports = router;