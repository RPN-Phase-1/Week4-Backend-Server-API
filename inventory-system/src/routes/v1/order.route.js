const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { orderValidation } = require('../../validations');
const orderController = require('../../controllers/order.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(orderValidation.create), orderController.create)
  .get(auth(), validate(orderValidation.getAll), orderController.getAll);

router
  .route('/:orderId')
  .get(auth(), validate(orderValidation.getId), orderController.getId)
  .put(auth(), validate(orderValidation.update), orderController.update)
  .delete(auth(), validate(orderValidation.deleted), orderController.deleted);

module.exports = router;
