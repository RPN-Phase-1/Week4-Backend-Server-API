import { prisma } from '../../prisma/client.js'

const getUsers = async () => {
    const response = await prisma.user.findMany()

    return response
}

const getUser = async ({ id }) => {
    const response = await prisma.user.findUnique({
        where: { id }
    })

    return response
}

const getUserTodos = async ({ id }) => {
    const response = await prisma.user.findUnique({
        where: { id },
        include: {
            todos: true
        }
    })

    return response
}

const createUser = async ({ name, email, phone }) => {
    const response = await prisma.user.create({
        data: {
            name,
            email,
            phone
        }
    })

    return response
}

const updateUser = async ({ id, name, email, phone }) => {
    const response = await prisma.user.update({
        where: { id },
        data: {
            name,
            email,
            phone,
        }
    })

    return response
}

const deleteUser = async ({ id }) => {
    const response = await prisma.user.delete({
        where: { id }
    })

    return response
}

export {
    getUsers,
    getUser,
    getUserTodos,
    createUser,
    updateUser,
    deleteUser,
}