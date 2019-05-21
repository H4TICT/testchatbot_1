var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopicSchema = new Schema ({
    topicid: {type: Number, nullable: false, primary: true},
    psid: {type: Number, nullable: false},
    topicname: {type: String, nullable: false}
});

module.exports = mongoose.model('Topic', TopicSchema);