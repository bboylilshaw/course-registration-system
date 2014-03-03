var db = require('mongoose');
var CourseModel = db.model('Course');
var TeacherModel = db.model('Teacher');

exports.chooseCourseToAssign = function (req, res) {
    var user = req.session.userinfo;
    if (user) {
        CourseModel.find({}, null, {sort: {courseId: 1}}, function (err, docs) {
            res.render('admin/chooseCourseToAssign', {
                title: 'Choose Course to Assign',
                courses: docs
            });
        });
    } else {
        res.redirect('/index');
    }
};

exports.getAvailableTeacher = function (req, res) {
    var course_id = req.params.id;
    var alreadyAssigned = null;
    CourseModel.findById(course_id, function (err, doc) {
        if (!err) {
            alreadyAssigned = doc.assignedTeachers;
            console.log(alreadyAssigned);
        }
    });
    TeacherModel.find({userrole: "teacher"}, function (err, docs) {
        res.render('admin/assignTeacherToCourse', {
            title: 'Assign Teacher to Course',
            teachers: docs,
            course_id: course_id,
            alreadyAssigned: alreadyAssigned
        });
    });
};

exports.assignTeacherToCourse = function (req, res, next) {
    var course_id = req.params.id;
    var teachers = req.body.teachers;
    CourseModel.findByIdAndUpdate(course_id, {assignedTeachers: teachers}, function (err, doc) {
        if (!err) {
            console.dir(doc);
            res.redirect("/admin/assign/teacher");
        } else {
            console.dir(err);
            next(err);
        }
    });
};