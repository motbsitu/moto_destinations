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


//new post route for query
router.post('/query', function(req, res){
  console.log('req.body is what I want', req.body);
  //query parameters in body of search
  var lat = req.body.latitude;
  var long = req.body.logitude;
  var distance = req.body.distance;

  var query = Destination.find({});
console.log('distance', distance);
// console.log('query', query);
  if(distance){
    query = query.where('location').near({center: {type: 'Point', coordinates: [long, lat]},
    maxDistance: distance * 1609.34, spherical: true});
      console.log('query', query);
  }

  query.exec(function(err, destinations){
    if(err){
      res.send(err);
      return;
    }res.json(destinations);
  });

});

module.exports = router;
