var express = require('express');
// var app = express();
var router = express.Router();
var mongoose = require('mongoose'); 
var bodyParser = require('body-parser');

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

module.exports = router;

// app.set('port', process.env.PORT || 8080);
//   app.set('ip', process.env.IP || "0.0.0.0");

//   server.listen(app.get('port'), app.get('ip'));
