/**
 * @module Conv(conversation)
 * @author TuanHA
 * @description config conversation service
 * @version 1.0.0
 */

const _ = require('lodash');
const mongoose = require('mongoose');

const Conv = require('./conv.collection');
const Topic = require('../topic/topic.collection');
const User = require('../user/user.collection');
const MatchRequest = require('../matchingConv/matchRequest.collection');


// exports.createConvWithUser = async function (userParam, convParam, topicname) {
//   //find existed PSID to create convParam
//   convParam._id = convParam._id;
//   const user = await User.findOne({ psid: userParam.psid }).exec();
//   const getConv = await Conv.find({}).select('topic');
//   // console.log('get Conv: ' + getConv);
//   const listTopic = [];

//   for (var i in getConv) {
//     listTopic.push(getConv[i].topic);
//   }
//   // console.log(listTopic);

//   const index = _.findKey(listTopic, (topicItem) => { return topicItem == topicname });
//   // console.log('topic index: ' + index);
//   if (index) {
//     console.log(listTopic[index] + ' da ton tai');
//     // console.log('user param: ' + userParam._id);
//     const updatedConv = await Conv.updateOne(
//       { topic: listTopic[index] },
//       { $push: { user: user._id } }
//     );
//       console.log('conv id 1: ' + convParam._id);
    
//   } else {
//     const oldUser = await User.findOne({ psid: userParam.psid }).exec();
//     convParam.user.push(oldUser._id);
//     const newConv = await new Conv(convParam).save();
//     console.log('conv id 2: ' + convParam._id);
    
//     // console.log('new Conv: ' + newConv);
//   }

//   //update current Conversation(requesting)
//   const updateUser = await User.updateOne(
//     { psid:userParam.psid },
//     { $set: { currentConv: convParam.topic}}
//   );

//   const getUsers = await Conv.find({ topic: listTopic[index] }).select('user').populate('user', 'psid');
//   // console.log(typeof getUsers);
//   // console.log('get User: ' + getUsers);

//   const allUser = getUsers[0].user;
//   // console.log(allUser.length);
//   // console.log(typeof allUser);
//   const listPSID = [];
//   for (let i = 0; i<allUser.length; i++) {
//     listPSID.push(allUser[i].psid);
//   }
//   // console.log(listPSID);
//   return listPSID;
// };



exports.createConv = async (convParam, matchingParam) => {
  //create empty conversation with only topicname
  convParam.topic = matchingParam.currentRequest;
  const newConv = await new Conv(convParam).save();
  // console.log('new Conv: ' + newConv);

  const sameTopic = await MatchRequest.find({currentRequest: matchingParam.currentRequest}).select('user');
  // console.log('same Topic: ' + sameTopic);
  if (sameTopic.length == 2) {
    const listPSID = [];
    for (let i=0; i<sameTopic.length; i++){
      listPSID.push(sameTopic[i].user);
    };
    // console.log('list PSID: ' + listPSID);

    //delete matched Request
    for (let i=0; i<listPSID.length; i++){
      await MatchRequest.findOneAndDelete({user: listPSID[i]});
    }

    //update listPSID to 1 conversation
    const updatedConv = await Conv.updateOne(
      { _id: convParam._id },
      { $push: { user: listPSID } }
    );
    
    
  } 
};

// exports.getListPSID = async (matchingParam) => {
//   const getUsers = await Conv.find({ topic: matchingParam.currentTopic }).select('user');
//   console.log('this is: ' + getUsers[0].user);
//   listPSID = getUsers[0].user;
//   return listPSID;
// }
