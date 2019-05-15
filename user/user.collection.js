var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema ({
    UID: {type: 'number', nullable: false, primary: true, unique: true},
    PSID: {type: 'number', nullable: false, unique: true},
    Role: {type: 'string', maxlength: 30, nullable: false}
});

module.exports = mongoose.model('User', UserSchema);