const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TopicSchema = new Schema ({
    topicname: {
        type: String
        // unique: true
    },
    user: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }  
    ]
});

module.exports = mongoose.model('Topic', TopicSchema);
