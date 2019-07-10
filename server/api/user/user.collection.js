/**
 * @module User
 * @author TuanHA
 * @description 
 * @version 1.0.0
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const mongooseUniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema ({
    _id: Schema.Types.ObjectId,
    psid: {
        type: Number
        // unique: true
    },
    // topic: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Topic'
    //     // unique: true
    // }],
    nickname: {
        type: String
    },
    role: {
        type: String
        // required: true
    },
    currentConv: {
        type: String
    }
});

// UserSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('User', UserSchema);