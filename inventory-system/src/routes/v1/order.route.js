const express = require('express');
const {auth, adminAuth} = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const orderValidation = require('../../validations/order.validation');
const orderController = require('../../controllers/order.controller');

const router = express.Router();

router
  .route('/')
  .post(adminAuth(), validate(orderValidation.createOrder), orderController.createOrder)
  .get(adminAuth(), orderController.getOrders);

router
  .route('/:orderId')
  .get(adminAuth(), validate(orderValidation.getOrder), orderController.getOrder)
  .patch(adminAuth(), validate(orderValidation.updateOrder), orderController.updateOrder)
  .delete(adminAuth(), validate(orderValidation.deleteOrder), orderController.deleteOrder);

module.exports = router;