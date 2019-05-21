var express = require('express');
var app = express();
var mongoose = require('mongoose'); 
var bodyParser = require('body-parser');
var router = express.Router();

// var http = require('http');
// var server = http.createServer(app);
// var db = 'mongodb+srv://tuanha1709:Hatuan1997hd@freechatdbtest-uy890.mongodb.net/test?retryWrites=true';
// mongoose.connect(db);

var Conv = require('./conv.collection');

mongoose.Promise = global.Promise;

// app.use(bodyParser.urlencoded({
//   extended: false
// }));

router.get('/', (req, res) =>{
  res.send('Conv works');
});

router.post('/conv', function sendConv(req, res) {
    Conv.create(req.body, (err, conv) => {
      if(err) {     
        res.send('error: ' + err);
      } else {
        console.log(conv);
        res.send(conv);
      }
    });
  });

  module.exports = router;
  // app.set('port', process.env.PORT || 8080);
  // app.set('ip', process.env.IP || "0.0.0.0");

  // server.listen(app.get('port'), app.get('ip'));
