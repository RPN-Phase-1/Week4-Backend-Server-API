const todoService = require('../service/todo.service');

const getAllTodos = async (req, res) => {
  try {
    const result = await todoService.getAllTodos();
    res.status(200).send({
      status: 200,
      message: 'Get Todos Success',
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

const getTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await todoService.getTodo(id);
    res.status(200).send({
      status: 200,
      message: 'Get Todos Success',
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
const getTodoByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await todoService.getTodoByUserId(userId);
    res.status(200).send({
      status: 200,
      message: 'Get Todos By UserId Success',
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
const createTodo = async (req, res) => {
  try {
    console.log(req.body);
    const { title, description, status, userId } = req.body;
    const result = await todoService.createTodo(title, description, status, userId);
    res.status(200).send({
      status: 200,
      message: 'Create Todo Success',
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
const updateTodo = async (req, res) => {
  try {
    const { title, description, status, userId } = req.body;
    const { id } = req.params;
    const result = await todoService.updateTodo(title, description, status, userId, id);
    res.status(200).send({
      status: 200,
      message: 'Update Todo Success',
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await todoService.deleteTodo(id);
    res.status(200).send({
      status: 200,
      message: 'Delete Todo Success',
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

module.exports = {
  getAllTodos,
  getTodo,
  getTodoByUserId,
  createTodo,
  updateTodo,
  deleteTodo,
};