const express = require("express");
const router = express.Router();
const orderItemController = require("../controllers/order-item.controller");

router.route("/").get(orderItemController.getOrderItems).post(orderItemController.createOrderItem);

router
  .route("/:id")
  .get(orderItemController.getOrderItem)
  .put(orderItemController.updateOrderItem)
  .delete(orderItemController.deleteOrderItem);

module.exports = router;
