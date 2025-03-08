const express = require("express");
const router = express.Router();
const categoryController = require("../controller/kategori");
const {
  verifyToken,
  authorizeAdmin,
  authorizeUser,
} = require("../middleware/auth");

router.get(
  "/",
  verifyToken,
  authorizeUser,
  categoryController.getAllCategories
);
router.get(
  "/:id",
  verifyToken,
  authorizeUser,
  categoryController.getCategoryById
);

router.post(
  "/",
  verifyToken,
  authorizeAdmin,
  categoryController.createCategory
);
router.put(
  "/:id",
  verifyToken,
  authorizeAdmin,
  categoryController.updateCategory
);
router.delete(
  "/:id",
  verifyToken,
  authorizeAdmin,
  categoryController.deleteCategory
);

module.exports = router;
