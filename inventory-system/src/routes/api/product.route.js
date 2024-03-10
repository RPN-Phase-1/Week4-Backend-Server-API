const express = require('express');
const productController = require('../../controllers/product.controller');

const router = express.Router();

router.route('/').post(productController.createProduct).get(productController.getProduct);
router
  .route('/:productId')
  .get(productController.getProductById)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
