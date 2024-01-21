const express = require('express');
const { auth } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { userValidation, productValidation } = require('../../validations');
const userController = require('../../controllers/user.controller');
const productController = require('../../controllers/product.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(userValidation.createUser), userController.createUser)
  .get(auth(), userController.getAllUsers);

router.route('/:userId').get(auth(), validate(userValidation.getUserById), userController.getUserById);

router
  .route('/:userId/products')
  .get(auth(), validate(productValidation.getProductByUser), productController.getProductsByUser);
module.exports = router;
