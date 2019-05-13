var mongoose = require('mongoose');
var express = require('express');
var app = express();
var UserRequest = require('../controller/db.collection');

var db = 'mongodb://localhost:27017/users'

mongoose.Promise = global.Promise;
mongoose.connect(db);

function send_UserRequest(){
    app.post('/user', (req, res) => {
        UserRequest.findOne({
            _id: req.params.id
        })
        .exec()
        .then((user) => {
            console.log(user);
            res.json(user);
        })
        .catch((err) => {
            res.send('error: ' + err);
        });
    });
};

module.exports = send_UserRequest;


























































































































































