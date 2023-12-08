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
  user: {
    type: mongoose.Schema.Types.name,
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
