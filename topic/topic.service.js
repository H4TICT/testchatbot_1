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

// send Topic route
app.post('/topic', async (req, res) => {
  try {
    const topic = await Topic.create(req.body);
    res.send(topic);
    // console.log('topic: '+ topic);
  }
  catch (err) {
    res.status(500).send(err);
  } 
});

//GET all topic
app.get('/topics', async (req, res) => {
  try {
    const getTopics = await Topic.find({});
    res.json(getTopics);
  }
  catch (err) {
    res.status(500).send(err);
  }
})


module.exports = app;
