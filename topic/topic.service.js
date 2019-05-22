var express = require('express');
var app = express();
// var router = express.Router();
var mongoose = require('mongoose'); 
var bodyParser = require('body-parser');

var Topic = require('./topic.collection');

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

module.exports = function (app) {
  app.post('/topic', (req, res) => {
    Topic.create(req.body, (err, topic) => {
      if(err) {
        res.send(err);
      } else {
        console.log(topic);
        res.send(topic);
      }
    });
  });
};

