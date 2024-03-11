const express = require('express');
const productController = require('../../controllers/product.controller');
const { auth } = require('../../middlewares/auth');

const router = express.Router();

router.route('/').post(auth(), productController.createProduct).get(auth(), productController.getProduct);
router
  .route('/:productId')
  .get(auth(), productController.getProductById)
  .put(auth(), productController.updateProduct)
  .delete(auth(), productController.deleteProduct);

module.exports = router;
