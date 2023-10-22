let prisma = require("../../prisma/client")

async function createTodo(title, description, status, userId){
    let result = await prisma.Todo.create({
        data:{
            title: title,
            description: description,
            status: status,
            userId: userId
        }
    });
    return result;
}

async function getTodo(){
    let result = await prisma.Todo.findMany()
    return result
}

async function updateTodo(id,title, desc, status, userId){
    let updatedData = await prisma.Todo.update({
        where:{id:id},
        data:{
            title:title,
            description:desc,
            status:status,
            userId:userId
        }
    })
    return updatedData
}

async function deleteTodo(id){
    let deletedData = await prisma.Todo.delete({
        where: {id:id}
    })
    return deletedData
}

async function findTodo(id){
    let data = await prisma.Todo.findUnique({
        where: {id:id}
    })

    return data
}

module.exports = {findTodo, updateTodo, createTodo,deleteTodo,getTodo}