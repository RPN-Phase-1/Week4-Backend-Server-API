const todoService = require('../service/todo-service')

const getTodos = async(req,res) => {
    try{
        const result = await todoService.getTodos();
        res.status(200).json({
            status: 200,
            message: "Success get Todos",
            data: result
        })
    }catch(err){
        res.status(500).json({
            status: 500,
            message: "Failed Get Todos",
            error: err.message
        })
    }
}

const getTodo = async(req,res) => {
    try{
        const result = await todoService.getTodo(req.params.id)
        res.status(200).json({
            status:200,
            message: "Success get Todo",
            data:result
        })
    }catch(err){
        res.status(500).json({
            status:200,
            message: "Failed Get Todos",
            error: err.message
        })
    }
}

const createTodo = async(req,res) =>{
    try{
        const {title,description,status,userId} = req.body;

        const result = await todoService.createTodo(title,description,status,userId)
        res.status(200).json({
            status: 200,
            message: "Success Create Todo",
            data: result
        })
    }catch(err){
        res.status(500).json({
            status: 500,
            message: "Failed Create Todo",
            error:err.message
        })
    }
}

const updateTodo = async(req,res) => {
    try{
        const {title,description,status,userId} = req.body;
        const todoId = req.params.id;

        const result = await todoService.updateTodo(title,description,status,userId,todoId)
        res.status(200).json({
            status: 200,
            message: "Success Update Todo",
            data: result
        })
    }catch(err){
        res.status(500).json({
            status: 500,
            message: "Failed Update Todo",
            error: err.message
        })
    }
}

const deleteTodo = async(req,res) =>{
    try{
        const result = await todoService.deleteTodo(req.params.id)
        res.status(200).json({
            status: 200,
            message: "Success delete Todo",
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

module.exports = {getTodos, getTodo, createTodo, updateTodo, deleteTodo}