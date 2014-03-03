var db = require('mongoose');
var TeacherModel = db.model('Teacher');
var Log = require('log');
var logger = new Log('debug');

exports.saveTeacher = function (req, res, next) {

    var teacher = new TeacherModel({
        username: req.body.username,
        name: {
            first: req.body.first,
            last: req.body.last
        },
        position: req.body.position,
        password: req.body.username,
        userrole: "teacher"
    });

    teacher.save(function (err, teacher, numberAffected) {
        console.log("[DEBUG]:teacherMgr.saveTeacher invoked");
        if (!err) {
            //console.dir(teacher);
            logger.debug("teacher is %s", teacher);
            res.redirect('/admin/teacher/list');
        } else {
            console.dir(err);
            req.flash('error', "Add Teacher failed!");
            res.redirect('/admin/teacher/add');
        }
    });
};

exports.listTeacher = function (req, res) {
    var user = req.session.userinfo;
    if (user) {
        TeacherModel.find({userrole: "teacher"}, function (err, docs) {
            res.render('admin/listTeacher', {
                title: 'List teachers',
                username: user.username,
                teachers: docs
            });
        });
    } else {
        res.redirect('/index');
    }
};

exports.viewTeacher = function (req, res, next) {
    var id = req.params.id;
    TeacherModel.findById(id, function (err, doc) {
        if (!err) {
            res.render('admin/viewTeacher', {
                title: 'Teacher Detail',
                teacher: doc
            });
        } else {
            next(err);
        }

    });
};

exports.updateTeacher = function (req, res, next) {
    var id = req.params.id;
    var updatedTeacher = {
        username: req.body.username,
        name: {
            first: req.body.first,
            last: req.body.last
        },
        position: req.body.position,
        password: req.body.username
    };

    TeacherModel.findByIdAndUpdate(id, updatedTeacher, function (err, doc) {
        if (!err) {
            console.dir(doc);
            res.redirect("/admin/teacher/list");
        } else {
            console.dir(err);
            next(err);
        }
    })
};

exports.deleteTeacher = function (req, res, next) {
    console.log("[DEBUG]:teacherMgr.deleteTeacher invoked");
    var id = req.params.id;
    TeacherModel.findByIdAndRemove(id, function (err) {
        if (!err) {
            res.redirect('/admin/teacher/list');
        } else {
            next(err);
        }
    });
};