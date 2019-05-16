var express = require('express');
var app = express();
var mongoose = require('mongoose'); 
var bodyParser = require('body-parser');

// var http = require('http');
// var server = http.createServer(app);
// var db = 'mongodb://localhost:27017/freechat'

var User = require('./user.collection');

mongoose.Promise = global.Promise;
mongoose.connect(db);
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', (req, res) =>{
    res.send('Welcome to homepage');
});

exports.SendUser = function (app) {
  app.post('/user',(req, res) => {
    User.create(req.body, (err, user) => {
      if(err) {     
        res.send('error: ' + err);
      } else {
        console.log(user);
        res.send(user);
      }
    });
  });
};

  // app.set('port', process.env.PORT || 8080);
  // app.set('ip', process.env.IP || "0.0.0.0");

  // server.listen(app.get('port'), app.get('ip'));
