const express = require("express");
const router = express.Router();
const productController = require("../controller/produk");
const {
  verifyToken,
  authorizeAdmin,
  authorizeUser,
} = require("../middleware/auth");

router.get("/", verifyToken, authorizeUser, productController.getAllProducts);
router.get(
  "/search",
  verifyToken,
  authorizeUser,
  productController.searchProductsByCategory
);
router.get(
  "/:id",
  verifyToken,
  authorizeUser,
  productController.getProductById
);

router.post("/", verifyToken, authorizeAdmin, productController.createProduct);
router.put(
  "/:id",
  verifyToken,
  authorizeAdmin,
  productController.updateProduct
);
router.delete(
  "/:id",
  verifyToken,
  authorizeAdmin,
  productController.deleteProduct
);

module.exports = router;
