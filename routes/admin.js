var db = require('mongoose');
var CourseModel = db.model('Course');

exports.home = function (req, res) {
    var user = req.session.userinfo;
    if (user) {
        CourseModel.find({}, null, {sort: {courseId: 1}}, function (err, docs) {
            res.render('admin/home', {
                title: 'Admin Home Page',
                courses: docs
            });
        });
    } else {
        res.redirect('/index');
    }
};

exports.addCourse = function (req, res) {
    res.render('admin/addCourse', {
        title: 'Add a new course',
        message: req.flash('error')
    });
};

exports.addTeacher = function (req, res) {
    res.render('admin/addTeacher', {
        title: 'Add a new teacher',
        message: req.flash('error')
    });
};