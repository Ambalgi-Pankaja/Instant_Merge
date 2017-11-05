var express = require('express');
var path = require('path');
var app = express();
var session = require('express-session');//for sessions implementation
var sockets = [];

//==============Start Including controllers===========================
var index=require("./routes/index");

var user=require("./routes/user");
var admin = require('./routes/admin');
var chat=require("./routes/chat");
var resetpassword=require("./routes/resetpassword");
var comment=require("./routes/comment");
var sheet=require("./routes/sheet");
//============== End Including controllers===========================

//========================Start Socket Stuff====================================//
var http = require('http').Server(app);
var io = require('socket.io')(http);
http.listen(3000, function(){
    console.log('Instant Merge is now listening on 3000!');
});

io.on('connection', function(socket){

    socket.on('initialized', function (sheetid, userid) {
        if(sockets[sheetid] == null) {
            sockets[sheetid] = [];
        }
        sockets[sheetid][userid] = socket;
    });

    socket.on('disconnect', function() {
       for(var sheetid in sockets) {
           for(var userid in sockets[sheetid]) {
                if(sockets[sheetid][userid]==socket) {
                    sockets[sheetid].pop(userid);
                }
           }
       }
    });

    socket.on('afterRemoveCol', function (index, amount, sheetid, userid) {
        emitNotificationToConnectedUserOnSameSheet('afterRemoveCol', index, amount, sheetid, userid);
    });

    socket.on('afterRemoveRow', function (index, amount, sheetid, userid) {
        emitNotificationToConnectedUserOnSameSheet('afterRemoveRow', index, amount, sheetid, userid);
    });
    
    socket.on('afterSelection', function (sr, sc, er, ec, sheetid, userid) {
        emitNotificationToConnectedUserOnSameSheet('afterSelection', sr, sc, er, ec, sheetid, userid);
    });

    socket.on('afterDeSelection', function (lsr, lsc, ler, lec, sheetid, userid) {
        emitNotificationToConnectedUserOnSameSheet('afterDeSelection', lsr, lsc, ler, lec, sheetid, userid);
    });

    socket.on('afterCreateRow', function (index, amount, sheetid, userid) {
        emitNotificationToConnectedUserOnSameSheet('afterCreateRow', index, amount, sheetid, userid);
    });

    socket.on('afterCreateCol', function (index, amount, sheetid, userid) {
        emitNotificationToConnectedUserOnSameSheet('afterCreateCol', index, amount, sheetid, userid);
    });

    socket.on('beforeAutofill', function (start,end,data, sheetid, userid) {
        emitNotificationToConnectedUserOnSameSheet('beforeAutofill', start,end,data, sheetid, userid);
    });

    socket.on('afterSetDataAtCell', function (changes, source, sheetid, userid) {
        emitNotificationToConnectedUserOnSameSheet('afterSetDataAtCell', changes, source, sheetid, userid);
    });

    socket.on('afterSetCellMeta', function (row, col, className, sheetid, userid) {
        emitNotificationToConnectedUserOnSameSheet('afterSetCellMeta', row, col, className, sheetid, userid);
    });

    socket.on('mergeCells', function (sr, sc, er, ec, value, sheetid, userid) {
        emitNotificationToConnectedUserOnSameSheet('mergeCells', sr, sc, er, ec, value, sheetid, userid);
    });

    socket.on('im_saveSheet', function (sheetData, sheetid, userid) {
        sheet.saveSheet(sheetData, sheetid, userid, function (saved) {
            socket.emit('im_saveSheet', saved);
        });
    });

    socket.on('im_createSheet', function (sheetName, userid) {
        sheet.createSheet(sheetName, userid, function (created, sheetid) {
            socket.emit('im_createSheet', created, sheetid);
        });
    });

    socket.on('im_signup_uname_change', function (username) {
        user.usernameExists(username, function (unique) {
            socket.emit('im_signup_uname_change', unique);
        });
    });


    socket.on('im_signup_email_change', function (email) {
        user.emailIdExists(email, function (unique) {
            socket.emit('im_signup_email_change', unique);
        });
    });

    socket.on('im_signup_submit', function (uname, fname, lname, email, pass) {
        user.createUser(uname, fname, lname, email, pass, function (userCreated) {
            socket.emit('im_signup_submit', userCreated);
        });
    });

    socket.on('im_post_comment', function (commentVal, username, sheetid, userid) {
        comment.postComment(commentVal, sheetid, userid, function (posted) {
            emitNotificationToAllConnectedUsersOnSameSheet('im_post_comment', posted, commentVal, username, sheetid, userid);
        });
    });

    socket.on('im_post_chat', function (chatVal, username, sheetid, userid) {
        chat.postchat(chatVal, sheetid, userid, function (posted) {
            emitNotificationToAllConnectedUsersOnSameSheet('im_post_chat', posted, chatVal, username, sheetid, userid);
        });
    });
    
    socket.on('im_getUpdatedSheetData', function (sheetid, userid){
        if(sockets[sheetid]!=null){
            for(var  userIndex in sockets[sheetid]) {
                if(userIndex != userid) {
                    sockets[sheetid][userIndex].emit('im_getUpdatedSheetData',userid);
                    break;
                }
            }
        }
    });

    socket.on('im_sendUpdatedSheetData', function (sheetdata, sheetid,recieverid){
        sockets[sheetid][recieverid].emit('im_sendUpdatedSheetData',sheetdata);
    });

    socket.on('im_subscriber_submit', function (subemail) {
        user.insertSubscriber(subemail, function (userSubscribed, isUnique) {
            socket.emit('im_subscriber_submit', userSubscribed, isUnique);
        });
    });
    
    socket.on('im_share_sheet', function (email, username, sheetid, userid) {
        sheet.shareSheet(email, sheetid, function (status) {
            if(status == 'shared') {
                app.mailer.send('share_sheet_template', {
                    to: email,
                    subject: 'Instant Merge | Sharing Worksheets', // REQUIRED.
                    username: username
                }, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    socket.emit('im_share_sheet', 'shared');
                });
            }else {
                socket.emit('im_share_sheet', status);
            }
        });
    });
});

function emitNotificationToConnectedUserOnSameSheet(title, ...values) {
    var sheetid = values[values.length-2];
    var userid = values[values.length-1];

    for(var  userIndex in sockets[sheetid]) {
        if(userIndex != userid) {
            sockets[sheetid][userIndex].emit(title, values);
        }
    }
}

function emitNotificationToAllConnectedUsersOnSameSheet(title, ...values) {
    var sheetid = values[values.length-2];
    var userid = values[values.length-1];

    for(var  userIndex in sockets[sheetid]) {
        sockets[sheetid][userIndex].emit(title, values);
    }
}

//========================EnD Socket Stuff====================================

//===============================All this stuff is for passing values from one page to an other and
//===============================parsing data as well==============================================//
// var cookieParser = require('cookie-parser'); //for cookies
var bodyParser = require('body-parser');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
//===============================END All this stuff is for passing values from one page to an other and parsing data as well==============================================//

//===============Sessions Work=================================

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(logger('dev'));

app.use(session({secret: 'ssshhhhh',
    duration: 30 * 60 * 1000,
    resave: true,
    activeDuration: 5 * 60 * 1000,
    saveUninitialized: true

}));
//===============End Sessions Work=================================


//============== Start Initializing View Engine  ====================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//============== End Initializing View Engine  ======================


//============== Start Static Base Directory Inclusion ==============
app.use(express.static(__dirname + '/public'));
//============== Start Static Base Directory Inclusion ==============


//============== Start Access Session on All Views===================
app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});
//============== End Access Session on All Views=====================

//============== Start Using controllers=============================
app.use('/index',index);
app.use('/admin',admin);
app.use('/',index);
app.use('/user',user.router);
app.use('/sheet',sheet.router);
app.use('/reset',resetpassword.router);
app.use('/chat',chat.router);
app.use('/comment',comment.router);
//============== End Using controllers===============================
//========================Start Facebook Authentication=========================//
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
passport.use(new Strategy({
        clientID: "222956611472007",
        clientSecret: "ddd2375f420ca7b20959aa71383a9b31",
        callbackURL: 'http://localhost:3000/login/facebook/return',
        profileFields: ['id','displayName', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
    },
    function(accessToken, refreshToken, profile, cb) {
        // In this example, the user's Facebook profile is supplied as the user
        // record.  In a production-quality application, the Facebook profile should
        // be associated with a user record in the application's database, which
        // allows for account linking and authentication with other identity
        // providers.
        return cb(null, profile);
    }));
passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});
app.use(passport.initialize());
app.use(passport.session());

app.get('/login/facebook',
    passport.authenticate('facebook',{ scope: [ 'email' ] }) );

app.get('/login/facebook/return',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        var db=require('./models/db/db_user');
        var a=req.body
        req.session.uname=req.user.displayName;
        req.session.fname=req.user._json['first_name'];
        req.session.lname=req.user._json['last_name'];
        req.session.email=req.user._json['email'];
        req.session.id=req.user.id;
        res.locals.session = req.session;
        db.selectUserByfbid(res,req,req.session.email)

    }
);
//========================End Facebook Authentication=========================//

//========================Start Email Configuration=========================//
var mailer = require('express-mailer');
var md5 = require('./models/Utilities/md5');

mailer.extend(app, {
    from: 'no-reply@instantmerge.com',
    host: 'smtp.gmail.com', // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
    auth: {
        user: 'haseeb.iqbal29@gmail.com',
        pass: 'test.pass.123'
    }
});
//========================End Email Configuration=========================//

//========================Start GET/POSt Request Handling=========================//
app.post('/forgotpassword', function (req, res, next) {
    user.checkEmailExistance(req.body.email, function (userExist, userid) {
        if(userExist) {
            app.mailer.send('forgotpassword_template', {
                to: req.body.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
                subject: 'Instant Merge | Forgot Password', // REQUIRED.
                userid : userid,
                hash : md5.getHash(userid+'')
                 // All additional properties are also passed to the template as local variables.
            }, function (err) {
                if (err) {
                    res.render('forgotpassword', {title : 'Instant Merge', error : 'Unable to send the link. Please try again later.'});
                }else {
                    res.render('forgotpassword', {title: 'Instant Merge', error: 'Password reset link sent.'});
                }
            });
        }else {
            res.render('forgotpassword', {title : 'Instant Merge', error : 'No user exist with this email.'});
        }
    });
});

app.post('/sendletter', function (req, res, next) {
    var db_sub = require('./models/db/db_subscriber');
    db_sub.getAllSubscribers(function (subscribers) {
        if(subscribers[0]['emails'] != null) {
            app.mailer.send('news_letter_template', {
                to: subscribers[0]['emails'],
                subject: 'Instant Merge | News Letter | ' + req.body.subject,
                body: req.body.letter,
            }, function (err) {
                if (err) {
                    console.log(err);
                    res.render('sendletter', {
                        title: 'Instant Merge',
                        error: 'Something went wrong. Please try again later.'
                    });
                }else {
                    res.render('sendletter', {title: 'Instant Merge', error: 'Letter sent to all subscribers.'});
                }
            });
        }else {
            res.render('sendletter', {title: 'Instant Merge', error: "You don't have any subscriber yet!"});
        }
    });
});

app.get('/sendletter', function (req, res, next) {
    res.redirect('/admin');
});

//========================Start GET/POSt Request Handling=========================//

module.exports = app;