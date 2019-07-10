const express = require('express');
const router = express.Router();

const UserCtrl  = require('./user.controller');

router.get('/status', UserCtrl.userStatus);
router.get('/users', UserCtrl.getListUser);
router.get('/users/topic', UserCtrl.getTopicOfUser);
// router.get('/sameuser', UserCtrl.getSameTopic);
// router.get('/current', UserCtrl.findCurrentConv);


module.exports = router;