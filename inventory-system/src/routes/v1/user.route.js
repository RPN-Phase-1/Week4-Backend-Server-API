const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { userValidation } = require('../../validations');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(userValidation.create), userController.create)
  .get(auth(), validate(userValidation.getAll), userController.getAll);

router
  .route('/:userId')
  .get(auth(), validate(userValidation.getId), userController.getId)
  .put(auth(), validate(userValidation.update), userController.update)
  .delete(auth(), validate(userValidation.deleted), userController.deleted);

module.exports = router;
