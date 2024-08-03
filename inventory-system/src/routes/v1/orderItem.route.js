const express = require('express');
const { auth, authAdmin } = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const orderitemValidation = require('../../validations/orderItem.validation');
const orderitemController = require('../../controllers/orderItem.controller');

const router = express.Router();

router
  .route('/')
  .post(authAdmin(), validate(orderitemValidation.createOrderItem), orderitemController.createOrderItem)
  .get(authAdmin(), orderitemController.getOrderItems);

router
  .route('/:orderItemId')
  .get(authAdmin(), validate(orderitemValidation.getOrderItem), orderitemController.getOrderItem)
  .patch(authAdmin(), validate(orderitemValidation.updateOrderItem), orderitemController.updateOrderItem)
  .delete(authAdmin(), validate(orderitemValidation.deleteOrderItem), orderitemController.deleteOrderItem);

module.exports = router;
