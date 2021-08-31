const mongoose = require('../database');
const uuid = require('uuid');

const NotificatoinSchema = new mongoose.Schema({
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
  user_id: {
    type: String,
    requiered: true,
  },
  task_id: {
    type: String,
    requiered: true,
  },
  read: {
    type: Boolean,
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

const Notification = mongoose.model('Notification', NotificatoinSchema);

module.exports = Notification;
