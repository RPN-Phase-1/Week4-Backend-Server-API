const express = require("express");
const validate = require("../../middlewares/validate");
const authController = require("../../controllers/auth.controller");
const authValidation = require("../../validations/auth.validation");

const router = express.Router();

router.post("/login", validate(authValidation.login), authController.login);
router.post("/register", validate(authValidation.register), authController.register);

module.exports = router;
