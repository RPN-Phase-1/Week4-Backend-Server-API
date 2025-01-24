const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticate = require('../middlewares/auth.middleware');

router.route('/')
  .get(authenticate(), userController.getUsers)
  .post(authenticate(), userController.createUser);

router
  .route('/:id')
  .get(authenticate(), userController.getUser)
  .put(authenticate(), userController.updateUser)
  .delete(authenticate(), userController.deleteUser);

module.exports = router;
