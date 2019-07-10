const express = require('express');
const router = express.Router();

const TopicCtrl  = require('./topic.controller');

router.get('/:topicname', TopicCtrl.getOneTopic);
// router.post('/user', UserCtrl.uploadUser);


module.exports = router;