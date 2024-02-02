const express = require('express');
const { adminAuth } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const orderItemValidation = require('../../validations/orderItem.validation');
const orderItemController = require('../../controllers/orderItem.controller');

const router = express.Router();

router
  .route('/')
  .post(adminAuth(), validate(orderItemValidation.createOrderItem), orderItemController.createOrderItem)
  .get(adminAuth(), orderItemController.getOrderItems);

router
  .route('/:orderItemId')
  .get(adminAuth(), validate(orderItemValidation.getOrderItem), orderItemController.getOrderItem)
  .patch(adminAuth(), validate(orderItemValidation.updateOrderItem), orderItemController.updateOrderItem)
  .delete(adminAuth(), validate(orderItemValidation.deleteOrderItem), orderItemController.deleteOrderItem);

module.exports = router;
