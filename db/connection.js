const mongoose = require('mongoose');

var dbURL = process.env.MONGOD_URI || 'mongodb://localhost/rho';

exports.connect = function () {
  mongoose.connect(dbURL);

  var db = mongoose.connection;
  db.on('error', function(error){
    console.log('error connecting', error);
  });

  db.once('open', function(){
    console.log('connected to mongo');
  });
};
