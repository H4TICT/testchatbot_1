var express = require('express');
var app = express();
// var router = express.Router();
var mongoose = require('mongoose'); 
var bodyParser = require('body-parser');

var Topic = require('./topic.collection');

mongoose.Promise = global.Promise;

module.exports = function (app) {
  app.post('/topic', (req, res) => {
    Topic.create(req.body, (err, topic) => {
      
        console.log(topic);
        res.send(topic);
      
    });
  });
};

