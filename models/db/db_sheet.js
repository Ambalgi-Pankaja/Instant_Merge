/**
 * Created by Aqib Butt on 19.11.2016.
 */
var con=require("./DbConnectionHandler");
con=con.dbConnection();

exports.selectAllSheets = function ($userid, callback = null) {
    con.query('SELECT s.sheetname, s.sheetid FROM `sheet` s, `usersheetmapping` m WHERE s.sheetid = m.sheetid AND m.userid=' + $userid, function (err, rows) {
        if (err != null) {
            console.log(err);
        } else {
            if(callback != null) {
                callback(rows);
            }
        }
    });
};

exports.selectSheetBySheetId = function ($sheetId) {
    con.query("SELECT * from sheet where sheetid=?", $sheetId, function (err, rows) {
        if (err != null) {
            res.end("Query error:" + err);
        } else {
            console.log("Selected sheet is");
            console.log(rows);
            return rows;
        }
    });
};
exports.updateSheet = function ($sheet, callback = null) {
    con.query("UPDATE sheet SET ? where ?", [$sheet.update, $sheet.where], function (err, rows) {
        if (err != null) {
            res.end("Query error:" + err);
        } else {
            if(callback != null) {
                callback(rows['affectedRows'] == 1);
            }
        }
    });
};

exports.deleteSheetBySheetId = function ($sheetId) {
    con.query ("DELETE from sheet where sheetid=?" + $sheetId, function (err,rows) {
        if (err != null) {
            res.end("Query error:" + err);
        } else {
            console.log("Sheet deleted");
            console.log(rows);
            return rows;
        }
    });
};

exports.addSheet = function ($sheet, callback = null) {
    con.query ("INSERT INTO sheet SET ?", $sheet, function (err, rows) {
        if (err != null) {
            console.log(err);
        } else {
            var mapping = {
                sheetid : rows['insertId'],
                userid : $sheet.createdby
            };
            con.query ("INSERT INTO usersheetmapping SET ?", mapping, function (err, rows) {
                if(callback != null) {
                    callback(rows['affectedRows'] == 1, mapping.sheetid);
                }
            });
        }
    });
};

exports.getSheetData = function (sheet, callback = null) {
    con.query('SELECT * FROM sheet WHERE ?', sheet, function (err, rows) {
        if (err != null) {
            console.log(err);
        } else {
            if(callback != null) {
                callback(rows[0]['data']);
            }
        }
    });
};

exports.shareSheet = function (userid, sheetid, callback = null) {
    var mapping = [
        {sheetid : sheetid},
        {userid : userid}
    ];
    con.query ("SELECT COUNT(*) as count FROM usersheetmapping WHERE ? AND ?", mapping, function (err, rows) {
        if (err != null) {
            console.log(err);
            callback('error');
        }
        else if(rows[0]['count'] == 0) {
            var mapping = {
                sheetid: sheetid,
                userid: userid
            };
            con.query ("INSERT INTO usersheetmapping SET ?", mapping, function (err, rows) {
                if (err != null) {
                    console.log(err);
                    callback('error');
                }
                else if(rows['affectedRows'] == 1) {
                    callback('shared');
                }else {
                    callback('error');
                }
            });
        }else {
            callback('already_shared');
        }
    });
};