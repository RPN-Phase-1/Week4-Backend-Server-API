const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const authenticate = require('../middlewares/auth.middleware');

router
  .route('/')
  .get(authenticate(), categoryController.getCategories)
  .post(authenticate(), categoryController.createCategory);

router
  .route('/:id')
  .get(authenticate(), categoryController.getCategory)
  .put(authenticate(), categoryController.updateCategory)
  .delete(authenticate(), categoryController.deleteCategory);

module.exports = router;
