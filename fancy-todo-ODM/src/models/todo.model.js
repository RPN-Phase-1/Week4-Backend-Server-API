const mongoose = require('mongoose')
const { Schema } = mongoose;

const schemaTodo = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    dataUserById: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Todo = mongoose.model('Todo', schemaTodo)

module.exports = {Todo}