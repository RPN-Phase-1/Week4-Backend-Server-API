const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userController = require('../../controllers/user.controller');
const userValidation = require('../../validations/user.validation');
const productValidation = require('../../validations/product.validation');

const router = express.Router();

 router
 .route('/')
 .post(auth(), validate(userValidation.createUser), userController.createUser)
 .get( userController.getUsers)

 router
 .route('/:userId')
 .get(auth(),  validate(userValidation.getUsersById), userController.getUserById)
 .put(auth(),  validate(userValidation.updateUserById), userController.updateUserById)
 .delete(auth(),  validate(userValidation.deleteUserById), userController.deleteUserById)

 router
 .route('/:userId/product')
 .get(auth(), validate(productValidation.getProductByUser), userController.getProductByUser)

 router
 .route('/email/:email')
 .get(auth(), validate(userValidation.getUserByEmail), userController.getUserByEmail)


 module.exports = router;