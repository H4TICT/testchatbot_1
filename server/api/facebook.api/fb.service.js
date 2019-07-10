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
    qs: { "access_token": "EAAeLpZCmj8J8BAJUw0TGUhdUWUOr5ImvAQpWoCcdQlmzvkpAft1NEuGkz7ZChFrFVbqrfuMprgZBzdT9IGYWajLsEhk8HjwIuYDMm9rB4KbwksAmwCcZAMm8n5Xm6fZCMccXkQTFhPXcH0zGzleuMj3orPZArdU1AYKLCQZBkE9GZCcKhpCvqYUO"},
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
    qs: { "access_token": "EAAeLpZCmj8J8BAJUw0TGUhdUWUOr5ImvAQpWoCcdQlmzvkpAft1NEuGkz7ZChFrFVbqrfuMprgZBzdT9IGYWajLsEhk8HjwIuYDMm9rB4KbwksAmwCcZAMm8n5Xm6fZCMccXkQTFhPXcH0zGzleuMj3orPZArdU1AYKLCQZBkE9GZCcKhpCvqYUO"},
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

