var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userRequestSchema = new Schema ({
    id: {type: 'number', nullable: false, primary: true},
    psid: {type: 'string', maxlength: 20, nullable: false, unique: true},
    topic: {type: 'string', maxlength: 30, nullable: false}
});

module.exports = mongoose.model('UserRequest', userRequestSchema);