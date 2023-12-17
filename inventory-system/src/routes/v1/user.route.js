const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller")

router
  .route('/:userId')
  .get(auth(), userController.getUser)