var express = require('express');
var app = express();
var mongoose = require('mongoose'); 
var bodyParser = require('body-parser');
var router = express.Router();

var Topic = require('./topic.collection');

mongoose.Promise = global.Promise;



exports.SendTopic = function () {
  app.post('/topic',  (req, res) => {
    Topic.create(req.body, (err, topicname, psid) => {
      if(err) {     
        res.send('error: ' + err);
      } else {
        console.log(topicname);
        res.send(topicname);
        res.send(psid);
      }
    });
  });
};

