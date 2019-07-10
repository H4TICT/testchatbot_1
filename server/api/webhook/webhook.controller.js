/**
 * @module Webhook
 * @author TuanHA
 * @description handle webhook event
 * @version 1.0.0
 */

const mongoose = require('mongoose');
const _ = require('lodash');


const callFbAPI = require('../facebook.api/fb.service');
const callOption = require('../utils/index');
const userService = require('../user/user.service');
const topicService = require('../topic/topic.service');
const convService = require('../conv/conv.service');
const matchingService = require('../matchingConv/matchRequest.service');


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
  

let checkNickname = false; 
let requiredPSID = '';
let requiredArray = [];

//using webhook handle Events.
exports.sendWebhookEvent = async (req, res) => {
    

    let body = req.body;
    
    if (body.object === 'page') {
        body.entry.forEach( async function(entry) {
            // console.log(entry)
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);

            let psid = webhook_event.sender.id;
            
            let checkMessage = webhook_event.message;

            const findCurrentConv = await userService.findCurrentConv(psid);
            
                // currentConv = findCurrentConv[0].currentConv;
                // console.log('find current Conv test : ' + findCurrentConv);
    
            if (checkMessage) {
                // console.log('arr length: ' + requiredArray.length);
                // console.log(' array 1:' + JSON.stringify(requiredArray));
                if (findCurrentConv[0].currentConv == '') {
                    // await callFbAPI.sendMessage(psid, 'You cannot send message now, choose topic again');
                    await matchingService.removeRequest(psid);
                    await [response =  callOption.askTemplate('Choose a topic below then we can find you a friend:'),
                     callFbAPI.callSendAPI(psid, response)];
                } else {
                if(requiredArray.length>0) {
                    for (let i=0; i<requiredArray.length; i++){
                        if (psid == requiredArray[i]) {
                            setNickname(psid, checkMessage);
                            // checkNickname = false;
                            requiredArray.splice(i,1);
                            // console.log('remained psid: ' + JSON.stringify(requiredArray));
                        } 
                    }
                    // console.log('arr length 3  : ' + requiredArray.length);  
                } else {
                    handleMessage(psid, checkMessage);
                }  
            }
            } else if (webhook_event.postback.payload === 'NICKNAME_PAYLOAD') {
                const findCurrentConv = await userService.findCurrentConv(psid);
                currentConv = findCurrentConv[0].currentConv;
               
                if (!currentConv) {
                    await callFbAPI.sendMessage(psid, 'Sorry! You only can set your nickname when you are matched!');
                } else {
                    await callFbAPI.sendMessage(psid, 'Set your nickname: ');
                    // checkNickname = true;
                    requiredPSID = psid;
                    requiredArray.push(requiredPSID);
                    requiredArray = _.uniq(requiredArray);
                    // console.log('arr length 2: ' + requiredArray.length);
                    // console.log('hihi 23: ' + checkNickname);
                    // await setNickname(psid, webhook_event.message);
                }       
            } else if (webhook_event.postback) {
                console.log(webhook_event.postback);
                handlePostback(psid, webhook_event.postback);
            } 
        });
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    };
};

//handle Postback events
const handlePostback = async (psid, received_postback) => {
    
    let response;
    let payload = received_postback.payload;
    let topicname = received_postback.title;
    

    const userParam = {
        _id: new mongoose.Types.ObjectId(),
        psid: psid,
        nickname: '',
        // role: 'Normal',
        currentConv: '',
        // topic: []   
    };

    // const topicParam = {
    //     _id: new mongoose.Types.ObjectId(),
    //     topic: topicname
    //     // psid: psid
    // };  

    const matchingParam = {
        _id: new mongoose.Types.ObjectId(),
        currentRequest: '',
        user: psid
    };

    const convParam = {
        _id: new mongoose.Types.ObjectId(),
        topic: '',
        user: []
    };
    
    if(payload === 'GET_STARTED'){
        await [callFbAPI.sendMessage(psid, 'Use Menu under the textbox for more options!'),
        response = callOption.askTemplate('Choose a topic below then we can find you a friend:'),
        callFbAPI.callSendAPI(psid, response)];
        await userService.createUser(userParam);
    } else if (payload === 'HELP_PAYLOAD') {
        await callFbAPI.sendMessage(psid, 'Do ... to ..., Do ... to ...!');
    } else if (payload === 'QUIT_PAYLOAD') {     
        const listPSID = await userService.findListReceive(psid);
        const remainPSID = _.uniq(listPSID.filter(result => !psid.includes(result)));   
        await [callFbAPI.sendMessage(psid, 'You have just left the conversation'),
        callFbAPI.sendMessage(remainPSID[0], 'Your friend has just left the conversation')];
        await userService.quitMatching(psid, userParam);

        //allow user choose topic after quit matching
        await [ response = callOption.askTemplate('Choose a topic below then we can find you a friend:'),
        callFbAPI.callSendAPI(psid, response),
        callFbAPI.callSendAPI(remainPSID[0], response)];
    } else {
        const findCurrentConv = await userService.findCurrentConv(psid);
        // console.log('find current Conv: ' + findCurrentConv);
        currentConv = findCurrentConv[0].currentConv;
        
        if (!currentConv){
            // await userService.updateCurrentTopic(topicname, psid);
            await callFbAPI.sendMessage(psid, 'You choosed topic: ' + topicname);
            // await topicService.createTopic(topicParam);   
            // await userService.checkValidateUser(psid, topicParam);
           
            await matchingService.create(matchingParam, userParam, psid, topicname);  

            const countSameTopic = await matchingService.countSameTopic(topicname);
            // console.log('count same topic: ' + countSameTopic);
            if (countSameTopic == 2) {
                await convService.createConv(convParam, matchingParam, userParam);
                await userService.updateCurrentConv(convParam);
                await matchingService.removeMatchedRequest(matchingParam);

                //send message to 2 users when matched
                const listPSID = await userService.findListReceive(psid);
                for (let i=0; i<listPSID.length; i++){
                    await callFbAPI.sendMessage(listPSID[i], 'You are now connected with one friend.');
                }  
            } else if (countSameTopic < 2) {
                await callFbAPI.sendMessage(psid, 'We are finding you a friend, please wait.');  
            }  
        } else {
            const listPSID = await userService.findListReceive(psid);
            const remainPSID = _.uniq(listPSID.filter(result => !psid.includes(result)));   
            await [callFbAPI.sendMessage(psid, 'You have just left the conversation'),
            callFbAPI.sendMessage(remainPSID[0], 'Your friend has just left the conversation')];
            await userService.quitMatching(psid, userParam);
            //allow user choose topic after quit matching
            response = await callOption.askTemplate('Choose a topic below then we can find you a friend:');
            await callFbAPI.callSendAPI(psid, response);
            await callFbAPI.callSendAPI(remainPSID[0], response);
        }
        // userParam.psid = psid; 
        // await convService.createConvWithUser(userParam, convParam, topicname);
    }
};


//handles Messages events
const handleMessage = async (psid, received_message) => {
    let response;
    let message;
   
    const listPSID = await userService.findListReceive(psid);
    
    const listReceive = _.uniq(listPSID.filter(result => !psid.includes(result)));
    // console.log('receive list: ' + listReceive);
    
    if (received_message.text) {
        const message = received_message.text; 
        const nickname = await userService.findNickname(psid);

        for (let i=0; i<listReceive.length; i++){
            if (nickname == ''){
                response = callOption.askTemplate();
                await callFbAPI.sendMessage(listReceive[i], message);
            } else {
                response = callOption.askTemplate();
                await callFbAPI.sendMessage(listReceive[i], nickname + ': ' + message);
            }
        }   
    }
    await callFbAPI.callSendAPI(psid, response);
};

const setNickname = async (psid, received_message) => {  
    const nickname = received_message.text;
    // console.log('nickname here: ' + nickname);
    await userService.setNickname(psid, nickname);
    await callFbAPI.sendMessage(psid, 'Your nickname now is: ' + nickname);
};
