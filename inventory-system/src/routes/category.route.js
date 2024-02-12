const express = require('express');
const { auth } = require('../middlewares/auth');

const validate = require('../middlewares/validate');
const categoryValidation = require('../validations/category.validation');
const categoryController = require('../controllers/category.controller');

const router = express.Router();

router
  .route('/')
  .get(
    //auth(), 
        categoryController.viewCategory);

router
  .route('/add')
  .get(
    //auth(),
        categoryController.addCategory)
  .post(
    //auth(),
    categoryController.postCategory)

router
  .route('get/:categoryId')
  .get(
    //auth(), 
        validate(categoryValidation.getCategory), categoryController.getCategory)
       

router
  .route('/add')
  .post(
    //auth(), 
        validate(categoryValidation.createCategory), categoryController.createCategory)

router
  .route('/edit/:categoryId')
  .patch(
     //auth(), 
       validate(categoryValidation.updateCategory), categoryController.updateCategory)

router
  .route('/delete/:categoryId')
  .delete(
    //auth(), 
       validate(categoryValidation.deleteCategory), categoryController.deleteCategory);

module.exports = router;
