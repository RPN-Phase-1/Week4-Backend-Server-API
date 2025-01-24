const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

router
  .route('/')
  .get(authenticate(), authorize(['admin']), userController.getUsers)
  .post(authenticate(), authorize(['admin']), userController.createUser);

router
  .route('/:id')
  .get(authenticate(), authorize(['admin']), userController.getUser)
  .put(authenticate(), authorize(['admin']), userController.updateUser)
  .delete(authenticate(), authorize(['admin']), userController.deleteUser);

module.exports = router;
