const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
require('mongoose-type-email');

const userSchema = new mongoose.Schema({
  username: {type: mongoose.SchemaTypes.Email, required:true},
  password: String
});

// make sure that everytime we save a user, the password gets hashed
userSchema.pre('save', function(done){
  const user = this;

  bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash){
    if (err) {
      console.log('Error hashing password', err);
      return done(new Error('Error hashing password'));
    }

    user.password = hash;
    done();
  });
});


userSchema.methods.comparePassword = function(password) {
  const user = this;

  return new Promise(function(resolve){
    bcrypt.compare(password, user.password, function(err, match){
      if (err) {
        console.log('Error comparing password', err);
        return resolve(false);
      }

      resolve(match);
    });
  });
};


const MotoUser = mongoose.model('MotoUser', userSchema);

module.exports = MotoUser;
