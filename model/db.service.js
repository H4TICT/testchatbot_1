var mongoose = require('mongoose');
var express = require('express');
var app = express();
var UserRequest = require('../controller/db.collection');

var db = 'mongodb://localhost:27017/users'

mongoose.Promise = global.Promise;
mongoose.connect(db);

app.post('/', (req, res) => {
    UserRequest.create(req.body, function send_userReqest(err, user){
        if(err) {
            res.send('error: ' + err);
        } else {
            console.log(user);
            res.send(user);
        }
    });
});

module.exports = send_userReqest(err,user);





























































































































































