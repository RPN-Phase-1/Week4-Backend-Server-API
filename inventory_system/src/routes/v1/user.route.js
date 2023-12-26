const express = require('express');
const { authAdmin } = require('../../middlewares/auth');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.route('/').get(authAdmin(), userController.getUsers);

router.route('/:email').get(authAdmin(), userController.getUserByEmail);

module.exports = router;
