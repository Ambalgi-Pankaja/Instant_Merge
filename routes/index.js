var express = require('express');
var router = express.Router();
var db = require('../models/db/db_user');
var session;

/* GET home page. */
router.get('/', function(req, res, next) {
    session = req.session;
    if(session.usertype == 'admin') {
        res.redirect('/admin');
    } else if (session.uname == null) {
        res.render('index', {title: 'Instant Merge'});
    } else {
        var user = require('../routes/user');
        user.showHomeWithData(req, res, next);
    }
});

router.post('/login', function(req, res, next) {
    db.authenticateUser(req, res);
});

router.get('/loginpage', function(req, res, next) {
    session = req.session;
    req.session.users=req.body.users;

    if(session.uname==null) {
        res.render('login', {title: 'Instant Merge'});
    }
    else {
        res.render('home', {title: 'Instant Merge'});
    }
});

module.exports = router;
