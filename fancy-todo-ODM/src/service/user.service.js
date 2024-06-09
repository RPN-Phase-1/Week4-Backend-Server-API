const mongoose = require('mongoose');
const { User } = require('../models/user.model')
const {Todo} = require('../models/todo.model')

const createUser = async (name, email, phone ) => {
    try {
        const result = await User.create({name, email, phone})
        return result
    } catch(error){
        console.log(error)
        throw new Error(error)
    }
}

const getUser = async () => {
    try {
        const result = await User.find()
        return result
    } catch(error){
        console.log(error)
        throw new Error(error)
    }
}

const getUserById = async (id) => {
    try {
        const result = await User.findById(id).select('name email phone')   
        return result
    } catch(error){
        console.log(error)
        throw new Error(error)
    }
}

const updateUser = async (id, name, email, phone) => {
    try {
        const result = await User.updateMany({
            _id: id
        }, {
            name,
            email,
            phone
        })
        return result
    } catch(error){
        console.log(error)
        throw new Error(error)
    }
}

const deleteUserById = async (id) => {
    try {
        const result = await User.deleteMany({_id: id})
        return result
    } catch(error){
        console.log(error)
        throw new Error(error) 
    }
}

module.exports = {createUser, getUser, getUserById, updateUser, deleteUserById}