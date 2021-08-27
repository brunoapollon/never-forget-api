const mongoose = require('../database');
const uuid = require('uuid');

const TaskSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    default: uuid.v4(),
  },
  titlte: {
    type: String,
    requiered: true,
  },
  description: {
    type: String,
    requiered: true,
  },
  deadline: {
    type: Date,
    requiered: true,
  },
  user_id: {
    type: String,
    requiered: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
