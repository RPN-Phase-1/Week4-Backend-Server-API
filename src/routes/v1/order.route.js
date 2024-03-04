const express = require("express");
const { adminAuth } = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const orderValidation = require("../../validations/order.validation");
const orderController = require("../../controllers/order.controller");

const router = express.Router();

router
  .route("/")
  .get(adminAuth(), validate(orderValidation.getAllOrders), orderController.getAllOrders)
  .post(adminAuth(), validate(orderValidation.createOrder), orderController.createOrder);

router
  .route("/:orderId")
  .get(adminAuth(), validate(orderValidation.getOrderById), orderController.getOrderById)
  .put(adminAuth(), validate(orderValidation.updateOrder), orderController.updateOrder)
  .delete(adminAuth(), validate(orderValidation.deleteOrder), orderController.deleteOrder);

router.get(
  "/:orderId/order-items",
  adminAuth(),
  validate(orderValidation.getOrderItemByOrder),
  orderController.getOrderItemByOrder
);

module.exports = router;
