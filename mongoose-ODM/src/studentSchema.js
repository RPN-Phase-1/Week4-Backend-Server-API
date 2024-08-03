const mongoose = require('mongoose')
const crypto = require('crypto')

const studentSchema = new mongoose.Schema({
    StudentId: {
        type: String,
        unique: true,
        default: () => crypto.randomUUID()
    },
    Name: String,
    Roll: Number,
    Birthday: String,
    Address: String
})

const Students = mongoose.model("Students",studentSchema)

module.exports = Students