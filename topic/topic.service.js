const express = require('express');
const app = express();
// const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Topic = require('./topic.collection');

mongoose.Promise = global.Promise;

// module.exports = function (app) {
const SendTopic = app.post('/topic', async (req, res) => {
  try {
    console.log(req.body);
    const topic = await Topic.create(req.body);
    res.send(topic);
  }
  catch (err) {
    res.status(500).send(err);
  }
  // Topic.create(req.body, (err, topic) => {
  //   if (err) {
  //     res.send(err);
  //   } else {
  //     console.log(topic);
  //     res.send(topic);
  //   }
  // });
});
// };

module.exports = SendTopic;