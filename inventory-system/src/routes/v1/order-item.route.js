const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const orderItemController = require('../../controllers/order-item.controller');
const { orderItemValidation } = require('../../validations')

const router = express.Router();

router
 .route('/')
 .post(auth(), validate(orderItemValidation.createOrderItem), orderItemController.createOrderItem)
 .get(orderItemController.getOrderItems);

router
 .route('/:orderItemId')
 .get(auth(), validate(orderItemValidation.getOrderItemById), orderItemController.getOrderItemById)
 .put(auth(), validate(orderItemValidation.updateOrderItemById), orderItemController.updateOrderItemById)
 .delete(auth(), validate(orderItemValidation.deleteOrderItemsById), orderItemController.deleteOrderItemById)

module.exports = router