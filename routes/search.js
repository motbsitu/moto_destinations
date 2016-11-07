const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/moto.user.js');
const Destination = require('../models/moto.destination.js');

//
router.get('/moto.destination', function(req, res){

var lat = req.query.latitude;
var long = req.query.longitude;
var distance = req.query.distance;


      //query all destinations by distance
  var query = Destination.find({});
  if(distance){
    query = query.where('location').near({center: {type: 'Point', coordinates: [long, lat]},
    maxDistance: distance * 1609.34, spherical: true});
  }

  query.exec(function(err, destinations){
    if(err){
      res.send(err);
      return;
    }return res.json(destinations);
  });

  });



module.exports = router;
