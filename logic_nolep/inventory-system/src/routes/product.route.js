const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const authenticate = require('../middlewares/auth.middleware');

router.route('/')
  .get(authenticate(), productController.getProducts)
  .post(authenticate(), productController.createProduct);

router
  .route('/:id')
  .get(authenticate(), productController.getProduct)
  .put(authenticate(), productController.updateProduct)
  .delete(authenticate(), productController.deleteProduct);

module.exports = router;
