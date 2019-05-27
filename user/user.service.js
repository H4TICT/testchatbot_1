const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const User = require('./user.collection');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

mongoose.Promise = global.Promise;

// POST User route
app.post('/user', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.send(user);
    // console.log('user: '+ req.body);
  }
  catch (err) {
    res.status(500).send(err);
  } 
});


//GET all users
app.get('/users', async (req, res) => {
  try {
    const getUsers = await User.find({});
    res.json(getUsers);
  }
  catch (err) {
    res.status(500).send(err);
  }
})

module.exports = app;

