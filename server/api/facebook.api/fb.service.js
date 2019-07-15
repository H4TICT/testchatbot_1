/**
 * @module FacebookAPI
 * @author TuanHA
 * @description 
 * @version 1.0.0
 */

const request = require('request');
const rp = require('request-promise');

exports.callSendAPI = function (psid, response) {
  const optionsAPI = {
    uri: "https://graph.facebook.com/v2.6/me/messages",
    qs: { "access_token": "EAAJD3bxXM4UBAOdaIsvJig1Ynhn8MoJiUPkkA6MtjmzkaUFZCiueDQCc97OmRZAqd5DhJ9gTluKLkQF7aYojGZBnsv3mZBbxaVbtFQ8XdYA03wcjlgfIcOe9CDzDJQQzz6bpePylurbEjX35j4zuZBZAFrdPZA7kosJ2YCeIRiIwTuko04ILkxh"},
    method: "POST",
    body: {
      "recipient": {
          "id": psid
      },
      "message": response
    },
    json: true
  };
  rp(optionsAPI)
  .then(function () {
    console.log({message: 'success'});
  })
  .catch(function (err) {
    console.error("Unable to send message: " + err);
  });
};

exports.sendMessage = function (psid, message) {
  const optionsMessage = {
    uri: "https://graph.facebook.com/v3.3/me/messages",
    qs: { "access_token": "EAAJD3bxXM4UBAOdaIsvJig1Ynhn8MoJiUPkkA6MtjmzkaUFZCiueDQCc97OmRZAqd5DhJ9gTluKLkQF7aYojGZBnsv3mZBbxaVbtFQ8XdYA03wcjlgfIcOe9CDzDJQQzz6bpePylurbEjX35j4zuZBZAFrdPZA7kosJ2YCeIRiIwTuko04ILkxh"},
    method: "POST",
    body: {
      "messaging_type": "Response",
      "recipient": {
        "id": psid
      },
      "message": {
        "text": message
      }
    },
    "json": true
  };
  rp(optionsMessage)
  .then(function () {
    console.log({message: 'success'});
  })
  .catch(function (err) {
    console.error("Unable to send message: " + err);
  });
};


// module.exports = fbAPI;

