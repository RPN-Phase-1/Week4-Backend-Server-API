const todoService = require("../service/todo.service")

const createTodos = async (req, res) => {
    try {
        const {title, description, status, userId} = req.body
        const data = await todoService.createTodos(title, description,status, userId)
         res.status(201).json({data :data, status :'created', message : 'Succes create Todo'})
    }catch(err){
        console.log(err)
         res.status(500).json({error : err.message})  
    }
}

const getTodos = async (req, res) => {
    try {
        const data = await todoService.getTodos()

        if(!data){
            res.status(404).json({status : 'Not Found', message : 'Data is not Found'})
       }else{
            res.status(200).json({data : data, status :'OK', message : 'Succes Get Todo'})
       }
    }catch(err){
        console.log(err)
         res.status(500).json({error : err.message})  
    }
}

const getTodosById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await todoService.getTodosById(id)
    
        if(!data){
            res.status(404).json({status : 'Not Found', message : 'Data is not Found'})
       }else{
            res.status(200).json({data : data, status :'OK', message : 'Succes Get Todo By Id'})
       }
    }catch(err){
        console.log(err)
        res.status(500).json({error : err.message})  
    }
}

const updateTodos = async (req, res) => {
    try {
        const id = req.params.id
        const {title, description, status, userId} = req.body
        const data = await todoService.updateTodos(id, title, description, status, userId)

        if(!data){
            res.status(404).json({status : 'Not Found', message : 'Data is not Found'})
       }else{
            res.status(200).json({data : data, status :'OK', message : 'Succes update Todo'})
       }
    }catch(err){
        console.log(err)
        res.status(500).json({error : err.message})  
    }
}

const deleteTodos = async (req, res) => {
    try {
        const id = req.params.id
        const data = await todoService.deleteTodos(id)

        if(!data){
            res.status(404).json({status : 'Not Found', message : 'Data is not Found'})
       }else{
            res.status(200).json({data : data, status :'OK', message : 'Succes delete Todo'})
       }
    }catch(err){
        console.log(err)
        res.status(500).json({error : err.message})  
    }
}

module.exports = {createTodos, getTodos, getTodosById, updateTodos, deleteTodos}