/**
 * Created by Aqib Butt on 19.11.2016.
 */
var con=require("./DbConnectionHandler");
con=con.dbConnection();

exports.getResetRecord = function ($record, callback = null) {
    con.query("SELECT COUNT(*) as count FROM resetpasswordrecord WHERE ? AND ? AND ?", $record, function (err, rows) {
        if (err != null) {
            console.log(err);
        } else {
            if(callback != null) {
                callback(rows);
            }
        }
    });
};

exports.insertRecord = function ($record) {
    con.query('INSERT INTO resetpasswordrecord SET ?', $record,function (err, rows) {
        if (err != null) {
            res.end("Query error:" + err);
        } else {
            console.log("inserted");
            return ;
        }
    });
};

exports.updateRecord = function ($record, callback = null) {
    con.query('UPDATE resetpasswordrecord SET ? WHERE ?', [$record.update, $record.where]   ,function (err, rows) {
        if (err != null) {
            console.log(err);
        } else {
            if(callback != null) {
                callback(rows['affectedRows'] > 0);
            }
        }
    });
};