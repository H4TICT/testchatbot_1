var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema ({
    UID: {
        type: Number,
        required: true,
        primary: true, 
        unique: true
    },
    PSID: {
        type: Number, 
        required: true, 
        unique: true
    },
    Role: {
        type: String, 
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);