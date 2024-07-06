const todoService = require("../service/todo.service");

const getTodos = async (req, res) => {
  try {
    const result = await todoService.getTodos();
    res.status(200).json({
      status: 200,
      message: "Succes get todos",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Failed get todos",
      error: err.message,
    });
  }
};

const getTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await todoService.getTodo(id);
    res.status(200).json({
      status: 200,
      message: "Succes get todo",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed get todo",
      error: err.message,
    });
  }
};

const createTodo = async (req, res) => {
  try {
    const { title, description, status, userId } = req.body;
    const result = await todoService.createTodo({
      title,
      description,
      status,
      userId,
    });
    res.status(200).json({
      status: 200,
      message: "Succes create todo",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Failed create todo",
      error: err.message,
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, userId } = req.body;
    const result = await todoService.updateTodo(id, {
      title,
      description,
      status,
      userId,
    });
    res.status(200).json({
      status: 200,
      message: "Succes update todo",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Failed update todo",
      error: err.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params
    const result = await todoService.deleteTodo(id)
    res.status(200).json({
        status: 200,
        message: "Succes delete todo",
        data: result,
      });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Failed update todo",
      error: err.message,
    });
  }
};

module.exports = { getTodos, getTodo, createTodo, updateTodo, deleteTodo };
