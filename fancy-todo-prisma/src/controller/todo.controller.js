const todoService = require("../service/todo.service");

const getTodos = async (req, res) => {
  try {
    const result = await todoService.getTodo();
    res.status(200).send({
      status: 200,
      message: "Get Todo Success",
      data: result,
    });
  } catch {
    res.status(500).send({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const createTodo = async (req, res) => {
  try {
    const body = req.body;
    let result = await todoService.createTodo(
      body.title,
      body.description,
      body.status,
      body.userID
    );
    res.status(200).json({
      status: 200,
      message: "Success Create New Todo",
      data: body,
    });
  } catch {
    res.status(500).send({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const findTodo = async (req, res) => {
  try {
    const id = req.params.id;
    let result = await todoService.findTodo(id);
    res.status(200).json({
      status: 200,
      message: "Success Find Todo",
      data: result
    });
  } catch {
    res.status(500).send({
      status: 500,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    let updatedData = await todoService.updateTodo(
      id,
      body.title,
      body.description,
      body.status,
      body.userId
    );
    res.status(200).json({
      status: 200,
      message: "Success Update Todo",
      data: updatedData
    });
  } 
  catch {
    res.status(500).send({
      status: 500,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    let deletedTodo = await todoService.deleteTodo(id);
    res.status(200).json({
        status: 200,
        message: "Success Delete Todo",
        data: deletedTodo
      });
  } catch {
    res.status(500).send({
        status: 500,
        message: "Internal Server Error",
        error: error.message
      });
  }
};

module.exports = { getTodos, deleteTodo, findTodo, createTodo, updateTodo};
