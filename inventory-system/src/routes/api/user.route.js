const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.route('/').get(userController.getAllUsers);

router.route('/:userId').get(userController.getUserById).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router;
