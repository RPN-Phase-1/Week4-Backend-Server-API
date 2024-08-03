const userService = require('../service/user-service')

const getUsers = async(req,res) => {
    try{
        const result = await userService.getUsers();
        res.status(200).json({
            status: 200,
            message: "Success get Users",
            data: result
        })
    }catch(err){
        res.status(500).json({
            status: 500,
            message: "Failed Get Users",
            error: err.message
        })
    }
}

const getUser = async(req,res) => {
    try{
        const result = await userService.getUser(req.params.id)
        res.status(200).json({
            status:200,
            message: "Success get User",
            data:result
        })
    }catch(err){
        res.status(500).json({
            status:200,
            message: "Failed Get Users",
            error: err.message
        })
    }
}

const createUser = async(req,res) =>{
    try{
        const {name,email,phone} = req.body;

        const result = await userService.createUser(name,email,phone)
        res.status(200).json({
            status: 200,
            message: "Success Create User",
            data: result
        })
    }catch(err){
        res.status(500).json({
            status: 500,
            message: "Failed Create User",
            error:err.message
        })
    }
}

const updateUser = async(req,res) => {
    try{
        const {name,email,phone} = req.body;
        const userId = req.params.id;

        const result = await userService.updateUser(name,email,phone,userId)
        res.status(200).json({
            status: 200,
            message: "Success Update User",
            data: result
        })
    }catch(err){
        res.status(500).json({
            status: 500,
            message: "Failed Update User",
            error: err.message
        })
    }
}

const deleteUser = async(req,res) =>{
    try{
        const result = await userService.deleteUser(req.params.id)
        res.status(200).json({
            status: 200,
            message: "Success delete User",
            data:result
        })
    }catch(err){
        res.status(500).json({
            status: 500,
            message: "Failed Delete Data",
            error: err.message
        })
    }
}

module.exports = {getUsers, getUser, createUser, updateUser, deleteUser}