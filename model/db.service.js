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
    .exec()
    .then( function send_UserRequest(user){
        res.json(user);
        console.log(user);
    })
    .catch((err)=>{
        res.send('error: ' + err);
    });
});

module.exports = send_UserRequest(user);






























































































































































