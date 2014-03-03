var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var CourseSchema = new mongoose.Schema({
    courseId: { type: String, required: true, index: true, unique: true },
    courseName: { type: String, required: true },
    courseCredit: { type: Number, default: 0, min: 0, max: 12 },
    assignedTeachers: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }
    ]
});

CourseSchema.plugin(uniqueValidator, { mongoose: mongoose });

var collectionName = 'courses';

module.exports = mongoose.model('Course', CourseSchema, collectionName);