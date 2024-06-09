const mongoose = require('mongoose')
const { Schema } = mongoose;

const schemaUser = new Schema({
    name: {
        type: String,
        required: true // required = wajib di isi
    }, 
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: Number,
        unique: true,
        required: true
    }, 
    // todos: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Todo' // Merujuk pada model Todo
    // }]
    
})

const User = mongoose.model('User', schemaUser)

module.exports = {User}