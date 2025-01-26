const express = require('express');

const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

router
  .route('/')
  .get(authenticate(), authorize(['admin']), categoryController.getCategories)
  .post(authenticate(), authorize(['admin']), categoryController.createCategory);

router
  .route('/:id')
  .get(authenticate(), authorize(['admin']), categoryController.getCategory)
  .put(authenticate(), authorize(['admin']), categoryController.updateCategory)
  .delete(authenticate(), authorize(['admin']), categoryController.deleteCategory);

module.exports = router;
