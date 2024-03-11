const express = require('express');
const orderController = require('../../controllers/order.controller');
const { authAdmin } = require('../../middlewares/auth');

const router = express.Router();

router.route('/').post(authAdmin(), orderController.createOrder).get(authAdmin(), orderController.getProduct);

router
  .route('/:orderId')
  .get(authAdmin(), orderController.getOrderById)
  .put(authAdmin(), orderController.updateOrder)
  .delete(authAdmin(), orderController.deleteOrder);

module.exports = router;
