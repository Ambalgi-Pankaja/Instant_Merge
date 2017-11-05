/**
 * Created by Aqib Butt on 19.11.2016.
 */
var con=require("./DbConnectionHandler");
con=con.dbConnection();

exports.selectSheetComments = function (sheetid, callback = null) {
    con.query("SELECT c.description, u.uname FROM comment c, user u WHERE c.userid=u.userid and c.sheetid=" + sheetid + " order by addedon", function (err, rows) {
        if (err != null) {
            console.log(err);
        } else {
            if(callback != null) {
                callback(rows);
            }
        }
    });
}

exports.insertComment = function (comment, callback = null) {
    con.query("INSERT INTO comment SET ?",comment, function (err, rows) {
        if (err != null) {
            console.log(err);
        } else {
            if(callback != null) {
                callback(rows['affectedRows'] == 1);
            }
        }
    });
}

exports.updateComment = function ($comment) {
    con.query("UPDATE comment SET ? WHERE ?", [$comment.update, $comment.where], function (err, rows) {
        if (err != null) {
            res.end("Query error:" + err);
        } else {
            console.log("Updated");
            return;
        }
    });
}

exports.deleteComment = function ($commentid) {
    con.query("DELETE FROM comment WHERE ?", $commentid, function (err, rows) {
        if (err != null) {
            res.end("Query error:" + err);
            return ;
        } else {
            console.log("Deleted");
            return ;
        }
    });
}

