const express = require('express');

const router = express.Router();
// const { getAllUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/user.controller');
const createUser = require('../controllers/user.controller');

router.route('/').post(createUser);
// router.route('/').get(getAllUsers).post(createUser);

// router.route('/:id').get(getUser).update(updateUser).delete(deleteUser);

module.exports = router;
