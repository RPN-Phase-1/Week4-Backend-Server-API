const express = require('express');
const { auth } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { orderItemValidation } = require('../../validations');
const orderItemController = require('../../controllers/orderItem.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(orderItemValidation.createOrderItem), orderItemController.createOrderItem)
  .get(auth(), orderItemController.getAllOrderItems);

router.route('/:orderItemId').get(auth(), orderItemController.getOrderItem);
// .delete(auth(), orderItemController.deleteOrderItem);

module.exports = router;
