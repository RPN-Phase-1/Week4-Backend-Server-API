const express = require("express");
const router = express.Router();
const orderController = require("../controller/order");
const { verifyToken, authorizeAdmin } = require("../middleware/auth");
router.post("/", verifyToken, authorizeAdmin, orderController.createOrder);
router.get("/", verifyToken, authorizeAdmin, orderController.getAllOrders);
router.get("/:id", verifyToken, authorizeAdmin, orderController.getOrderById);
router.put(
  "/:id/status",
  verifyToken,
  authorizeAdmin,
  orderController.updateOrderStatus
);
router.delete("/:id", verifyToken, authorizeAdmin, orderController.deleteOrder);

module.exports = router;
