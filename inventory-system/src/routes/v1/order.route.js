const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const orderValidation = require('../../validations/order.validation');
const orderController = require('../../controllers/order.controller');

const router = express.Router();

router
 .route('/')
 .post(auth(), validate(orderValidation.createOrder), orderController.createOrder)
 .get(orderController.getOrders)

router
 .route('/:orderId')
 .get(auth(), validate(orderValidation.getOrderById), orderController.getOrderById)
 .patch(auth(), validate(orderValidation.updateOrderById), orderController.updateOrderById)
 .delete(auth(), validate(orderValidation.deleteOrderById), orderController.deleteOrderById)

module.exports = router