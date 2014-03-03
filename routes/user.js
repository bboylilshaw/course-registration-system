var db = require('mongoose');
var UserModel = db.model('User');

exports.signin = function (req, res, next) {
    var user = {
        username: req.body.username,
        password: req.body.password,
        userrole: req.body.userrole
    };

    UserModel.findOneAndUpdate(user, {lastLogon: Date.now()}, function (err, doc) {
        if (!err) {
            if (doc) {
                req.session.userinfo = doc;
                console.log("User: " + user.username + " signed in");
                res.redirect("/" + doc.userrole + "/home");
            } else {
                console.log("User not found!");
                res.redirect("/index");
            }
        } else {
            next(err);
        }
    });
};

exports.signout = function (req, res) {
    if (req.session.userinfo) {
        console.log("User: " + req.session.userinfo.username + " signed out");
        req.session = null;
        res.redirect('/index');
    } else {
        res.redirect('/index');
    }
};

exports.getChangePasswordPage = function (req, res) {
    var user = req.session.userinfo;
    if (user) {
        res.render(user.userrole + '/changePassword', {
            title: 'Change my password',
            message: req.flash('warn')
        });
    } else {
        res.redirect('/index');
    }
};

exports.updatePassword = function (req, res, next) {
    var user = req.session.userinfo;
    var password = user.password;
    var oldPassword = req.body.oldpwd;
    var newPassword = req.body.newpwd;
    var confirmNewPassword = req.body.confirmnewpwd;

    if (oldPassword !== password) {
        console.log("Old password is incorrect!");
        req.flash('warn', 'Old password is incorrect!');
        res.redirect('/admin/password/change');
    } else if (newPassword !== confirmNewPassword) {
        console.log("The password you input twice is inconsistent!");
        req.flash('warn', 'The password you input twice is inconsistent!');
        res.redirect('/admin/password/change');
    } else if (oldPassword === newPassword) {
        console.log("New password and old password cannot be same!");
        req.flash('warn', 'New password and old password cannot be same!');
        res.redirect('/admin/password/change');
    } else {
        UserModel.findByIdAndUpdate(user._id, {password: newPassword}, function (err, doc) {
            if (!err) {
                console.log("Password has been changed!");
                req.session.userinfo = doc;
                res.redirect('/admin/home');
            } else {
                next(err);
            }
        });
    }
};