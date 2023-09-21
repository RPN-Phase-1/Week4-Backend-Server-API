import express from "express";
import {
    getAllTodos,
    getTodoById,
    createNewTodo,
    updateTodoById,
    deleteTodoById,
} from "../controllers/todo.controller.js";

const router = express.Router()

router
    .route("/")
    .get(getAllTodos)
    .post(createNewTodo)

router
    .route("/:id")
    .get(getTodoById)
    .put(updateTodoById)
    .delete(deleteTodoById)

export { router }