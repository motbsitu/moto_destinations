const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
require('mongoose-type-email');

const userSchema = new mongoose.Schema({
  email: {type: mongoose.SchemaTypes.Email, required:true},
  password: String,
  name: String,
  motorcycle: String,
  comment: String,
  userimg: { data: Buffer, contentType: String }

});

// everytime save a user/modify password, the password gets hashed
userSchema.pre('save', function(done){
  const user = this;
  if (user.isModified('password')) {
    bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash){
      if (err) {
        console.log('Error hashing password', err);
        return done(new Error('Error hashing password'));
      }
      user.password = hash;
      done();
    });
  } else {
    done();
  }
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
