const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Conv = require('./conv.collection');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

mongoose.Promise = global.Promise;

app.get('/', (req, res) => {
  res.send("This is Conversation Page");
});

// send Conversation route
app.post('/', async (req, res) => {
  try {
    const conv = await Conv.create(req.body);
    res.send(conv);
    cosole.log('conv: '+ conv);
  }
  catch (err) {
    res.status(500).send(err);
  } 
});

module.exports = app;
