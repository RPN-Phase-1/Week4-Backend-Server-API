const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todo.controller')

router.route('/todo')
    .get(todoController.getTodo)
    .post(todoController.createTodo)

router
.get('/todo/:id', todoController.getTodoById)    
.put('/todo/:id', todoController.updateTodo)
.delete('/todo/:id', todoController.deleteTodoById)

module.exports = router