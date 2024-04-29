const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { orderValidation } = require('../../validations');
const orderController = require('../../controllers/order.controller');
const { orderItemValidation }= require('../../validations');

const router = express.Router();

router
 .route('/')
 .post(auth(), validate(orderValidation.createOrder), orderController.createOrder)
 .get(orderController.getOrders)

router
 .route('/:orderId')
 .get(auth(), validate(orderValidation.getOrderById), orderController.getOrderById)
 .put(auth(), validate(orderValidation.updateOrderById), orderController.updateOrderById)
 .delete(auth(), validate(orderValidation.deleteOrderById), orderController.deleteOrderById)

router
 .route('/:orderId/order-items')
 .get(auth(), validate(orderItemValidation.getOrderItemByOrder), orderController.getOrderItemByOrder)

module.exports = router