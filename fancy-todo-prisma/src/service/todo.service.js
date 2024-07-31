const prisma = require("../../prisma/client");

const getTodos = async () => {
  try {
    const todos = await prisma.todo.findMany();
    return todos;
  } catch (err) {
    console.log("service error", err);
    throw err;
  }
};

const getTodo = async (id) => {
  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });
    return todo;
  } catch (err) {
    console.log("service error", err);
    throw err;
  }
};

const createTodo = async (data) => {
  try {
    const todo = await prisma.todo.create({ data: data });
    return todo;
  } catch (err) {
    console.log("service error", err);
    throw err;
  }
};

const updateTodo = async (id, data) => {
  try {
    const todo = await prisma.todo.update({
      where: {
        id: id,
      },
      data,
    });
    return todo;
  } catch (err) {
    console.log("service error", err);
    throw err;
  }
};

const deleteTodo = async (id) => {
  try {
    const todo = await prisma.todo.delete({
      where: {
        id: id,
      },
    });
    return todo;
  } catch (err) {
    console.log("service error", err);
    throw err;
  }
};

module.exports = { getTodos, getTodo, createTodo, updateTodo, deleteTodo };
