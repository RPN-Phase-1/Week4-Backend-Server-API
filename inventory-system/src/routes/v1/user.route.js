const express = require('express');
const { auth, authorizePermissions } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { userValidation, productValidation } = require('../../validations');
const userController = require('../../controllers/user.controller');
const productController = require('../../controllers/product.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(userValidation.createUser), userController.createUser)
  .get(auth(), userController.getAllUsers);

router
  .route('/:userId')
  .get(auth(), validate(userValidation.getUserById), userController.getUserById)
  .patch(auth(), validate(userValidation.updateUser), userController.updateUser)
  .delete(auth(), validate(userValidation.deleteUser), userController.deleteUser);

router
  .route('/:userId/products')
  .get(auth(), validate(productValidation.getProductByUser), productController.getProductsByUser);

router
  .route('/:userId/orders')
  .get(auth(), authorizePermissions('admin'), validate(userValidation.getOrdersByUser), userController.getOrdersByUser);
module.exports = router;
