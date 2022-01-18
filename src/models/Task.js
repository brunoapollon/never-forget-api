import { mongoose } from '../database';

const TaskSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    indexes: true,
  },
  title: {
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
  status: {
    type: String,
    requiered: true,
  },
  finished: {
    type: Boolean,
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

const Task = mongoose.model('Task', TaskSchema);

export { Task };
