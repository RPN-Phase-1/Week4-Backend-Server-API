const mongoose = require('mongoose')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number
    // _id:{
    //     type: String,
    //     unique: true,
    //     default: () => crypto.randomUUID()
    // },
    // name: {
    //     type: String,
    //     required: true,
    //   },
    //   email: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //   },
    //   phone: {
    //     type: Number,
    //     required: true,
    //     unique: true,
    //   },
})

const User = mongoose.model("User", userSchema);

module.exports = User