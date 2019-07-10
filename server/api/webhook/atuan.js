const mongoose = require('mongoose');


const callFbAPI = require('../facebook.api/fb.service');
const callOption = require('../utils/index');
const userService = require('../user/user.service');
const topicService = require('../topic/topic.service');

// console.log(callFbAPI);
exports.status = (req, res) => {
    res.send("Server running okay");
    res.json({
        success: 200
    });
};

exports.getWebhookEvent = async (req, res) => {

    let VERIFY_TOKEN = "randomToken";

    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            // console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
};

const returnPSID = (req, res) => {
    let body = req.body;
    if (body.object === 'page') {
        let myEntry = body.entry;
        console.log(JSON.stringify(myEntry));
     
        Object.keys(myEntry).map((keys, index) => {
            console.log(myEntry[keys].messaging);
            myEntry[keys].messaging;
        })
    };
};


//using webhook handle Events.
exports.sendWebhookEvent = (req, res) => {
    try {
        let webhook_event = returnPSID(req, res);

        console.log("webhook_event : " + webhook_event);

        let psid = webhook_event.sender.id;

        if (webhook_event.message) {
            handleMessage(psid, webhook_event.message);
        } else if (webhook_event.postback) {
            handlePostback(psid, webhook_event.postback);
        }
    } catch (err){
        console.log(err);
    }



    // if(webhook_event != null){
    //     let psid = webhook_event.sender.id;
    //     console.log(psid);
    //     if (webhook_event.message) {
    //         handleMessage(psid, webhook_event.message);
    //     } else if (webhook_event.postback) {
    //         handlePostback(psid, webhook_event.postback);
    //     }
    // }else{
    //     res.sendStatus(404);
    // }

    // let body = req.body;
    // if (body.object === 'page') {
    //     body.entry.forEach(function(entry) {
    //         let webhook_event = entry.messaging[0];
    //         // console.log(webhook_event);

    //         let psid = webhook_event.sender.id;

    //         if (webhook_event.message) {
    //             handleMessage(psid, webhook_event.message);
    //         } else if (webhook_event.postback) {
    //             handlePostback(psid, webhook_event.postback);
    //         }
    //     });
    //     res.status(200).send('EVENT_RECEIVED');
    // } else {

    // };
};


// const recipientList = [];
const getListRecipient = async () => {
    let listPSID = await userService.listUser();
    var listRecipient = listPSID.filter(result => !'279'.includes(result));
    return listRecipient;
};

// getListRecipient().then(async data => {
//     const getWebhook = await this.handleMessage.sendWebhookEvent();

// });


//handle Postback events
const handlePostback = async (psid, received_postback) => {
    let response;
    let payload = received_postback.payload;
    let topicname = received_postback.title;

    const userParam = {
        _id: new mongoose.Types.ObjectId(),
        psid: psid,
        role: 'Normal'
    };

    const topicParam = {
        _id: new mongoose.Types.ObjectId(),
        topicname: topicname,
        psid: psid
    };

    if (payload === 'GET_STARTED') {
        response = callOption.askTemplate('Choose a topic below then we can find you a friend');
        callFbAPI.callSendAPI(psid, response);

    } else {
        //   sendMessage(psid, psid + ' choosed topic: ' + topicname);
        const data = await callFbAPI.sendMessage(psid, psid + ' choosed topic: ' + topicname);

        userService.createUser(userParam);
        topicService.createTopic(topicParam);
    }
};

//handles Messages events
const handleMessage = async (psid, received_message) => {
    let response;
    let message;

    //console.log("typeof" +  userService.listUserTest());
    if (received_message.text) {
        response = callOption.askTemplate();
        message = received_message.text;
        callFbAPI.sendMessage(psid, message);
    }
    callFbAPI.callSendAPI(psid, response);
};
