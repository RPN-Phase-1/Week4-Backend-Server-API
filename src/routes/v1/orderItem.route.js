const express = require("express");
const { adminAuth } = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const orderItemController = require("../../controllers/orderItem.controller");
const orderItemValidation = require("../../validations/orderItem.validation");

const router = express.Router();

router
  .route("/")
  .get(adminAuth(), validate(orderItemValidation.getAllOrderItems), orderItemController.getAllOrderItem)
  .post(adminAuth(), validate(orderItemValidation.createOrderItem), orderItemController.createOrderItem);

router
  .route("/:orderItemId")
  .get(adminAuth(), validate(orderItemValidation.getOrderItemById), orderItemController.getOrderItemById)
  .put(adminAuth(), validate(orderItemValidation.updateOrderItem), orderItemController.updateOrderItem)
  .delete(adminAuth(), validate(orderItemValidation.deleteOrderItem), orderItemController.deleteOrderItem);

module.exports = router;
