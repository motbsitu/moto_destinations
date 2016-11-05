const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/moto.user.js');
const Destination = require('../models/moto.destination.js');

router.get('/moto.destination', function(req,res){
      //query all destinations
  var query = Destination.find({});
  query.exec(function(err, destinations){
    if(err){
      res.send(err);
      return;
    } res.json(destinations);
  });
});

module.exports = router;
