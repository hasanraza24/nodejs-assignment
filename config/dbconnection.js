const config = require('../config/config');
var mongoose = require('mongoose');

const mongoUrl = config.mongo.url

// console.log('Mongo U', mongoUrl);

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  console.log('error', err);
  console.log('Database connected');
});

mongoose.Promise = global.Promise;

module.exports = mongoose;