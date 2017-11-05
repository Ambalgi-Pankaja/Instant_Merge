/**
 * Created by Aqib Butt on 19.11.2016.
 */
var express = require('express');
var router = express.Router();
var db=require('../models/db/db_comment');
var date_time = require('../models/Utilities/date_time');

/* GET home page. */
router.get('/comments', function(req, res, next) {
    res.render('index', { title: 'Hallo Instant Merge Comments' });
    var $sheetid = {
        sheetid : 1
    };
    db.selectSheetComments($sheetid);
});

router.get('/update', function(req, res, next) {
    res.render('index', { title: 'Hallo Instant Merge Comments' });
    var $comment = {
        update : {
            description : 'updated comment'/*TODO update addedon*/
        },
        where : {
            commentid : 1
        }
    };
    db.updateComment($comment);
});

router.get('/delete', function(req, res, next) {
    res.render('index', { title: 'Hallo Instant Merge Comments' });
    var $commentid = {
        commentid : 1
    };
    db.deleteComment($commentid);
});

module.exports = {
    router : router,
    postComment : function (commentVal, sheetid, userid, callback) {
        var  comment = {
            userid: userid,
            sheetid: sheetid,
            description: commentVal,
            addedon : date_time.getDate()
        };
        db.insertComment(comment, callback);
    }
};