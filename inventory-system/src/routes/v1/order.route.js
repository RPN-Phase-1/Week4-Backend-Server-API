const express = require("express");
const { auth, authAcces } = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const orderValidation = require("../../validations/order.validation");
const orderController = require("../../controllers/order.controller");

const router = express.Router();

router
  .route("/")
  .post(
    auth(),
    authAcces(),
    validate(orderValidation.createOrder),
    orderController.createOrder
  )
  .get(auth(), authAcces(), orderController.getOrders);

router
  .route("/:orderId")
  .get(
    auth(),
    authAcces(),
    validate(orderValidation.getOrder),
    orderController.getOrder
  )
  .patch(
    auth(),
    authAcces(),
    validate(orderValidation.updateOrder),
    orderController.updateOrder
  )
  .delete(
    auth(),
    authAcces(),
    validate(orderValidation.deleteOrder),
    orderController.deleteOrder
  );

module.exports = router;
