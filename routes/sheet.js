/**
 * Created by Aqib Butt on 19.11.2016.
 */
var express = require('express');
var router = express.Router();
var db=require('../models/db/db_sheet');
var date_time = require('../models/Utilities/date_time');

/* GET home page. */
router.get('/allsheets', function(req, res, next) {
    res.render('index', { title: 'Hallo Instant Merge Sheet' });
    console.log("Hallo Instant Merge Sheet");
    var $sheet=
            {
                createdby: 1
            };
    db.selectAllSheets($sheet);
});

router.get ('/selectedsheet', function(req,res,next) {
    res.render('index', {title: 'The selected sheet is '});
    db.selectSheetBySheetId(req.query.sheetid);
});

router.get ('/updatedsheet', function( req, res, next) {
    res.render('index', {title: 'The updated sheet is...'});
    var $sheet = {
        update : {
            data : req.query.sheetdata,
            lastmodifiedby: req.query.lmb
        },
        where : {
            sheetid : req.query.sheetid
        }
    };
    db.updateSheet($sheet);
});

router.get ('/deletedsheet', function (req, res, next){
    res.render('index', {title: "The deleted sheet is ..."});
    db.deleteSheetBySheetId(req.query.sheetid);
});

router.get ('/addsheet', function  (req,res, next) {
    res.render('index', {title: "The added sheet is ....."});
    var sheet = {
        sheetname : 'new name',
        data: 'Added Sheet',
        createdby: 1,
        lastmodifiedby: 1
    };
    db.addSheet(sheet);
});

module.exports = {
    createSheet : function (sheetName, userid, callback) {
        var sheet = {
            sheetname : sheetName,
            data:  null,
            createdby: userid,
            lastmodifiedby: userid,
            createdon : date_time.getDate(),
            lastmodifiedon : date_time.getDate()
        };

        db.addSheet(sheet, callback);
    },
    saveSheet : function (sheetData, sheetid, userid, callback) {
        var $sheet = {
            update : {
                data : sheetData,
                lastmodifiedby: userid,
                lastmodifiedon : date_time.getDate()
            },
            where : {
                sheetid : sheetid
            }
        };
        db.updateSheet($sheet, callback);
    },
    shareSheet : function (email, sheetid, callback) {
        var user = require('./user');
        user.emailIdExists(email, function (unique, userid) {
            if(unique == false) {
                db.shareSheet(userid, sheetid, callback);
            }else {
                callback('unknown_email');
            }
        });
    },
    router : router
};