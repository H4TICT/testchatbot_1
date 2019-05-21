var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConvSchema = new Schema ({
    convid: {type: Number, nullable: false, primary: true, unique: true},
    topicid: {type: Number, nullable: false, unique: true},
    topicname: {type: String, nullable: false}
});

module.exports = mongoose.model('Conv', ConvSchema);