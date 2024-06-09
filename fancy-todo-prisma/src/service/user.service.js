const prisma = require("../../prisma/client")

const createUser = async (name, email, phone) => {
    try {
        const result = await prisma.user.create({
            data: {
                name,
                email,
                phone
            }
        })
        return result
    }catch(err){
        console.log(err)
        throw err
    }
}

const getUser = async () => {
    try {
        const result = await prisma.user.findMany()
        return result
    }catch(err){
        console.log(err)
        throw err
    }
}

const getUserById = async (id) => {
    try {
        const result = await prisma.user.findUnique({
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

const updateUser = async (id, name, email, phone) => {
    try {
        const result = await prisma.user.update({
            data: {
                name,
                email,
                phone
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

const deleteUserById = async (id) => {
    try {
        const result = await prisma.user.delete({
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


module.exports = {createUser, getUser, getUserById, updateUser, deleteUserById}