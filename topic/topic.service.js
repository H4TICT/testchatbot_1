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

app.get('/topics', async (req, res) => {
  try {
    const getTopics = await Topic.find()
    .select("topicname users _id")
    .populate('user', 'psid');
    res.json(getTopics);
  }
  catch (err) {
    res.status(500).send(err);
  }
});
//get ONLY TOPIC NAME
app.get('/topics', (req, res) => {
    Topic.distinct('topicname')
      .populate('user', 'psid')
      .exec()
      .then((topics) => {
        res.json(topics);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });

//get all object with topic name
// app.get('/topics/:topicname', async (req, res) => {
//   try{
//     const getOneTopic = await Topic.find({topicname: req.params.topicname})
//     .select('_id user topicname')
//     .populate('user', 'psid');
//     res.json(getOneTopic);
//       const listUser = [];
//       const listPSID = [];
//       for (var i in getOneTopic){
//         listUser.push([i, getOneTopic[i]]);
//         const arrUser = getOneTopic[i].user;
//         listPSID.push(arrUser[0].psid);
//       }
//       // var abcxyz = listPSID.splice(listPSID.indexOf('2798864433487491'),1);
//       // console.log(abcxyz);
//   }
//   catch (err) {
//     res.status(500).send(err);
//   }
// });

module.exports = app;
// module.exports = listPSID;