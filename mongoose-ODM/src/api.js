const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const StudentModel = require('./studentSchema');
 
// Connecting to database
const query = 'mongodb+srv://punisherhc:2aFpLHgzYJ2XOrLw@cluster0.3jmm1sp.mongodb.net/?retryWrites=true&w=majority'
 
const db = (query);
mongoose.Promise = global.Promise;
 
mongoose.connect(db)

router.post('/students', async(req,res) =>{
    try{
        const {Name, Roll, Birthday, Address} = req.body
        const student = await StudentModel.create({Name, Roll, Birthday, Address})
        res.status(200).json({
            status: 200,
            message: "Success Create Data",
            data: student
        })
    }catch(err){
        res.status(500).json({
            status:500,
            message: "Failed Create data",
            error: err.message
        })
    }
})

router.get('/students', async(req,res) =>{
    try{
        const student = await StudentModel.find()
        res.status(200).json({
            status: 200,
            message: "Success Get Students",
            data: student
        })
    }catch(err){
        res.status(500).json({
            status:500,
            message: "Failed Get data",
            error: err.message
        })
    }
})

router.get('/student/:id', async(req,res) => {
    try{
        const student = await StudentModel.findById(req.params.id)
        res.status(200).json({
            status: 200,
            message: "Success get Student",
            data: student
        })
    }catch(err){
        res.status(500).json({
            status:500,
            message: "Failed get Student",
            error: err.message
        })
    }
})

router.put('/students/:id', async(req,res) =>{
    try{
        const {Name, Roll, Birthday, Address} = req.body
        const id = req.params.id
        const student = await StudentModel.findByIdAndUpdate(id,{Name, Roll, Birthday, Address})
        res.status(200).json({
            status:200,
            message: "Success Update data",
            data: student
        })
    }catch(err){
        res.status(500).json({
            status: 500,
            message: "Failed Update Data",
            error: err.message
        })
    }
})

router.delete('/students/:id', async(req,res) => {
    try{
        const student = await StudentModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: 200,
            message: "Success Delete Data",
            data: student
        })
    }catch(err){
        res.status(500).json({
            status: 500,
            message: "Failed Delete Data",
            error: err.message
        })
    }
})
 
module.exports = router;