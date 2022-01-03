import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/never-forget');

mongoose.Promise = global.Promise;

export { mongoose };
