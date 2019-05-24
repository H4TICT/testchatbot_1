const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConvSchema = new Schema ({
    
    convid: {
        type: Number, 
        required: true, 
        // unique: true
    },
    users: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    topic: [
            {
            type: Schema.Types.ObjectId,
            ref: "Topic"
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Conv', ConvSchema);