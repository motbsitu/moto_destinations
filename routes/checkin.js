const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/moto.user.js');


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




module.exports = router;
