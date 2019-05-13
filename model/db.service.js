var mongoose = require('mongoose');
var express = require('express');
var app = express();
var UserRequest = require('../controller/db.collection');

var db = 'mongodb://localhost:27017/users'

mongoose.Promise = global.Promise;
mongoose.connect(db);

app.post('/', (req, res) => {
    UserRequest.findOne({
        _id: req.params.id
    })
    .exec(function send_UserRequest(err, user){
        if(err){
            res.send('error: ' + err);
        } else {
            console.log(user);
            res.json(user);
        }
    });
});

module.exports = send_UserRequest(err, user);






























































































































































