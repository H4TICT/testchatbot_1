/**
 * @module User
 * @author TuanHA
 * @description 
 * @version 1.0.0
 */

const userService = require('./user.service');
const User = require('./user.collection');

exports.userStatus = (req, res) => {
    res.json({
        success: 200
    })
};

exports.getListUser = userService.listUser;
exports.getTopicOfUser = userService.checkValidateUser;
// exports.getSameTopic = userService.sameTopic;
// exports.findCurrentConv = userService.findCurrentConv;