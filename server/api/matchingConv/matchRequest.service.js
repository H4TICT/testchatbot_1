/**
 * @module MatchingConversation
 * @author TuanHA
 * @description config conversation service
 * @version 1.0.0
 */

const _ = require('lodash');

const Conv = require('../conv/conv.collection');
const Topic = require('../topic/topic.collection');
const User = require('../user/user.collection');
const MatchRequest = require('./matchRequest.collection');

exports.checkExistRequest = async (psidcheck) => {
    const findExistRequest = await MatchRequest.find({user: psidcheck});
    return findExistRequest;
}
exports.create = async (matchingParam, userParam, psidcheck, topicname) => {
    const findExistRequest = await MatchRequest.find({user: psidcheck});
    // console.log('check array: ' + Array.isArray(findExistRequest));
    // console.log('check exist request: ' + findExistRequest)
    if (findExistRequest == '') {
        // matchingParam.user = psidcheck;
        matchingParam.currentRequest = topicname;

        const newRequest = await new MatchRequest(matchingParam).save();
        // const newRequest = await MatchRequest.updateOne({user: psidcheck},{$set:{currentRequest: topicname}}).exec();
        // console.log('new Request: ' + newRequest);
        // await MatchRequest.remove({currentRequest:''});
    } else if (findExistRequest) {
        const updateExistRequest = await MatchRequest.updateOne(
            {user: psidcheck},
            { $set: {currentRequest: topicname}}
        ).exec();
        // console.log('updated request: ' + updateExistRequest)
    }
    
};

exports.removeRequest = async (psidcheck) => {
    await MatchRequest.findOneAndDelete({user: psidcheck});
}

exports.updateRequest = async (psidcheck, topicname) => {
    // const findCurrentTopic = await User.findOne({psid: psidcheck}).select('currentTopic');
    // newCurrentTopic = findCurrentTopic[0].currentTopic;
    const updateRequest = await MatchRequest.updateOne({user: psidcheck},
    {$set: {currentRequest: topicname}}).exec();
    console.log('updated Request: ' + updateRequest);
}

exports.countSameTopic = async (topicname) => {
    const countSameTopic = await MatchRequest.find({currentRequest: topicname});
    return countSameTopic.length;
};

exports.removeMatchedRequest = async (matchingParam) => {
    const findUser = await Conv.find({topic: matchingParam.currentRequest}).select('user');
    listPSID = findUser[0].user;
    // console.log('list id to remove:' + listPSID);
    for (let i=0; i<listPSID.length; i++){
        await MatchRequest.find({currentRequest: matchingParam.currentRequest})
    }
}