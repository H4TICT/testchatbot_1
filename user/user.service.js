var express = require('express');
var app = express();
var mongoose = require('mongoose'); 
var bodyParser = require('body-parser');
var router = express.Router();
// var http = require('http');
// var server = http.createServer(app);
// var db = 'mongodb+srv://tuanha1709:Hatuan1997hd@freechatdbtest-uy890.mongodb.net/test?retryWrites=true';
// mongoose.connect(db);


var User = require('./user.collection');

mongoose.Promise = global.Promise;
// app.use(bodyParser.urlencoded({
//   extended: false
// }));

router.get('/', (req, res) =>{
  res.send('Welcome to homepage');
});


exports.SendUser = function(){
  router.post('/user', function(req, res) {
    User.create(req.body, function(err, user) {
      if(err) {
        res.send(err);
      } else {
        console.log(user);
        res.json(user);
      }
    });
  });
};


module.exports = router;
  // app.set('port', process.env.PORT || 8080);
  // app.set('ip', process.env.IP || "0.0.0.0");

  // server.listen(app.get('port'), app.get('ip'));
