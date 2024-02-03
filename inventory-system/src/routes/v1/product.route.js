const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { productValidation } = require('../../validations');
const productController = require('../../controllers/product.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(productValidation.create), productController.create)
  .get(auth(), validate(productValidation.getAll), productController.read);

module.exports = router;
