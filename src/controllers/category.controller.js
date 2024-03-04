const httpStatus = require("http-status");
const { categoryService } = require("../services");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");

const createCategory = catchAsync(async (req, res) => {
  const existingCategory = await categoryService.getCategoryByName(req.body.name);

  if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Category already taken");
  }

  const category = await categoryService.createCategory(req.body);

  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: "Successfully create category",
    data: category,
  });
});

const getAllCategories = catchAsync(async (req, res) => {
  const { page, size } = req.query;
  const skip = page * size - size;

  const allCategories = await categoryService.getAllCategories(skip, Number(size));

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Successfully get all categories",
    data: allCategories,
  });
});

const getCategoryById = catchAsync(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.categoryId);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Successfully get category",
    data: category,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const updatedCategory = await categoryService.updateCategory(categoryId, req.body);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Successfully update category",
    data: updatedCategory,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  await categoryService.deleteCategory(req.params.categoryId);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Successfully delete category",
    data: null,
  });
});

const getProductByCategory = catchAsync(async (req, res) => {
  const query = req.query.categoryName;

  if (!query) throw new ApiError(httpStatus.BAD_REQUEST, "categoryName is required");

  const products = await categoryService.getProductByCategory(query);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Successfully get products by category",
    data: products,
  });
});

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getProductByCategory,
};
