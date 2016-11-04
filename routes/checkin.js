const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/moto.user.js');
const Destination = require('../models/moto.destination.js');


router.get('/moto.users', function(req,res){
  if(req.isAuthenticated()){
    var motouser = {
      _id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      motorcycle: req.user.motorcycle,
      comment: req.user.comment,
      userimg: req.user.userimg
  }
    return res.send(motouser);

}
  res.sendStatus(401);
  console.log('checkin router working');
});

router.post('/', function(req,res){
  console.log('req.body',req.body);

  var destination = new Destination(req.body);
  destination.userId = req.user.id;

  destination.save().then(function(destination){
      console.log('newly created destination', destination);
      res.sendStatus(201);
    }).catch(function(err){
      console.log('error in post destination', err);
      res.sendStatus(500);
  });
});



module.exports = router;
