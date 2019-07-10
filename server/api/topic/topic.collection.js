/**
 * @module: Topic
 * @author: TuanHA
 * @description: config route and middleware
 * @version 1.0.0
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const mongooseUniqueValidator = require('mongoose-unique-validator');

const TopicSchema = new Schema ({
    _id: Schema.Types.ObjectId,
    topic: {
        type: String
    }
    // user: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'User'
    //     }  
    // ]
});

// TopicSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Topic', TopicSchema);
