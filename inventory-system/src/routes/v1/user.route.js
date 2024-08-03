const express = require('express');
const { auth, authAdmin } = require('../../middleware/auth');
const userController = require('../../controllers/user.controller');
const validate = require('../../middleware/validate');
const userValidation = require('../../validations/user.validation');

const router = express.Router();

router.route('/').get(authAdmin(), userController.getUsers);

router
  .route('/:userId')
  .get(authAdmin(), validate(userValidation.getUser), userController.getUserById)
  .patch(authAdmin(), validate(userValidation.updateUser), userController.updateUser)
  .delete(authAdmin(), validate(userValidation.deleteUser), userController.deleteUser);

router.route('/:userId/products').get(authAdmin(), userController.queryProductByUser);

router.route('/:userId/orders').get(authAdmin(), userController.queryOrderByUser);

module.exports = router;
