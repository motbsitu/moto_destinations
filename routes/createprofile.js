const router = require('express').Router();
const User = require('../models/moto.user');

router.post('/', function(req, res) {
  //console.log('new user profile');
  var user = req.user;
  user.name = req.body.name;
  user.motorcycle =  req.body.motorcycle;
  user.comment = req.body.comment;
  user.usrimg = req.body.usrimg;
  user.save().then(function() {
    req.login(user, function(err){
      if (err) {
        return res.sendStatus(500);
      }
      res.sendStatus(201);
    });

  }).catch(function(err){
    console.log('Error in /register', err);
  
    res.sendStatus(500);
  });
});

module.exports = router;
