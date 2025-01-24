const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const authenticate = require('../middlewares/auth.middleware');

router.route('/')
  .get(authenticate(), orderController.getOrders)
  .post(authenticate(), orderController.createOrder);

router
  .route('/:id')
  .get(authenticate(), orderController.getOrder)
  .put(authenticate(), orderController.updateOrder)
  .delete(authenticate(), orderController.deleteOrder);

module.exports = router;
