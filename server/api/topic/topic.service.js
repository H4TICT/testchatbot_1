/**
 * @module Topic
 * @author TuanHA
 * @description 
 * @version 1.0.0
 */

const Topic = require('./topic.collection');
const User = require('../user/user.collection');

exports.createTopic = async (topicParam) => {
  const newTopic = await new Topic(topicParam).save();
};

exports.getOneTopic = async (req,res) => {
    try{
        const getOneTopic = await Topic.find({topicname: req.params.topicname})
        .select('_id user topicname')
        .populate('user', 'psid');
        res.json(getOneTopic);
        // console.log(getOneTopic);
    
        const listUser = [];
        const listPSID = [];
        for (var i in getOneTopic){
        listUser.push([i, getOneTopic[i]]);
        // console.log(getOneTopic[i]);
        const arrUser = getOneTopic[i].user;
        listPSID.push(arrUser[0].psid);
        }
        // console.log(listPSID);
        // var abcxyz = listPSID.splice(listPSID.indexOf('2798864433487491'),1);
        var abc = listPSID.filter(listPSID => !'2798864433487491'.includes(listPSID));
        // console.log(abc);
    }
    catch (err) {
    res.status(500).send(err);
    }
};