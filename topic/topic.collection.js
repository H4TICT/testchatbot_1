var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopicSchema = new Schema ({
    topicid: {type: 'number', nullable: false, primary: true, unique: true},
    UID: {type: 'number', nullable: false},
    topicname: {type: 'string', maxlength: 30, nullable: false}
});

module.exports = mongoose.model('Topic', TopicSchema);