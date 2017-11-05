/**
 * Created by Aqib Butt on 19.11.2016.
 */
var express = require('express');
var router = express.Router();
var db=require('../models/db/db_chat');
var date_time = require('../models/Utilities/date_time');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Hallo Instant Merge Chat' });
    var $chat = {
        sheetid : 1
    };
    db.getSheetChat($chat);
});

router.get('/add', function(req, res, next) {
    res.render('index', { title: 'Hallo Instant Merge Chat' });
    var $chat = {
            userid:2,
            sheetid:1,
            message:"some message"
    };
    db.insertChatMessage($chat);
});

router.get('/delete', function(req, res, next) {
    res.render('index', { title: 'Hallo Instant Merge Chat' });
    var $delete = {
            chatid : 9
    };
    db.deleteChatMessage($delete);
});

module.exports = {
    router : router,
    postchat : function (chatVal, sheetid, userid, callback) {
        var  chat = {
            userid: userid,
            sheetid: sheetid,
            message: chatVal,
            addedon : date_time.getDate()
        };
        db.insertChatMessage(chat, callback);
    }
};