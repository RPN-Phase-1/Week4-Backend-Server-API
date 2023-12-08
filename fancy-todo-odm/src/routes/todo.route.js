const express = require('express');
const router = express.Router();
const {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todo.controller');

router.route('/').get(getAllTodos).post(createTodo);

router.route('/:id').get(getTodo).update(updateTodo).delete(deleteTodo);

module.exports = router;
