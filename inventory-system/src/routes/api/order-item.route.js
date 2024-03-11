const express = require('express');
const orderItemController = require('../../controllers/order-item.controller');
const { authAdmin } = require('../../middlewares/auth');

const router = express.Router();

router.route('/').post(authAdmin(), orderItemController.createOrderItem).get(authAdmin(), orderItemController.getOrderItem);

router
  .route('/:orderItemId')
  .get(authAdmin(), orderItemController.getOrderItemById)
  .put(authAdmin(), orderItemController.updateOrderItem)
  .delete(authAdmin(), orderItemController.deleteOrderItem);

module.exports = router;
