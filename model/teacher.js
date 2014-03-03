var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var TeacherSchema = new mongoose.Schema({
    username: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    userrole: { type: String, required: true },
    lastLogon: Date,

    name: {
        first: { type: String, required: true },
        last: { type: String, required: true }
    },
    position: { type: String, required: true }
});

TeacherSchema.plugin(uniqueValidator, { mongoose: mongoose });

var collectionName = 'users';

module.exports = mongoose.model('Teacher', TeacherSchema, collectionName);