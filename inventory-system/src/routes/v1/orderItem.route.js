const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const orderItemValidation = require('../../validations/orderItem.validation');
const orderItemController = require('../../controllers/orderItem.controller');

const router = express.Router();

router
  .route('/')
  .post( validate(orderItemValidation.createOrderItem), orderItemController.createOrderItem)
  .get( orderItemController.getOrderItems);

router
  .route('/:orderItemId')
  .get( validate(orderItemValidation.getOrderItem), orderItemController.getOrderItem)
  .patch( validate(orderItemValidation.updateOrderItem), orderItemController.updateOrderItem)
  .delete( validate(orderItemValidation.deleteOrderItem), orderItemController.deleteOrderItem);

module.exports = router;