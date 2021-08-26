const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/never-forget');

mongoose.Promise = global.Promise;

module.exports = mongoose;
