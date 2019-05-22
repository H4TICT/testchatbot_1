var express = require('express');
// var app = express();
var router = express.Router();
var mongoose = require('mongoose'); 
var bodyParser = require('body-parser');

var Topic = require('./topic.collection');

mongoose.Promise = global.Promise;

// module.exports = function (app) {
  router.post('/topic', (req, res) => {
    Topic.create(req.body, (err, topic) => {
      if(err) {
        res.send(err);
      } else {
        console.log(topic);
        res.send(topic);
      }
    });
  });
// };

module.exports = router;