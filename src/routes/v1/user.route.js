const express = require("express");
const { adminAuth } = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const userController = require("../../controllers/user.controller");
const userValidation = require("../../validations/user.validation");

const router = express.Router();

router
  .route("/")
  .get(adminAuth(), validate(userValidation.getAllUsers), userController.getAllUsers)
  .post(adminAuth(), validate(userValidation.createUser), userController.createUser);

router
  .route("/:userId")
  .get(adminAuth(), validate(userValidation.getUserById), userController.getUserById)
  .put(adminAuth(), validate(userValidation.updateUser), userController.updateUser)
  .delete(adminAuth(), validate(userValidation.deleteUser), userController.deleteUser);

router.get("/:userId/orders", adminAuth(), validate(userValidation.getOrderByUser), userController.getOrderByUser);
router.get("/:userId/products", adminAuth(), validate(userValidation.getProductByUser), userController.getProductByUser);

module.exports = router;
