const express = require("express");
const router = express.Router();
const userController = require("../controller/userControl");
const { verifyToken, authorizeAdmin } = require("../middleware/auth");

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/", verifyToken, authorizeAdmin, userController.getAllUsers);
router.get("/:id", verifyToken, authorizeAdmin, userController.getUserById);
router.put("/:id", verifyToken, authorizeAdmin, userController.updateUser);
router.delete("/:id", verifyToken, authorizeAdmin, userController.deleteUser);

module.exports = router;
