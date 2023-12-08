const express = require('express');
const router = express.Router('');
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');

router.route('/').get(getAllUsers).post(createUser);

router.router('/:id').get(getUser).update(updateUser).delete(deleteUser);

module.exports = router;
