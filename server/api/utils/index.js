exports.askTemplate = (text) => {
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
              "payload":"SPORT_TOPIC"
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