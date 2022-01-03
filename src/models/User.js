import { v4 } from 'uuid';
import { mongoose } from '../database';

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    default: v4(),
  },
  name: {
    type: String,
    requiered: true,
  },
  email: {
    type: String,
    requiered: true,
    unique: true,
  },
  password: {
    type: String,
    requiered: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model('User', UserSchema);

export { User };
