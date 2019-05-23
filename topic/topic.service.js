const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Topic = require('./topic.collection');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

mongoose.Promise = global.Promise;


app.get('/', (req, res) => {
  res.send("This is Topic Page");
});

// const SendTopic = 
app.post('/', async (req, res) => {
  try {
    const topic = await Topic.create(req.body);
    res.send(topic);
    cosole.log('topic: '+ topic);
  }
  catch (err) {
    res.status(500).send(err);
  } 
});

module.exports = app;
