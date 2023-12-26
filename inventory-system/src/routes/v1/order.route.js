const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const orderValidation = require('../../validations/order.validation');
const orderController = require('../../controllers/order.controller');

const router = express.Router();

router
  .route('/')
  .post( validate(orderValidation.createOrder), orderController.createOrder)
  .get( orderController.getOrders);

router
  .route('/:orderId')
  .get( validate(orderValidation.getOrder), orderController.getOrder)
  .patch( validate(orderValidation.updateOrder), orderController.updateOrder)
  .delete( validate(orderValidation.deleteOrder), orderController.deleteOrder);

module.exports = router;