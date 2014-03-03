var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    userrole: { type: String, required: true },
    lastLogon: Date
});

var collectionName = 'users';

module.exports = mongoose.model('User', UserSchema, collectionName);