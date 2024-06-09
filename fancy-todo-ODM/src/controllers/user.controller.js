const serviceUser = require('../service/user.service')

const createUser = async (req, res) => {
    try {
        const {name, email, phone} = req.body
        const data = await serviceUser.createUser(name, email, phone)
        res.status(201).json({data:data, status :'created', message : 'Succes create User'})
    } catch (error){
        console.log(error)
         res.status(500).json({error : error.message})  
    }
}

const getUser = async (req, res) => {
    try {
        const data = await serviceUser.getUser()

        if(!data){
            res.status(404).json({status : 'Not Found', message : 'Data is not Found'})
       }else{
            res.status(200).json({data : data, status :'OK', message : 'Succes Get User'})
       }
    } catch(error){
        console.log(error)
         res.status(500).json({error : error.message})  
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await serviceUser.getUserById(id)

        if(!data){
            res.status(404).json({status : 'Not Found', message : 'Data is not Found'})
       }else{
            res.status(200).json({data : data, status :'OK', message : 'Succes Get User BY Id'})
       }
    } catch(error){
        console.log(error)
         res.status(500).json({error : error.message}) 
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id
        const {name, email, phone} = req.body
        const data = await serviceUser.updateUser(id, name, email, phone)

        if(!data){
            res.status(404).json({status : 'Not Found', message : 'Data is not Found'})
       }else{
            res.status(200).json({data : data, status :'OK', message : 'Succes Update User'})
       }
    } catch(error){
        console.log(error)
         res.status(500).json({error : error.message}) 
    }
}

const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await serviceUser.deleteUserById(id)

        if(!data){
            res.status(404).json({status : 'Not Found', message : 'Data is not Found'})
       }else{
            res.status(200).json({data : data, status :'OK', message : 'Succes deleted User'})
       }
    } catch(error){
        console.log(error)
         res.status(500).json({error : error.message}) 
    }
}

module.exports = {createUser, getUser, getUserById, updateUser, deleteUserById}