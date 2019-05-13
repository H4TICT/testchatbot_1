'use stric';
var express = require('express');
var app = express();
var mongoose = require('mongoose'); 
var http = require('http');
var bodyParser = require('body-parser');


var server = http.createServer(app);


var db = 'mongodb://localhost:27017/users'

var userRequest = require('../controller/db.collection');

mongoose.Promise = global.Promise;
mongoose.connect(db);
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', (req, res) =>{
    res.send('Welcome to homepage');
});


app.post('/user', function(req, res) {
    userRequest.create(req.body, function send_UserRequest(err, user) {
      if(err) {     
        res.send('error: ' + err);
      } else {
        console.log(user);
        res.send(user);
      }
    });
  });

  app.set('port', process.env.PORT || 5000);
  app.set('ip', process.env.IP || "0.0.0.0");

  server.listen(app.get('port'), app.get('ip'));






























































































































































