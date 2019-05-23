const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
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