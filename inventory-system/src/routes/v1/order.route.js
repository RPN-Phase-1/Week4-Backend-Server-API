const express = require('express');
const { auth, authAdmin } = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const orderValidation = require('../../validations/order.validation');
const orderController = require('../../controllers/order.controller');

const router = express.Router();

router
  .route('/')
  .post(authAdmin(), validate(orderValidation.createOrder), orderController.createOrder)
  .get(authAdmin(), orderController.getOrders);

router
  .route('/:orderId')
  .get(authAdmin(), validate(orderValidation.getOrder), orderController.getOrder)
  .patch(authAdmin(), validate(orderValidation.updateOrder), orderController.updateOrder)
  .delete(authAdmin(), validate(orderValidation.deleteOrder), orderController.deleteOrder)
  .get(authAdmin(), validate(orderValidation.getOrder), orderController.queryOrderItemsByOrder);

module.exports = router;
