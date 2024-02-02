const httpStatus = require('http-status');
const ApiError = require('../utils/apiError');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services');

const createCategory = catchAsync(async (req, res) => {
  const category = await categoryService.createCategory(req.body);

  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: 'Create Category Success',
    data: category,
  });
});

const getCategorys = catchAsync(async (req, res) => {
  // Object untuk menampung options dan orderBy yang akan dikirimkan menjadi parameter ke queryCategorys
  const whereOptions = {};
  const orderByOptions = {};
  const skipTakeOptions = {};
  ['id', 'name', 'createdAt', 'updatedAt'].forEach((param) => {
    if (req.query[param]) {
      whereOptions[param] = req.query[param];
    }
  });
  if (req.query.skip) {
    skipTakeOptions.skip = req.query.skip;
  }
  if (req.query.take) {
    skipTakeOptions.take = req.query.take;
  }
  if (req.query.orderBy) {
    orderByOptions.orderBy = req.query.orderBy.split(':');
  }
  
  const sortingOptions = req.query.orderBy ? { [orderByOptions.orderBy[0]]: orderByOptions.orderBy[1] } : undefined;

  const category = await categoryService.queryCategorys(whereOptions, skipTakeOptions, sortingOptions);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get Category Success',
    data: category,
  });
});

const getCategoryById = catchAsync(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get Category Success',
    data: category,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const category = await categoryService.updateCategoryById(req.params.categoryId, req.body);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Update Category Success',
    data: category,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  await categoryService.deleteCategoryById(req.params.categoryId);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Delete Category Success',
    data: null,
  });
});

module.exports = { createCategory, getCategorys, getCategoryById, updateCategory, deleteCategory };
