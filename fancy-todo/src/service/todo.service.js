import { prisma } from '../../prisma/client.js'

const getTodos = async () => {
    const response = await prisma.todo.findMany()

    return response
}

const getTodo = async ({ id }) => {
    const response = await prisma.todo.findUnique({
        where: { id }
    })

    return response
}

const createTodo = async ({ title, description, status, userId }) => {
    const response = await prisma.todo.create({
        data: {
            title,
            description,
            status,
            userId
        }
    })

    return response
}

const updateTodo = async ({ id, title, description, status, userId }) => {
    const response = await prisma.todo.update({
        where: { id },
        data: {
            title,
            description,
            status,
            userId,
        }
    })

    return response
}

const deleteTodo = async ({ id }) => {
    const response = await prisma.todo.delete({
        where: { id }
    })

    return response
}

export {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo,
}