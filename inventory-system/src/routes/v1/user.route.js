const express = require("express");
const { auth, authAcces } = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const userValidation = require("../../validations/user.validation");
const userController = require("../../controllers/user.controller");

const router = express.Router();

router
  .route("/")
  .post(
    auth(),
    authAcces(),
    validate(userValidation.createUser),
    userController.createUser
  )
  .get(auth(), authAcces(), userController.getUsers);

router
  .route("/:userId")
  .get(
    auth(),
    authAcces(),
    validate(userValidation.getUser),
    userController.getUser
  )
  .patch(
    auth(),
    authAcces(),
    validate(userValidation.updatePassword),
    userController.updateUser
  )
  .delete(
    auth(),
    authAcces(),
    validate(userValidation.deleteUser),
    userController.deleteUser
  );

module.exports = router;
