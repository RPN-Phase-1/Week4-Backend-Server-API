const mongoose = require('mongoose');
const {Todo} = require('../models/todo.model')
const {User} = require('../models/user.model')

const cretaeTodo = async (title, description, status, dataUserById) => {
    try {
        const result = await Todo.create({
            title, 
            description,
            status,
            dataUserById
        })
        return result
    } catch (error){
        console.log(error)
        throw new Error(error)
    }
}

const getTodo = async () => {
    try {
        const result = await Todo.find().populate('dataUserById')
        return result
    } catch(error){
        console.log(error)
        throw new Error(error)
    }
}

const getTodoById = async (id) => {
    try {
        const result = await Todo.findById(id).select('title description status').populate('dataUserById')
        return result
    } catch(error){
        console.log(error)
        throw new Error(error)
    }
}

const updateTodo = async (id, title, description, status, dataUserById) => {
    try {
        const result = await Todo.updateMany({
            _id: id
        }, {
            title,
            description,
            status,
            dataUserById
        })
        return result
    } catch(error){
        console.log(error)
        throw new Error(error)
    }
}

const deleteTodoById = async (id) => {
    try {
        const result = await Todo.deleteOne({_id: id})
        return result
    } catch(error){
        console.log(error)
        throw new Error(error)
    }
}

module.exports = {cretaeTodo, getTodo, getTodoById, updateTodo, deleteTodoById}