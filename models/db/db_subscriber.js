/**
 * Created by lenova on 11/12/2016.
 */

var con=require("./DbConnectionHandler");
con=con.dbConnection();

exports.subEmailIdExists = function (subemail, callback = null) {
    con.query("SELECT COUNT(*) as count FROM subscriber WHERE ?", subemail, function (err, rows) {
        if (err != null) {
            console.log(err);
        } else {
            if(callback != null) {
                callback(rows[0]['count'] == 0);
            }
        }
    });
};

exports.insertSubscriber = function ($subemail, callback = null) {
    con.query("INSERT INTO subscriber SET ?", $subemail, function (err, rows) {
        if (err != null) {
            console.log(err);
            callback(false, true);
        } else {
            if(callback != null) {
                callback(rows["affectedRows"] == 1, true);
            }
        }
    });
};

exports.getAllSubscribers = function (callback = null) {
    con.query("SELECT GROUP_CONCAT(email SEPARATOR ', ') AS emails FROM subscriber", function (err, rows) {
        if (err != null) {
            console.log(err);
            callback(false, true);
        } else {
            if(callback != null) {
                callback(rows);
            }
        }
    });
}