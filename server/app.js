const http = require('http');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const express = require('express');
const app = express();

const server = http.createServer(app);
const api = require('./api/index');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const User = require('./api/user/user.collection');
// const db = 'mongodb://localhost:27017/freechat';
const db = 'mongodb+srv://tuanha1709:Hatuan1997hd@freechatdbtest-uy890.mongodb.net/test?retryWrites=true';
mongoose.Promise = global.Promise;
mongoose.connect(db);

api.register(app);

app.set('port', process.env.PORT || 5000);
app.set('ip', process.env.IP || "0.0.0.0");

server.listen(app.get('port'), app.get('ip'), function() {
  console.log("Chat bot server listening at %s:%d ", app.get('ip'), app.get('port'));
});

module.exports = app;