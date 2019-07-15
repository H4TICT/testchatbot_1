/**
 * @module User
 * @author TuanHA
 * @description 
 * @version 1.0.0
 */

const _ = require('lodash');

const User = require('./user.collection');
const Topic = require('../topic/topic.collection');
const Conv = require('../conv/conv.collection');
const MatchRequest = require('../matchingConv/matchRequest.collection');


exports.createUser = async function (psid, userParam) {
  const getAllUser = await User.find({}).select('psid');
  const listPSID = [];
  
  for (let i=0; i<getAllUser.length; i++) {
    listPSID.push(getAllUser[i].psid);
  }
  console.log(' list psid test: ' + listPSID);
  // console.log(listPSID);
  const index = _.findKey(listPSID, (userItem) => { return userItem == psid });
  console.log('check test index: ' + index);
  if (!index) {
    const newUser = new User(userParam);
    return await newUser.save();
  } else {
    console.log('user existed');
  }
};

// exports.updateCurrentTopic = async (topicname, psidcheck) => {
//   await User.findOneAndUpdate(
//     {psid: psidcheck},
//     {$set: {currentTopic: topicname}} )
// };

exports.checkValidateUser = async (psid, topicParam) => {
  const getAllUser = await User.find({}).select('psid');
  const listPSID = [];
  
  for (var i in getAllUser) {
    listPSID.push(getAllUser[i].psid);
  }
  // console.log(listPSID);
  const index = _.findKey(listPSID, (userItem) => { return userItem == psid });
  // console.log('User index: ' + index);
  if (index) {
    console.log(listPSID[index] + ' da ton tai');
    // const newTopic = await new Topic(topicParam).save();
    const updatedUser = await User.updateOne(
      {psid: listPSID[index]},
      {$push: {topic: topicParam._id}}
    );
  } else {
    console.log('User chua ton tai');
    // this.createUser(userParam);
  }
};

//update current Conversation(requesting)
exports.updateCurrentConv = async(convParam) =>{
  const listUser = await Conv.find({_id: convParam._id}).select('user');
  listPSID = listUser[0].user;
  // console.log('test listPSID: ' + listPSID);
  // console.log(convParam._id);

  for (let i=0; i<listPSID.length; i++){
    await User.updateOne(
      { psid: listPSID[i] },
      { $set: { currentConv: convParam._id}}
    ).exec();
  }
};

exports.findCurrentConv = async (psidcheck) => {
  const currentConv = await User.find({psid: psidcheck}).select('currentConv');
  return currentConv;
}

exports.setNickname = async (psidcheck, userNickname) => {
  await User.updateOne(
    { psid: psidcheck },
    { $set: { nickname: userNickname}}
  );
};

exports.findNickname = async (psidcheck) => {
  const findNickname = await User.find({psid: psidcheck}).select('nickname')
  nickname = findNickname[0].nickname;
  return nickname;
}

exports.getTopicOfUser = async (req, res) => {
  const getUser = await User.find({}).select('psid');
  res.json(getUser);
  // conso le.log(topicOfUser);
  const listUser = [];
  const listPSID = [];
  for (var i in getUser) {
    listUser.push([i, getUser[i]]);
    listPSID.push(getUser[i].psid);
  }
  console.log(listPSID);

  let a = _.findKey(listPSID, (index) => { return index == psid });
  console.log(a);

  //  if (_.findKey(listPSID, (index) => { return index == '0'? listPSID[index] : undefined })){
  //   console.log('dung');
  //  } else {
  //    console.log('deo');
  //  }
  // const updatedUser = await User.findOneAndUpdate(
  //   {_id: newUser._id},
  //   {$push: {topic: newTopic._id}},
  //   (err, doc) => {
  //     if (err) {
  //       console.log("err: " + err)
  //     }
  //     console.log(doc);
  //   }
  // );
  // console.log('updated user: ' + updatedUser);
};


exports.listUser = async () => {
  const getUsers = await User.find({}).select('psid');
  // console.log(getUsers);
  const listUser = [];
  const listPSID = [];
  for (var i in getUsers) {
    listUser.push([i, getUsers[i]]);
    listPSID.push(getUsers[i].psid);
  }
  return listPSID;
};


// exports.sameTopic = async (topicname) => {
//   const getUsers = await User.find({currentConv:topicname}).select('psid');
//   // console.log(getUsers);
//   const listPSID = [];
//   for (let i = 0; i<getUsers.length; i++) {
//     listPSID.push(getUsers[i].psid);
//   }
//   console.log(listPSID);
//   return listPSID;
// }

// exports.findCurrentConv = async (psidcheck) => {
  
//   const findCurrentConv = await User.find({ psid: psidcheck }).select('currentConv');
//   // console.log(Array.isArray(findCurrentConv));
//   // console.log('current Conv: ' + findCurrentConv[0].currentConv);
//   // res.json(findCurrentConv);
//   const currentConv = findCurrentConv[0].currentConv;
//   console.log(currentConv);

//   const findAllUser = await Conv.find({topic: currentConv}).select('user').populate('user', 'psid');
//   console.log('find all user: ' + findAllUser);
//   const allUser = findAllUser[0].user;
//   const listPSID = [];
//   for (let i = 0; i<allUser.length; i++) {
//     listPSID.push(allUser[i].psid);
//   }
//   console.log('list psid: '+listPSID);
//   return listPSID;
// }


exports.findListReceive = async (psidcheck) => {
  const findCurrentConv = await User.find({ psid: psidcheck }).select('currentConv');
  const currentConv = findCurrentConv[0].currentConv;
  // console.log(currentConv);
  const findAllUser = await Conv.find({_id: currentConv}).select('user');
  // console.log('this is: ' + findAllUser[0].user);
  listPSID = findAllUser[0].user;
  return listPSID;
};

exports.quitMatching = async (psidcheck) => {
  // console.log('psid check: ' + psidcheck);
  const findIdUser = await User.find({ psid: psidcheck }).select('psid');
  const removedId = findIdUser[0].psid;

  const listPSID = await this.findListReceive(psidcheck);
  const remainPSID = _.uniq(listPSID.filter(result => !psidcheck.includes(result)));
  // console.log(removedId);
  const findCurrentConv = await User.find({ psid: psidcheck }).select('currentConv');
  const currentConv = findCurrentConv[0].currentConv;
  // console.log('zcv: '+ currentConv);
  const removeUserQuit = await Conv.updateOne({ _id: currentConv }, { $pull: { user: removedId } }).exec();
  await User.findOneAndUpdate({psid: psidcheck}, {$set: {currentConv: ''}});
  await User.findOneAndUpdate({psid: remainPSID[0]}, {$set: {currentConv: ''}});
  await Conv.findOneAndDelete({ _id: currentConv }).exec();
}