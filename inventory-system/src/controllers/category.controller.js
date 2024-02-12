const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services');
const { render } = require('../app');



const viewCategory = catchAsync(async (req, res)=>{
  const messages = await req.flash('info');
  let { page, limit } = req.query;
  
  // Set default values jika page dan limit tidak diberikan atau tidak valid
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  
  const skip = (page - 1) * limit; // Calculate the value of skip based on page and limit

    // Get total count of categories
  const totalCount = await categoryService.getCategoryCount();
  const lastPage = Math.ceil(totalCount / limit);

  const categorys = await categoryService.getAllCategory(skip, limit);
  res.render('./category/view', {messages, categorys, page, limit, lastPage});
})

const addCategory = catchAsync(async (req, res)=>{
  res.render('./category/add');
})

const postCategory = catchAsync(async (req, res)=>{
  try{
      await categoryService.createCategory(req.body);
      await req.flash('info', 'New category has been added!');
      res.redirect('/category');

  }
  catch(error){
      console.log(error);
  }
  
})



const createCategory = catchAsync(async (req, res) => {
  const category = await categoryService.createCategory(req.body);

  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: 'Create Category Success',
    data: category,
  });

});

const getCategorys = catchAsync(async (req, res) => {
  const { skip, take } = req.query;
  const result = await categoryService.getAllCategory(skip, take);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get Categorys Success',
    data: result,
  });
});




const getCategory = catchAsync(async (req, res) => {
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

module.exports = {
  viewCategory,
  addCategory,
  postCategory,
  createCategory,
  getCategorys,
  getCategory,
  updateCategory,
  deleteCategory,
};
