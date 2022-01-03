import { v4 } from 'uuid';
import { mongoose } from '../database';

const NotificatoinSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    default: v4(),
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
    default: false,
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

export { Notification };
