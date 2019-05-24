const logger = require('morgan');
const bodyParser = require('body-parser');
const request = require('request');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

//require Schema
const User = require('./user/user.collection');
const Topic = require('./topic/topic.collection');
const Conv = require('./conv/conv.collection');

//require all routes
const topicRoute = require('./topic/topic.service');
const userRoute = require('./user/user.service');
const sendRoute = require('./conv/conv.service');

app.use('/topic', topicRoute);
app.use('/conv', sendRoute);
app.use('/user', userRoute);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


//database url
// const db = 'mongodb+srv://tuanha1709:Hatuan1997hd@freechatdbtest-uy890.mongodb.net/test?retryWrites=true';
const db = 'mongodb://localhost:27017/freechat';

mongoose.Promise = global.Promise;
mongoose.connect(db);

app.get('/', (req, res) => {
  res.send("Server running okay");
});

app.get('/webhook', (req, res) => {

  let VERIFY_TOKEN = "randomToken";

  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  if (mode && token) {
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
          console.log('WEBHOOK_VERIFIED');
          res.status(200).send(challenge);
      } else {
          res.sendStatus(403);
      }
  }
});


//using webhook handle Events.
app.post('/webhook', (req, res) => {
  let body = req.body;
  if (body.object === 'page') {
    body.entry.forEach(function(entry) {
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      let psid = webhook_event.sender.id;

      if (webhook_event.message) {
        handleMessage(psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handlePostback(psid, webhook_event.postback);
      }
    });
    res.status(200).send('EVENT_RECEIVED');
  } else {
      res.sendStatus(404);
  };
});

//handle Postback events
const handlePostback = (psid, received_postback, request_body) => {
  let response;
  let payload = received_postback.payload;
  let topicname = received_postback.title;

  const newUser = new User({
    psid: psid,
    role: 'Normal'
  });

  const newTopic = new Topic({
    topicname: topicname,
    psid: psid
  });

  if(payload === 'GET_STARTED'){
    response = askTemplate('Choose a topic below then we can find you a friend');
    callSendAPI(psid, response);
  } else {
    sendMessage(psid, psid + ' choosed topic: ' + topicname);
    // newUser.save().then(user => res.json(user));
    // newTopic.save().then(topic => res.json(topic));
  }
};

//handles Messages events
const handleMessage = (psid, received_message) => {
  let response;
  let message;
  if (received_message.text) {
    response = askTemplate();
    message = received_message.text;
    sendMessage(psid, message);
  }
  callSendAPI(psid, response);
};


//return topic list 
const askTemplate = (text) => {
  return {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text": text,
        "buttons":[
          {
              "type":"postback",
              "title":"Games",
              "payload":"GAME_TOPIC"
          },
          {
              "type":"postback",
              "title":"Sports",
              "payload":"SPORTS_TOPIC"
          },
          {
            "type":"postback",
            "title":"Fashion",
            "payload":"FASHION_TOPIC"
          }
        ]
      }
    }
  }
};

function callSendAPI(psid_send, response, cb = null) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": psid_send
        },
        "message": response
    };

    // Send the HTTP request to the Messenger Platform
    request({
      "uri": "https://graph.facebook.com/v2.6/me/messages",
      "qs": { "access_token": "EAAeLpZCmj8J8BAN8sFu7DEvemfE7cHETzOxVFlqqwZAmFoAHf1d4U396t7MI0LoKISFGOSjQYXMoq3rvSIzifobxy8Aq8ZAuTBK49aKY6sSJBUWo5EDFjUAMncvurF7FsKoKehM6JMfnOvMkmCxTbD2OM5ZAS8zjUdfFgKHJ8IUNalee7ec8feDZBd5u6jwEZD", },
      "method": "POST",
      "json": request_body
    }, (err, res, body) => {
      if (!err) {
          if(cb){
              cb();
          }
      } else {
          console.error("Unable to send message:" + err);
      }
    });
  

};


function sendMessage(psid_receive, message, cb = null) {
  let message_sent = {
    "messaging_type": "Response",
    "recipient": {
      "id": "2281658205232297"
    },
    "message": {
      "text": message
    }
  };
  request({
      "uri": "https://graph.facebook.com/v3.3/me/messages",
      "qs": { "access_token": "EAAeLpZCmj8J8BAN8sFu7DEvemfE7cHETzOxVFlqqwZAmFoAHf1d4U396t7MI0LoKISFGOSjQYXMoq3rvSIzifobxy8Aq8ZAuTBK49aKY6sSJBUWo5EDFjUAMncvurF7FsKoKehM6JMfnOvMkmCxTbD2OM5ZAS8zjUdfFgKHJ8IUNalee7ec8feDZBd5u6jwEZD", },
      "method": "POST",
      "json": message_sent
    }, (err, res, body) => {
      if (!err) {
          if(cb){
              cb();
          }
      } else {
          console.error("Unable to send message:" + err);
      }
    });
}


app.set('port', process.env.PORT || 5000);
app.set('ip', process.env.IP || "0.0.0.0");

server.listen(app.get('port'), app.get('ip'), function() {
  console.log("Chat bot server listening at %s:%d ", app.get('ip'), app.get('port'));
});
