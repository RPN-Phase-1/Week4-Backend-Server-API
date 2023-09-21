import {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo,
} from "../service/todo.service.js";

const getAllTodos = async (_, res) => {
    try {
        const response = await getTodos()

        res.status(200).send({
            status: 200,
            message: "Get Todos Success",
            data: response,
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

const getTodoById = async (req, res) => {
    try {
        const { id } = req.params
        const response = await getTodo({ id })

        res.status(200).send({
            status: 200,
            message: "Get Todo Success",
            data: response,
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

const createNewTodo = async (req, res) => {
    try {
        const response = await createTodo(req.body)

        res.status(200).send({
            status: 200,
            message: "Create Todo Success",
            data: response,
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

const updateTodoById = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, status } = req.body
        const response = await updateTodo({ id, title, description, status })

        res.status(200).send({
            status: 200,
            message: "Update Todo Success",
            data: response,
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

const deleteTodoById = async (req, res) => {
    try {
        const { id } = req.params
        const response = await deleteTodo({ id })

        res.status(200).send({
            status: 200,
            message: "Delete Todo Success",
            data: response,
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

export {
    getAllTodos,
    getTodoById,
    createNewTodo,
    updateTodoById,
    deleteTodoById,
}