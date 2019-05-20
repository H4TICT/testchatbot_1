var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema ({
    UID: {type: Number, nullable: false, primary: true, unique: true},
    PSID: {type: Number, nullable: false, unique: true},
    Role: {type: String, maxlength: 30, nullable: false}
});

module.exports = mongoose.model('User', UserSchema);