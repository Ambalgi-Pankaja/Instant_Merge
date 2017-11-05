/**
 * Created by Aqib Butt on 19.11.2016.
 */
var con=require("./DbConnectionHandler");
con=con.dbConnection();

exports.getSheetChat = function (sheetid, callback = null) {
    con.query("SELECT c.message, u.uname FROM chatmessage c, user u WHERE c.userid=u.userid and c.sheetid=" + sheetid + " order by addedon", function (err, rows) {
        if (err != null) {
            console.log(err);
        } else {
            if(callback != null) {
                callback(rows);
            }
        }
    });
}

exports.insertChatMessage = function ($chat, callback = null) {
    con.query("INSERT into chatmessage SET ?",$chat, function (err, rows) {
        if (err != null) {
            console.log(err);
        } else {
            if(callback!=null) {
                callback(rows['affectedRows'] == 1);
            }
        }
    });
};

exports.deleteChatMessage = function ($chat) {
    con.query("DELETE FROM chatmessage  WHERE ?", $chat, function (err, rows) {
        if (err != null) {
            res.end("Query error:" + err);
            return ;
        } else {
            console.log("deleted");
            return ;
        }
    });
};