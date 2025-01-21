const productService = require("../services/product.service");

const handleResponse = (res, status, message, data = null, error = null) => {
  res.status(status).json({
    status,
    message,
    data,
    error,
  });
};

const getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts();
    handleResponse(res, 200, "Success get Products!", products);
  } catch (err) {
    handleResponse(res, 500, "Failed to get Products!", null, err.message);
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await productService.getProduct(req.params.id);
    handleResponse(res, 200, "Success get Product!", product);
  } catch (err) {
    handleResponse(res, 500, "Failed to get Product!", null, err.message);
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, quantityInStock, categoryId, userId } =
      req.body;

    const createdProduct = await productService.createProduct({
      name,
      description,
      price,
      quantityInStock,
      categoryId,
      userId,
    });

    handleResponse(res, 200, "Success create Product!", createdProduct);
  } catch (err) {
    handleResponse(res, 500, "Failed to create Product!", null, err.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price, quantityInStock, categoryId, userId } =
      req.body;

    const existingProduct = await productService.getProduct(productId);
    if (!existingProduct) {
      return handleResponse(res, 404, "Product not found.");
    }

    const updatedProduct = await productService.updateProduct(productId, {
      name,
      description,
      price,
      quantityInStock,
      categoryId,
      userId,
    });

    handleResponse(res, 200, "Success update Product!", updatedProduct);
  } catch (err) {
    handleResponse(res, 500, "Failed to update Product!", null, err.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productService.deleteProduct(req.params.id);
    handleResponse(res, 200, "Success delete Product!", deletedProduct);
  } catch (err) {
    handleResponse(res, 500, "Failed to delete Product!", null, err.message);
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
