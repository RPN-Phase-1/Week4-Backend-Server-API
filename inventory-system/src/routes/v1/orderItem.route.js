const express = require('express');
const { auth, authAccess } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const orderItemValidation = require('../../validations/orderItem.validation');
const orderItemController = require('../../controllers/orderItem.controller');

const router = express.Router();

router
    .route('/')
    .post(auth(), authAccess(), validate(orderItemValidation.createOrderItem), orderItemController.createOrderItem)
    .get(auth(), authAccess(), orderItemController.getOrderItems);

router
    .route('/:orderItemId')
    .get(auth(), authAccess(), validate(orderItemValidation.getOrderItem), orderItemController.getOrderItem)
    .put(auth(), authAccess(), validate(orderItemValidation.updateOrderItem), orderItemController.updateOrderItem)
    .delete(auth(), authAccess(), validate(orderItemValidation.deleteOrderItem), orderItemController.deleteOrderItem);

module.exports = router;