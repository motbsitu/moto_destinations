const mongoose = require('mongoose');

var dbURL = process.env.MONGODB_URI || 'mongodb://localhost/motoDestinations';

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
