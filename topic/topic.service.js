var express = require('express');
var app = express();
var mongoose = require('mongoose'); 
var bodyParser = require('body-parser');

var http = require('http');
var server = http.createServer(app);
var db = 'mongodb://localhost:27017/freechat'

var Topic = require('./topic.collection');

mongoose.Promise = global.Promise;
mongoose.connect(db);
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', (req, res) =>{
    res.send('Welcome to homepage');
});


app.post('/topic', function sendTopic(req, res) {
  Topic.create(req.body, (err, topic) => {
    if(err) {     
      res.send('error: ' + err);
    } else {
      console.log(topic);
      res.send(topic);
    }
  });
});



  app.set('port', process.env.PORT || 8080);
  app.set('ip', process.env.IP || "0.0.0.0");

  server.listen(app.get('port'), app.get('ip'));
