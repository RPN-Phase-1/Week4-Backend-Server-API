const express = require('express');
const orderController = require('../../controllers/order.controller');

const router = express.Router();

router.route('/').post(orderController.createOrder).get(orderController.getProduct);

router
  .route('/:orderId')
  .get(orderController.getOrderById)
  .put(orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
