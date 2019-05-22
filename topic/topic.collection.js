var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var TopicSchema = new Schema ({
    topicid: {
        ObjectId,
        type: Number,
        // required: true, 
        primary: true, 
        unique: true
    },
    psid: {
        type: Number
        // required: true
    },
    topicname: {
        type: String
        // required: true
    }
});

module.exports = mongoose.model('Topic', TopicSchema);