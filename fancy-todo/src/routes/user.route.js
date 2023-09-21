import express from "express";
import {
    getAllUsers,
    getUserById,
    getUserAllTodos,
    createNewUser,
    updateUserById,
    deleteUserById,
} from "../controllers/user.controller.js";

const router = express.Router()

router
    .route("/")
    .get(getAllUsers)
    .post(createNewUser)

router
    .route("/:id")
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById)

router
    .route("/:id/todos")
    .get(getUserAllTodos)

export { router }