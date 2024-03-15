const prisma = require("../../prisma/client")

const createTodos = async (title, description, status, userId) => {
    try {
        const result = await prisma.todo.create({
            data: {
                title,
                description,
                status,
                userId
            }
        })
        return result
    }catch(err){
        console.log(err)
        throw err
    }
}

const getTodos = async () => {
    try {
        const result = await prisma.todo.findMany()
        return result
    }catch(err){
        console.log(err)
        throw err
    }
}

const getTodosById = async (id) => {
    try {
        const result = await prisma.todo.findUnique({
            where: {
                id
            }
        }) 
        return result
    }catch(err){
        console.log(err)
        throw err
    }
} 

const updateTodos = async (id, title, description, status, userId) => {
    try {
        const result = await prisma.todo.update({
            data: {
                title,
                description,
                status,
                userId
            },
            where: {
                id
            }
        })
        return result
    }catch(err){
        console.log(err)
        throw err
    }
}

const deleteTodos = async (id) => {
    try {
        const result = await prisma.todo.delete({
            where: {
                id
            }
        })
        return result
    }catch(err){
        console.log(err)
        throw err
    }
}

module.exports = {createTodos, getTodos, getTodosById, updateTodos, deleteTodos}