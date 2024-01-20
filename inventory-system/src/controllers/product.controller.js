const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');
// const ApiError = require('../utils/ApiError');

const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(req.body);

  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: 'Create Product Success',
    data: product,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const filters = {
    name: req.query.name,
    price: req.query.price,
    category: req.query.category,
    user: req.query.user,
  };

  const options = {
    take: req.query.take || 10,
    page: req.query.page || 1,
    skip: (req.query.page - 1) * (req.query.take || 10),
    sort: req.query.sort === 'latest' ? { createdAt: 'desc' } : { createdAt: 'asc' },
  };

  const { sort } = req.query;

  // If sort a-z or z-a
  if (sort === 'a-z') options.sort = { name: 'asc' };
  if (sort === 'z-a') options.sort = { name: 'desc' };

  const result = await productService.queryProducts(filters, options);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get Products Success',
    data: result,
  });
});

const getProduct = catchAsync(async (req, res) => {});

module.exports = {
  createProduct,
  getAllProducts,
};
