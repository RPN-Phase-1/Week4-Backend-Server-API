let prisma = require("../../prisma/client")

async function getData(){
    let result = await prisma.User.findMany()
    return result
}

async function createData(name,phone, email){
    let newData = await prisma.User.create({
        data: {
            name: name,
            phone: phone,
            email: email
        }
    })
    return newData
}

async function updateData(id, name, phone, email){
    let updatedData = await prisma.User.update({
        where: {id: id},
        data:{
            name: name,
            phone: phone,
            email: email
        }
    })
    return updateData
}

async function findData(id){
    let result = await prisma.User.findUnique({
        where: {id:id}
    })
    return result
}

async function deleteData(id){
    let deletedData = await prisma.User.delete({
        where: {id:id}
    })
    return deletedData
}

module.exports = {findData, deleteData, getData, updateData, createData}