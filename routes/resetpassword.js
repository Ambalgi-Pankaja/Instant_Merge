/**
 * Created by Aqib Butt on 19.11.2016.
 */
var express = require('express');
var router = express.Router();
var db=require('../models/db/db_resetpassword');
var md5 = require('../models/Utilities/md5');

/* GET home page. */

router.get('/record', function(req, res, next) {
    res.render('index', { title: 'Hallo Instant Merge Chat' });
    var $record = [
        { recordid : 3 },
        { encryptedstr : 'abc' },
        { expired : 'false' }
    ];
    db.getResetRecord($record);
});

router.get('/add', function(req, res, next) {
    res.render('index', { title: 'Hallo Instant Merge Chat' });
    var $record = {
        encryptedstr : 'encryptedstr',/*TODO encrpty encryptedstr*/
        userid : 1,
        expired : 'false'
    };
    db.insertRecord($record);
});

router.get('/update', function(req, res, next) {
    res.render('index', { title: 'Hallo Instant Merge Chat' });
    var $record = {
        update : {
            expired : 'true'
        },
        where : {
            recordid : 1
        }
    };
    db.updateRecord($record);
});

router.get('/forgot', function (req, res, next) {
    res.render('forgotpassword', {title: 'Hallo Instant Merge Chat'});
});

router.get('/resetlink', function (req, res, next) {
    if(md5.getHash(req.query.u+'') == req.query.h) {
        var $record = [
            { userid : req.query.u },
            { encryptedstr : req.query.h },
            { expired : 'no' }
        ];
        db.getResetRecord($record, function (rows) {
            if(rows[0]['count'] == 1) {
                res.render('reset_password', {title : 'Instant Merge', userid : req.query.u});
            }else {
                res.end('This link is Expired or Invalid.');
            }
        });
    }else {
        res.end('You have clicked an invalid link.');
    }
});

module.exports = {
    router : router,
    expireLink :function(userid, callback) {
        var $record = {
            update : {
                expired : 'yes'
            },
            where : {
                userid : userid
            }
        };
        db.updateRecord($record, callback);
    }
};
