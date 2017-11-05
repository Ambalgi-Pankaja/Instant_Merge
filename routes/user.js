/**
 * Created by Aqib Butt on 19.11.2016.
 */
var express = require('express');
var router = express.Router();
var db=require('../models/db/db_user');
var md5 = require('../models/Utilities/md5');

/* GET home page. */

router.get('/users', function(req, res, next) {
  res.render('index', { title: 'Hallo Instant Merge Chat' });
  db.SelectAllUsers();
});

router.get('/user', function(req, res, next) {
  res.render('index', { title: 'Hallo Instant Merge Chat' });
  db.selectUserById(5);
});

router.get('/update', function(req, res, next) {
  res.render('index', { title: 'Hallo Instant Merge Chat' });
  db.updateUser();
});

router.get('/delete', function(req, res, next) {
  res.render('index', { title: 'Hallo Instant Merge Chat' });
  db.deleteUser();
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Hallo Instant Merge Chat' });
  });

router.get('/chat', function(req, res, next) {
  res.render('chat', {
                title: 'Hallo Instant Merge Chat',
                sheet : req.query.sheetid,
                user : req.query.userid
            });
});

router.get('/login', function(req, res, next) {
    showHomeWithData(req, res, next);
});

router.get('/', function(req, res, next) {
    showHomeWithData(req, res, next);
});

router.post('/login', function(req, res, next) {
    db.authenticateUser(
        [
            { uname : req.body.uname },
            { password : md5.getHash(req.body.pass)}
        ],
        function (rows) {
            if(rows.length != 1) {
                res.render('login', {
                        title : 'Instant Merge',
                        error : 'username or password is incorrect'
                    }
                );
            }else {
                req.session.uname = rows[0]['uname'];
                req.session.userid = rows[0]['userid'];
                res.locals.session = req.session;

                if(rows[0]['uname'] == 'admin') {
                    req.session.usertype = 'admin';
                    res.redirect('/admin');
                } else {
                    showHomeWithData(req, res, next);
                }
            }
        }
    );
});

router.get('/logout', function(req, res, next) {
    req.session.uname = null;
    req.session.userid = null;
    req.session.sheetid = null;
    req.session.usertype = null;
    res.locals.session = req.session;

    res.render('login', {title: 'Instant Merge'});
});

router.get('/selectsheet', function(req, res, next) {
    if(req.session.userid != null) {
        req.session.sheetid = req.query.sheetid;
        res.locals.session = req.session;
        res.redirect('/user');
    } else {
        res.render('login', {title: 'Instant Merge'});
    }
});

router.post('/fblogin', function(req, res, next) {

    db.setfbData(req,res,req.session);
    if(req.body.password==req.body.repassword) {
        var user = {
            uname : req.session.uname,
            fname: req.session.fname,
            lname: req.session.lname,
            email: req.session.email,
            password: req.body.password
        }
        db.insertFbUser(res,req,    user);
    }else  {
        res.render('password', {title: 'Instant Merge','username' : req.session.passport.uname ,'error' : "Password Not Matched"});

    }
});

router.post('/reset', function (req, res, next) {
    if(req.body.password != req.body.cpassword){
        res.render('reset_password', {
            title : 'Instant Merge',
            userid : req.body.userid,
            error : 'Password and Confirm Password should be same.'
        });
    } else {
        var user = {
            update: {
                password: req.body.password
            },
            where: {
                userid: req.body.userid
            }
        };
        db.updateUser(user, function (updated) {
            if(updated) {
                var resetPassRec = require('./resetpassword');
                resetPassRec.expireLink(req.body.userid, function (expired) {
                    if(expired) {
                        res.render('login', {
                            title: 'Instant Merge',
                            error: 'Password reset successfully.'
                        });
                    }else {
                        res.render('login', {
                            title: 'Instant Merge',
                            error: 'Some problem occured. Please try agin.'
                        });
                    }
                });
            }
        });
    }
});

function showHomeWithData(req, res, next) {
    if (req.session.uname == null) {
        res.render('login', {title: 'Instant Merge'});
    } else {
        var db_sheet = require('../models/db/db_sheet');
        var db_comment = require('../models/db/db_comment');
        var db_chat = require('../models/db/db_chat');
        if(req.session.sheetid == null) {
            db_sheet.selectAllSheets(req.session.userid, function (rows) {
                res.render('home', {
                    title: 'Instant Merge',
                    sheets : rows
                });
            });
        } else {
            db_sheet.getSheetData({sheetid: req.session.sheetid}, function (sheetData) {
                db_sheet.selectAllSheets(req.session.userid, function (sheets) {
                    db_comment.selectSheetComments(req.session.sheetid, function (comments) {
                        db_chat.getSheetChat(req.session.sheetid, function (chatmessages) {
                            res.render('home', {
                                title: 'Instant Merge',
                                sheetData: sheetData,
                                sheets : sheets,
                                comments : comments,
                                chatmessages : chatmessages
                            });
                        });
                    });
                });
            });
        }
    }
};

module.exports = {
    usernameExists : function (username, callback) {
        var user = {
            uname : username
        }
        db.usernameExists(user, callback);
    },
    emailIdExists : function (email, callback) {
        var email = {
            email : email
        }
        db.emailIdExists(email, callback);
    },
    createUser : function (uname, fname, lname, email, pass, callback) {
        var user = {
            uname : uname,
            fname: fname,
            lname: lname,
            email: email,
            password: md5.getHash(pass)
        }
        db.insertUser(user, callback);
    },
    showHomeWithData : function(req, res, next) {
        showHomeWithData(req, res, next);
    },
    checkEmailExistance : function (email, callback) {
        db.checkEmailExistance({email : email}, callback);
    },
    insertSubscriber: function (subemail, callback){
        var db_sub = require('../models/db/db_subscriber');
        var subemail ={
            email: subemail
        };
        db_sub.subEmailIdExists(subemail,function (unique) {
            if(unique) {
                db_sub.insertSubscriber(subemail, callback);
            }else {
                callback(false, false);
            }
        });
    },
    router: router
};
