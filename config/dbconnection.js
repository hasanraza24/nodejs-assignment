const config = require('../config/config');
var mongoose = require('mongoose');

const mongoUrl = 'mongodb://' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.database;

// console.log('Mongo U', mongoUrl);

mongoose.connect(mongoUrl, { useNewUrlParser: true }, (err) => {
  console.log('error', err);
  console.log('Database connected');
});

mongoose.Promise = global.Promise;

module.exports = mongoose;