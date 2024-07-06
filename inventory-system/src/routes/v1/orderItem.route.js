const express = require("express");
const { auth, authAcces } = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const orderItemValidation = require("../../validations/orderItem.validation");
const orderItemController = require("../../controllers/orderItem.controller");

const router = express.Router();

router
  .route("/")
  .post(
    auth(),
    authAcces(),
    validate(orderItemValidation.createOrderItem),
    orderItemController.createOrderItem
  )
  .get(auth(), authAcces(), orderItemController.getOrderItems);

router
  .route("/:orderItemId")
  .get(
    auth(),
    authAcces(),
    validate(orderItemValidation.getOrderItem),
    orderItemController.getOrderItem
  )
  .patch(
    auth(),
    authAcces(),
    validate(orderItemValidation.updateOrderItem),
    orderItemController.updateOrderItem
  )
  .delete(
    auth(),
    authAcces(),
    validate(orderItemValidation.deleteOrderItem),
    orderItemController.deleteOrderItem
  );

module.exports = router;
