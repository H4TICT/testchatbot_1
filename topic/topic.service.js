var express = require('express');
var app = express();
var mongoose = require('mongoose'); 
var bodyParser = require('body-parser');
// var router = express.Router();

var Topic = require('./topic.collection');

// var db = 'mongodb://localhost:27017/freechat'
// var http = require('http');
// var server = http.createServer(app);
// mongoose.connect(db);


mongoose.Promise = global.Promise;
// mongoose.connect(db);

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
//   extended: true
// }));

app.get('/', (req, res) =>{
    res.send('Welcome to homepage');
});

exports.SendTopic = function (app) {
  app.post('/topic', (req, res) => {
    Topic.create(req.body, (topic) => {
      res.send(topic); 
    });
  });
};



// app.set('port', process.env.PORT || 8080);
//   app.set('ip', process.env.IP || "0.0.0.0");

//   server.listen(app.get('port'), app.get('ip'));
