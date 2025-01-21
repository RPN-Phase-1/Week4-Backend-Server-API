const categoryService = require("../services/category.service");

const handleResponse = (res, status, message, data = null, error = null) => {
  res.status(status).json({
    status,
    message,
    data,
    error,
  });
};

const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getCategories();
    handleResponse(res, 200, "Success get Categories!", categories);
  } catch (err) {
    handleResponse(res, 500, "Failed to get Categories!", null, err.message);
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await categoryService.getCategory(req.params.id);
    handleResponse(res, 200, "Success get Category!", category);
  } catch (err) {
    handleResponse(res, 500, "Failed to get Category!", null, err.message);
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const createdCategory = await categoryService.createCategory({ name });

    handleResponse(res, 200, "Success create Category!", createdCategory);
  } catch (err) {
    handleResponse(res, 500, "Failed to create Category!", null, err.message);
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name } = req.body;
    
    const existingCategory = await categoryService.getCategory(categoryId);
    if (!existingCategory) {
      return handleResponse(res, 404, "Category not found.");
    }

    const updatedCategory = await categoryService.updateCategory(categoryId, {
      name,
    });

    handleResponse(res, 200, "Success update Category!", updatedCategory);
  } catch (err) {
    handleResponse(res, 500, "Failed to update Category!", null, err.message);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await categoryService.deleteCategory(req.params.id);
    handleResponse(res, 200, "Success delete Category!", deletedCategory);
  } catch (err) {
    handleResponse(res, 500, "Failed to delete Category!", null, err.message);
  }
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
