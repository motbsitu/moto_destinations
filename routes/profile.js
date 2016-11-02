const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/moto.user.js');


router.get('/moto.users', function(req,res){

    var motouser = {
      _id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      motorcycle: req.user.motorcycle,
      comment: req.user.comment,
      userimg: req.user.userimg
  }
    res.send(motouser);

  // console.log('profile router working');
});

router.put('/:id', function(req,res){
  User.findById(req.params.id, function(err, user){
    if (err){
      res.sendStatus(500);
      return;
    }
    user.comment = req.body.comment;
    user.name = req.body.name;
    user.motorcycle = req.body.motorcycle;
    user.email = req.body.email;
    user.save(function (err, updatedUser){
      if (err){
        res.sendStatus(500);
        return;
      }res.send(updatedUser);
    });

  });
});



module.exports = router;
