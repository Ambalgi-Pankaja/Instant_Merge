/**
 * Created by Aqib Butt on 19.11.2016.
 */
var dbconnection=function () {
    var mysql = require('mysql');
    var sql = mysql.createConnection({
        host : 'localhost',
        port : 3306,
        database: 'instantmerge',
        user : 'root',
        password : ''
    });
    sql.connect(function(err){
        if(err!=null)console.log(err);
        else
            console.log("DB Connection successfully made");
    });
    return sql;
};
exports.dbConnection = dbconnection;

