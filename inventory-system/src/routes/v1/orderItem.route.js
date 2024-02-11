const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { orderItemValidation } = require('../../validations');
const orderItemController = require('../../controllers/orderItem.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(orderItemValidation.create), orderItemController.create)
  .get(auth(), validate(orderItemValidation.getAll), orderItemController.getAll);

router
  .route('/:orderItemId')
  .get(auth(), validate(orderItemValidation.getId), orderItemController.getId)
  .put(auth(), validate(orderItemValidation.update), orderItemController.update)

module.exports = router;
