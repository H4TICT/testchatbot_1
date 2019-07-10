/**
 * @module: Conv(Conversation)
 * @author: TuanHA
 * @description: config conversation collection
 * @version 1.0.0
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseUniqueValidator = require('mongoose-unique-validator');

const ConvSchema = new Schema ({
    topic: {
        type: String
    },
    user: {
        type: [Number],
        unique: true
    }
});

ConvSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('Conv', ConvSchema);
