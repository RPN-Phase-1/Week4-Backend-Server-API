const express = require('express');
const orderItemController = require('../../controllers/order-item.controller');

const router = express.Router();

router.route('/').post(orderItemController.createOrderItem).get(orderItemController.getOrderItem);

router
  .route('/:orderItemId')
  .get(orderItemController.getOrderItemById)
  .put(orderItemController.updateOrderItem)
  .delete(orderItemController.deleteOrderItem);

module.exports = router;
