const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/moto.user.js');


router.get('/moto.users', function(req,res){

    console.log('req. users',req.user);

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
// db.motousers.update({_id: {req.params.id}}, {$set: {comments: req.body.comments}})
  User.findById(req.params.id, function(err, user){
    if (err){
      res.sendStatus(500);
      return;
    }
    console.log('req body', req.body.comment);
    user.comment = req.body.comment;
    //add more updates here
    user.save(function (err, updatedUser){
      if (err){
        res.sendStatus(500);
        return;
      }res.send(updatedUser);
    });

  });
});



module.exports = router;
