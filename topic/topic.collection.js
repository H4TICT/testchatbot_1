const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TopicSchema = new Schema ({
    topicname: {
        type: String
        // unique: true
    },
    psid: {
        type: Number
    }  
});

module.exports = mongoose.model('Topic', TopicSchema);
