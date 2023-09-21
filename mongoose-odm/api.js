const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const StudentModel = require('./studentSchema');

// Connecting to database
const query = 'mongodb+srv://adyatmafulvian:nolep123@cluster0.dstek2r.mongodb.net/College?retryWrites=true&w=majority'

mongoose.connect(query).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Connection error:', err);
});

router.post('/save', async (req, res) => {
    try {
        const { StudentId, Name, Roll, Birthday } = req.body
        const response = await StudentModel.create({ StudentId, Name, Roll, Birthday })

        res.status(200).send({
            status: 200,
            message: "Create Student Success",
            data: response,
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: "Internal Server Error",
            error: error.message,
        });
    }
});

router.get('/findall', async (req, res) => {
    try {
        const response = await StudentModel.find();

        res.status(200).send({
            status: 200,
            message: "Get Students Success",
            data: response,
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: "Internal Server Error",
            error: error.message,
        });
    }
});

router.get('/findfirst', async (req, res) => {
    try {
        const { id } = req.body
        const response = await StudentModel.findOne({ StudentId: id })

        res.status(200).send({
            status: 200,
            message: "Get Student Success",
            data: response,
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: "Internal Server Error",
            error: error.message,
        });
    }
});

router.post('/delete', async (req, res) => {
    try {
        const { id } = req.body
        const response = await StudentModel.findByIdAndDelete(id)

        res.status(200).send({
            status: 200,
            message: "Delete Student Success",
            data: response,
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: "Internal Server Error",
            error: error.message,
        });
    }
});

router.post('/update', async (req, res) => {
    try {
        const { id, Name } = req.body
        const response = await StudentModel.findByIdAndUpdate(id, { Name }, { new: true })

        res.status(200).send({
            status: 200,
            message: "Update Student Success",
            data: response,
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: "Internal Server Error",
            error: error.message,
        });
    }
});

router.get('/latest', async (req, res) => {
    try {
        const response = await StudentModel.find({}).sort({ Birthday: -1 }).limit(1)

        res.status(200).send({
            status: 200,
            message: "Get Student Latest Success",
            data: response,
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: "Internal Server Error",
            error: error.message,
        });
    }
})

module.exports = router;