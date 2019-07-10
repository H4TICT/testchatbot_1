const express = require('express');
const router = express.Router();

const ConvCtrl  = require('./conv.controller');

router.get('/status', ConvCtrl.convStatus);
// router.get('/convs', ConvCtrl.getListConv);

module.exports = router;