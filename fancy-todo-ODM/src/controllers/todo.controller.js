const serviceTodo = require('../service/todo.service')

const createTodo = async (req, res) => {
    try {
        const {title, description, status, dataUserById} = req.body
        const data = await serviceTodo.cretaeTodo(title, description, status, dataUserById)
        res.status(201).json({data:data, status :'created', message : 'Succes create Todo'})
    } catch(error){
        console.log(error)
         res.status(500).json({error : error.message})  
    }
}

const getTodo = async (req, res) => {
    try {
        const data = await serviceTodo.getTodo()

        if(!data){
            res.status(404).json({status : 'Not Found', message : 'Data is not Found'})
       }else{
            res.status(200).json({data : data, status :'OK', message : 'Succes Get Todo'})
       }
    } catch(error) {
        console.log(error)
         res.status(500).json({error : error.message})  
    }
}

const getTodoById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await serviceTodo.getTodoById(id)

        if(!data){
            res.status(404).json({status : 'Not Found', message : 'Data is not Found'})
       }else{
            res.status(200).json({data : data, status :'OK', message : 'Succes Get Todo By Id'})
       }
    } catch(error){
        console.log(error)
         res.status(500).json({error : error.message})  
    }
}

const updateTodo = async (req, res) => {
    try {
        const id = req.params.id
        const {title, description, status, dataUserById} = req.body
        const data = await serviceTodo.updateTodo(id, title, description, status, dataUserById)

        if(!data){
            res.status(404).json({status : 'Not Found', message : 'Data is not Found'})
       }else{
            res.status(200).json({data : data, status :'OK', message : 'Succes Update Todo '})
       }
    } catch(error){
        console.log(error)
         res.status(500).json({error : error.message})  
    }
}

const deleteTodoById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await serviceTodo.deleteTodoById(id)

        if(!data){
            res.status(404).json({status : 'Not Found', message : 'Data is not Found'})
       }else{
            res.status(200).json({data : data, status :'OK', message : 'Succes deleted Todo '})
       }
    } catch(error){
        console.log(error)
         res.status(500).json({error : error.message})  
    }
}

module.exports = {createTodo, getTodo, getTodoById, updateTodo, deleteTodoById}