var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConvSchema = new Schema ({
    convid: {
        type: Number, 
        required: true, 
        primary: true, 
        unique: true
    },
    topicid: {
        type: Number, 
        required: true, 
        unique: true
    },
    topicname: {
        type: String, 
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Conv', ConvSchema);