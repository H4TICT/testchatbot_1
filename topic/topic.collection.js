var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopicSchema = new Schema ({
    topicid: {
        type: Number
        // primary: true, 
        // unique: true
    },
    psid: {
        type: Number
    },
    topicname: {
        type: String
    }
});

module.exports = mongoose.model('Topic', TopicSchema);