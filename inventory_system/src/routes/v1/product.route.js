const express = require('express');
const { auth, authAdmin } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const productController = require('../../controllers/product.controller');
const productValidation = require('../../validations/product.validation');

const router = express.Router();

router
  .route('/')
  .get(auth(), productController.getProducts)
  .post(auth(), validate(productValidation.createProduct), productController.createProduct);

router
  .route('/:productId')
  .get(auth(), validate(productValidation.getProduct), productController.getProduct)
  .patch(auth(), validate(productValidation.updateProduct), productController.updateProduct)
  .delete(auth(), validate(productValidation.deleteProduct), productController.deleteProduct);

module.exports = router;
