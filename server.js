var logger = require('morgan');
var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');
var request = require('request');
var router = express();

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
var server = http.createServer(app);


app.get('/', (req, res) => {
  res.send("Home page. Server running okay.");
});

app.get('/webhook', function(req, res) {
  if (req.query['hub.verify_token'] === 'randomToken') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});


//user send message to bot
// app.post('/webhook', function(req, res) {
//   var entries = req.body.entry;
//   for (var entry of entries) {
//     var messaging = entry.messaging;
//     for (var message of messaging) {
//       var senderId = message.sender.id;
//       if (message.message) {
//         // If user send text
//         if (message.message.text) {
//           var text = message.message.text;
//           console.log(text); //text: message from user
//           sendMessage(senderId, "Hello, I'm bot. You typed: " + text);
//         }
//       }
//     }
//   }

//   res.status(200).send("OK");
// });


app.post('/webhook', (req, res) => {
  let body = req.body;
  if (body.object === 'page') {
    body.entry.forEach(function(entry){
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      let sender_psid = webhook_event.sender.id;
      console.log('Sender PSID: ' + sender_psid);

      if (webhook_event.message) {
        console.log(webhook_event.message)
      } else if (webhook_event.postback) {
        console.log(webhook_event.postback)
      }
    });
    res.status(200).send('Event Received!');
  } else {
    res.sendStatus(404);
  }
});

//handles messages events
const handleMessage = (sender_psid, received_message) => {
  let response;
  if (received_message.text) {

  }
};

const handlePostback = (sender_psid, received_postback) => {
  let response;
  let payload = received_postback.payload;

  if(payload === 'GET_STARTED'){
    response = askTemplate('Choose a topic below');
    callSendAPI(sender_psid, response);
  }
};

if (webhook_event.message) {
  handleMessage(sender_psid, webhook_event.message);
} else if (webhook_event.postback) {
  handlePostback(sender_psid, webhook_event.postback);
}


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

const callSendAPI = (sender_psid, response, cb = null) => {
  // let request_body = {
  //   "recipient": {
  //     "id": sender_psid
  //   },
  //   "message": response
  // };

  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: "EAAeLpZCmj8J8BAN8sFu7DEvemfE7cHETzOxVFlqqwZAmFoAHf1d4U396t7MI0LoKISFGOSjQYXMoq3rvSIzifobxy8Aq8ZAuTBK49aKY6sSJBUWo5EDFjUAMncvurF7FsKoKehM6JMfnOvMkmCxTbD2OM5ZAS8zjUdfFgKHJ8IUNalee7ec8feDZBd5u6jwEZD",
    },
    method: 'POST',
    json: {
      recipient: {
        id: sender_psid
      },
      message: {
        text: response 
      },
    }
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
//send info to RestAPI to answer
// function sendMessage(senderId, message) {
//   request({
//     url: 'https://graph.facebook.com/v2.6/me/messages',
//     qs: {
//       access_token: "EAAeLpZCmj8J8BAN8sFu7DEvemfE7cHETzOxVFlqqwZAmFoAHf1d4U396t7MI0LoKISFGOSjQYXMoq3rvSIzifobxy8Aq8ZAuTBK49aKY6sSJBUWo5EDFjUAMncvurF7FsKoKehM6JMfnOvMkmCxTbD2OM5ZAS8zjUdfFgKHJ8IUNalee7ec8feDZBd5u6jwEZD",
//     },
//     method: 'POST',
//     json: {
//       recipient: {
//         id: senderId
//       },
//       message: {
//         text: message
//       },
//     }
//   });
// }
app.set('port', process.env.PORT || 5000);
app.set('ip', process.env.IP || "0.0.0.0");

server.listen(app.get('port'), app.get('ip'), function() {
  console.log("Chat bot server listening at %s:%d ", app.get('ip'), app.get('port'));
});
