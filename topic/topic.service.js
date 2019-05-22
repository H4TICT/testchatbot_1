const express = require('express');
// const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Topic = require('./topic.collection');

mongoose.Promise = global.Promise;


// const SendTopic = router.post('/topic', async (req, res) => {
//   try {
//     const topic = await Topic.create(req.body);
//     res.send(topic);
//     console.log('topic: '+topic);
//   }
//   catch (err) {
//     res.status(500).send(err);
//   }
// });


const SendTopic = router.post('/topic', (req, res) => {
  Topic.create(req.body, (err, topic) => {
    if (err) {
      res.send(err);
    } else {
      res.send(topic);
      console.log(topic);
    }
  });
});


module.exports = SendTopic;