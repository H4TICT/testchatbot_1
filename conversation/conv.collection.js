var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConvSchema = new Schema ({
    convid: {type: 'number', nullable: false, primary: true, unique: true},
    topicid: {type: 'number', nullable: false, unique: true},
    topicname: {type: 'string', maxlength: 30, nullable: false}
});

module.exports = mongoose.model('Conv', ConvSchema);