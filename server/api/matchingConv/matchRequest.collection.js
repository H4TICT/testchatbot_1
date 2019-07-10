/**
 * @module: matching Conversation
 * @author: TuanHA
 * @description: config conversation collection
 * @version 1.0.0
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const mongooseUniqueValidator = require('mongoose-unique-validator');

const matchRequestSchema = new Schema ({ 
    user: {
        type: Number
    },
    currentRequest: {
        type: String
    }    
});

// matchRequestSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('matchRequest', matchRequestSchema);
