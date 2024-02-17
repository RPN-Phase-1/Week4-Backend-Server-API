const express = require('express');
const { adminAuth, auth } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const orderItemValidation = require('../validations/orderItem.validation');
const orderItemController = require('../controllers/orderItem.controller');

const router = express.Router();

router
  .route('/')
  .get(orderItemController.viewOrderItem);

router
  .route('/add')
  .get(orderItemController.addOrderItem)
  .post(orderItemController.postOrderItem);

router
  .route('/detail/:orderItemId')
  .get(orderItemController.detailOrderItem);

  router
  .route('/edit/:orderItemId')
  .get(orderItemController.editOrderItem)
  .patch(orderItemController.updateOrderItem)
  .delete(orderItemController.deleteOrderItem)

  router
  .route('/search')
  .get(orderItemController.searchOrderItem)


// router
//   .route('/')
//   .post(
//     //auth(),
//      validate(orderItemValidation.createOrderItem), orderItemController.createOrderItem)
//   .get(
//     //auth(),
//      orderItemController.getOrderItems);

// router
//   .route('/:orderItemId')
//   .get(
//     //auth(),
//      validate(orderItemValidation.getOrderItem), orderItemController.getOrderItem)
//   .patch(
//     //auth(),
//      validate(orderItemValidation.updateOrderItem), orderItemController.updateOrderItem)
//   .delete(//auth(),
//    validate(orderItemValidation.deleteOrderItem), orderItemController.deleteOrderItem);

module.exports = router;
