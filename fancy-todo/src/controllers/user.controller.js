import {
    getUsers,
    getUser,
    getUserTodos,
    createUser,
    updateUser,
    deleteUser,
} from "../service/user.service.js";

const getAllUsers = async (_, res) => {
    try {
        const response = await getUsers()

        res.status(200).send({
            status: 200,
            message: "Get Users Success",
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

const getUserById = async (req, res) => {
    try {
        const { id } = req.params
        const response = await getUser({ id })

        res.status(200).send({
            status: 200,
            message: "Get User Success",
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

const getUserAllTodos = async (req, res) => {
    try {
        const { id } = req.params
        const response = await getUserTodos({ id })

        res.status(200).send({
            status: 200,
            message: "Get User Todos Success",
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

const createNewUser = async (req, res) => {
    try {
        const response = await createUser(req.body)

        res.status(200).send({
            status: 200,
            message: "Create User Success",
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

const updateUserById = async (req, res) => {
    try {
        const { id } = req.params
        const { name, email, phone } = req.body
        const response = await updateUser({ id, name, email, phone })

        res.status(200).send({
            status: 200,
            message: "Update User Success",
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

const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params
        const response = await deleteUser({ id })

        res.status(200).send({
            status: 200,
            message: "Delete User Success",
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
    getAllUsers,
    getUserById,
    getUserAllTodos,
    createNewUser,
    updateUserById,
    deleteUserById,
}