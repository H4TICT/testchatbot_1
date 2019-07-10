const express = require('express');
// const app = express();
const router = express.Router();


const webhookCtrl = require('./webhook.controller');
// var RateLimit = require('express-rate-limit');
// var RedisStore = require('rate-limit-redis');
 
// var limiter = new RateLimit({
//   store: new RedisStore({

//   }),
//   windowMs: 15 * 60 * 1000, //15 mins
//   max: 100, // limit each IP to 100 requests per windowMs
//   delayMs: 0,// disable delaying - full speed until the max limit is reached
//   message: 'Too many request'
// });


// const rateLimit = require("express-rate-limit");

// const limiter = rateLimit({
//   windowMs: 1 * 1000, // 15 minutes
//   max: 2, // limit each IP to 100 requests per windowMs
//   message: 'Too many request'
// });

router.get('/status', webhookCtrl.status);
router.get('/event', webhookCtrl.getWebhookEvent);
router.post('/event', webhookCtrl.sendWebhookEvent); 

    
module.exports = router;