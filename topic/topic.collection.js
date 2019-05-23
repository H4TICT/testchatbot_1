const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TopicSchema = new Schema ({
    topicid: {
        type: Number
        // primary: true, 
        // unique: true
    },
    psid: {
        type: Number
        // unique: true

    },
    topicname: {
        type: String
        // unique: true
    }
});

module.exports = mongoose.model('Topic', TopicSchema);