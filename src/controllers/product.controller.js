const httpStatus = require("http-status");
const { productService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(req.body);

  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: "Successfully create product",
    data: product,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const { page, size } = req.query;
  const skip = page * size - size;

  const products = await productService.getAllProducts(skip, Number(size));

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Successfully get all products",
    data: products,
  });
});

const getProductById = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.productId);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Successfully get product by id",
    data: product,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const productUpdate = await productService.updateProduct(req.params.productId, req.body);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Successfully update product",
    data: productUpdate,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProduct(req.params.productId);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Successfully delete product",
    data: null,
  });
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
