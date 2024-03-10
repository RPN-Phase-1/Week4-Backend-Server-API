const httpStatus = require('http-status');
const { productService } = require('../service/index');
const ApiError = require('../utils/apiError');
const catchAsync = require('../utils/catchAsync');

const createProduct = catchAsync(async (req, res) => {
  const result = await productService.createProduct(req.body);
  res.status(httpStatus.OK).send({
    status: httpStatus.CREATED,
    message: 'Create Product Success',
    data: result,
  });
});

const getProduct = catchAsync(async (req, res) => {
  const result = await productService.getProduct();
  res.status(httpStatus.OK).send({
    status: httpStatus.CREATED,
    message: 'Get Product Success',
    data: result,
  });
});

const getProductById = catchAsync(async (req, res) => {
  const result = await productService.getProductById(req.params.productId);
  res.status(httpStatus.OK).send({
    status: httpStatus.CREATED,
    message: 'Get Product Success',
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const result = await productService.updateProduct(req.params.productId, req.body);
  res.status(httpStatus.OK).send({
    status: httpStatus.CREATED,
    message: 'Get Product Success',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const result = await productService.deleteProduct(req.params.productId);
  res.status(httpStatus.OK).send({
    status: httpStatus.CREATED,
    message: 'Delete Product Success',
    data: result,
  });
});

module.exports = {
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
