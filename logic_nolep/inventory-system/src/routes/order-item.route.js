const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/order-item.controller');
const authenticate = require('../middlewares/auth.middleware');

router
  .route('/')
  .get(authenticate(), orderItemController.getOrderItems)
  .post(authenticate(), orderItemController.createOrderItem);

router
  .route('/:id')
  .get(authenticate(), orderItemController.getOrderItem)
  .put(authenticate(), orderItemController.updateOrderItem)
  .delete(authenticate(), orderItemController.deleteOrderItem);

module.exports = router;
