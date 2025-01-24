const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

router
  .route('/')
  .get(authenticate(), authorize(['admin']), orderController.getOrders)
  .post(authenticate(), authorize(['admin']), orderController.createOrder);

router
  .route('/:id')
  .get(authenticate(), authorize(['admin']), orderController.getOrder)
  .put(authenticate(), authorize(['admin']), orderController.updateOrder)
  .delete(authenticate(), authorize(['admin']), orderController.deleteOrder);

module.exports = router;
