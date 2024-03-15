const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todo.controller')

router.route('/todo')
    .get(todoController.getTodos)
    .post(todoController.createTodos)

router
.get('/todo/:id', todoController.getTodosById)    
.put('/todo/:id', todoController.updateTodos)
.delete('/todo/:id', todoController.deleteTodos)

module.exports = router