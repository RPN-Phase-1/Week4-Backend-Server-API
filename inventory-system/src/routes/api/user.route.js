const express = require('express');
const userController = require('../../controllers/user.controller');
const { authAdmin } = require('../../middlewares/auth');

const router = express.Router();

router.route('/').get(userController.getAllUsers);

router
  .route('/:userId')
  .get(authAdmin(), userController.getUserById)
  .patch(authAdmin(), userController.updateUser)
  .delete(authAdmin(), userController.deleteUser);

router.route('/:userId/products').get(authAdmin(), userController.getProductByUser);

router.route('/:userId/orders').get(authAdmin(), userController.getOrderByUser);

module.exports = router;
