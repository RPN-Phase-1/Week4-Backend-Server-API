const express = require('express');
const { auth, authAccess } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router
    .route('/')
    .post(auth(), authAccess(), validate(userValidation.createUser), userController.createUser)
    .get(auth(), authAccess(), userController.getUsers);

router
    .route('/:userId')
    .get(auth(), authAccess(), validate(userValidation.getUser), userController.getUser)
    .put(auth(), authAccess(), validate(userValidation.updateUser), userController.updateUser)
    .delete(auth(), authAccess(), validate(userValidation.deleteUser), userController.deleteUser);

router
    .route('/:userId/products')
    .get(auth(), authAccess(), validate(userValidation.getUser), userController.getProductsByUser)

router
    .route('/:userId/orders')
    .get(auth(), authAccess(), validate(userValidation.getUser), userController.getOrdersByUser)

module.exports = router;