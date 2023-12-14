const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  tittle: {
    type: String,
    required: [true, 'Please add a tittle'],
  },
  description: String,
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Completed'],
    default: 'Pending',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
