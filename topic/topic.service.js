var express = require('express');
var app = express();
var mongoose = require('mongoose'); 
var bodyParser = require('body-parser');

// var http = require('http');
// var server = http.createServer(app);
var db = 'mongodb://localhost:27017/freechat'

var Topic = require('./topic.collection');

mongoose.Promise = global.Promise;
mongoose.connect(db);
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) =>{
    res.send('Welcome to homepage');
});

exports.SendTopic = function (app) {
  app.post('/',  (req, res) => {
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



  // app.set('port', process.env.PORT || 8080);
  // app.set('ip', process.env.IP || "0.0.0.0");

  // server.listen(app.get('port'), app.get('ip'));
