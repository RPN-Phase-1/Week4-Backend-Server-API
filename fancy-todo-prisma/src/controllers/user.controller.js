const userService = require("../service/user.service")

const createUser = async (req, res) => {
    try {
        const {name, email, phone} = req.body
        const data = await userService.createUser(name, email, phone)
         res.status(201).json({data:data, status :'created', message : 'Succes create User'})
    }catch(err){
        console.log(err)
         res.status(500).json({error : err.message})  
    }
}

const getUser = async (req, res) => {
    try {
        const data = await userService.getUser() 

        if(!data){
             res.status(404).json({status : 'Not Found', message : 'Data is not Found'})
        }else{
             res.status(200).json({data : data, status :'OK', message : 'Succes Get User'})
        }
    }catch(err){
        console.log(err)
         res.status(500).json({error : err.message})  
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await userService.getUserById(id)

        if(!data){
            res.status(404).json({status : 'Not Found', message : 'Data is not Found'})
       }else{
            res.status(200).json({data : data, status :'OK', message : 'Succes Get User By Id'})
       }
    }catch(err){
        console.log(err)
         res.status(500).json({error : err.message})  
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id
        const {name, email, phone} = req.body
        const data = await userService.updateUser(id, name, email, phone)

        if(!data){
            res.status(404).json({status : 'Not Found', message : 'Data is not Found'})
       }else{
            res.status(200).json({data : data, status :'OK', message : 'Succes Update User By Id'})
       }
    }catch(err){
        console.log(err)
         res.status(500).json({error : err.message}) 
    }
}

const deleteUserById = async (req, res) => {
    const id = req.params.id
    const data = await userService.deleteUserById(id)

    if(!data){
        res.status(404).json({status : 'Not Found', message : 'Data is not Found'})
   }else{
        res.status(200).json({data : data, status :'OK', message : 'Succes delete User By Id'})
   }
}

module.exports = {createUser, getUser, getUserById, updateUser, deleteUserById}