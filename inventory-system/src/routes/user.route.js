const express = require('express');
const { adminAuth } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const userValidation = require('../validations/user.validation');
const userController = require('../controllers/user.controller');

const router = express.Router();

router
  .route('/')
  .post(
    //adminAuth(),
     validate(userValidation.createUser), userController.createUser)
  .get(
    //adminAuth(),
     userController.getUsers);

router
  .route('/:userId')
  .get(
    //adminAuth(),
     validate(userValidation.getUser), userController.getUser)
  .patch(
    //adminAuth(),
     validate(userValidation.updateUser), userController.updateUser)
  .delete(
    //adminAuth(),
     validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
