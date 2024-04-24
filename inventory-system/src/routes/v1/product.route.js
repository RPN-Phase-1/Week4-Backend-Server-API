const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const productController = require('../../controllers/product.controller');
const pruductValidation = require('../../validations/product.validation')

const router = express.Router();

router
 .route('/')
 .post(auth(), validate(pruductValidation.createProduct) , productController.createProduct)
 .get(productController.getProducts)

router
 .route('/:productId')
 .get(auth(), validate(pruductValidation.getProductById), productController.getProductById)
 .patch(auth(), validate(pruductValidation.updateProductById), productController.updateProductById)
 .delete(auth(), validate(pruductValidation.deleteProductById), productController.deleteProductById)

module.exports = router