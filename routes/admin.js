var express = require('express');
var router = express.Router();
var db = require('../models/db/db_user');

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.usertype == 'admin') {
        res.render('sendletter', {title: 'Instant Merge'});
    } else if (req.session.uname == null) {
        res.render('login', {title: 'Instant Merge'});
    }else {
        res.redirect('/user');
    }
});

module.exports = router;
