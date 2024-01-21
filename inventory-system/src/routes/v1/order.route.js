const express = require('express');
const { auth, authorizePermissions } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { orderValidation } = require('../../validations');
const orderController = require('../../controllers/order.controller');

const router = express.Router();

router
  .route('/')
  .get(auth(), authorizePermissions('admin'), orderController.getAllOrders)
  .post(auth(), authorizePermissions('admin'), validate(orderValidation.createOrder), orderController.createOrder);

module.exports = router;
