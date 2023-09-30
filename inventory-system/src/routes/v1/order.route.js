const express = require('express');
const { auth, authAccess } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const orderValidation = require('../../validations/order.validation');
const orderController = require('../../controllers/order.controller');

const router = express.Router();

router
    .route('/')
    .post(auth(), authAccess(), validate(orderValidation.createOrder), orderController.createOrder)
    .get(auth(), authAccess(), orderController.getOrders);

router
    .route('/:orderId')
    .get(auth(), authAccess(), validate(orderValidation.getOrder), orderController.getOrder)
    .put(auth(), authAccess(), validate(orderValidation.updateOrder), orderController.updateOrder)
    .delete(auth(), authAccess(), validate(orderValidation.deleteOrder), orderController.deleteOrder);

router
    .route('/:orderId/order-items')
    .get(auth(), authAccess(), validate(orderValidation.getOrder), orderController.getOrderItemsByOrder)

module.exports = router;