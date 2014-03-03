var db = require('mongoose');
var CourseModel = db.model('Course');

exports.saveCourse = function (req, res, next) {

    var course = new CourseModel({
        courseId: req.body.courseid,
        courseName: req.body.coursename,
        courseCredit: req.body.coursecredit
    });

    course.save(function (err, course, numberAffected) {
        console.log("[DEBUG]:courseMgr.save invoked");
        if (!err) {
            console.dir(course);
            res.redirect('/admin/home');
        } else {
            console.dir(err);
            // Error handling
            if (err.errors.courseCredit !== "") {
                req.flash('error', err.errors.courseCredit.message);
            }
            if (err.errors.courseId !== "") {
                req.flash('error', err.errors.courseId.message);
            }
            res.redirect('/admin/course/add');
        }
    });
};

exports.viewCourse = function (req, res, next) {
    var id = req.params.id;
    CourseModel.findById(id, function (err, doc) {
        if (!err) {
            res.render('admin/viewCourse', {
                title: 'Course Detail',
                course: doc
            });
        } else {
            next(err);
        }

    });
};

exports.updateCourse = function (req, res, next) {
    var id = req.params.id;
    var updatedCourse = {
        courseId: req.body.courseid,
        courseName: req.body.coursename,
        courseCredit: req.body.coursecredit
    };
    CourseModel.findByIdAndUpdate(id, updatedCourse, function (err, doc) {
        if (!err) {
            console.dir(doc);
            res.redirect("/admin/home");
        } else {
            console.dir(err);
            next(err);
        }
    });
};

exports.deleteCourse = function (req, res, next) {
    console.log("[DEBUG]:courseMgr.deleteCourse invoked");
    var id = req.params.id;
    CourseModel.findByIdAndRemove(id, function (err) {
        if (!err) {
            res.redirect('/admin/home');
        } else {
            next(err);
        }
    });
};

exports.findCourse = function (req, res, next) {
    var findcourse = req.body.searchcourse;
    console.log(findcourse);
    CourseModel.find({ $or: [
        {'courseId': findcourse},
        {'courseName': findcourse}
    ]}, function (err, doc) {
        if (!err) {
            res.render('admin/home', {
                title: 'Search Course',
                courses: doc
            });
        } else {
            next(err);
        }
        console.log(doc);
    });
};