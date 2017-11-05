/**
 * Created by Aqib Butt on 19.11.2016.
 */
var con=require("./DbConnectionHandler");
con=con.dbConnection();

exports.authenticateUser = function (user, callback = null) {
    con.query("SELECT * FROM user WHERE ? AND ?", user, function (err, rows) {
        if (err != null) {
            console.log(err);
        } else {
            if(callback != null) {
                callback(rows);
            }
        }
    });
};

exports.SelectAllUsers = function ($user) {
    con.query("SELECT * from user", function (err, rows) {
        if (err != null) {
            res.end("Query error:" + err);
        } else {
            console.log(rows);
            return;
        }
    });
};

exports.selectUserById = function ($recordid) {
    con.query("SELECT * from user WHERE userid=?", $recordid, function (err, rows) {
        if (err == null) {
            console.log(rows);
            return;
        } else {
            res.end("Query error:" + err);
        }
    });
};

exports.updateUser = function (user, callback = null) {
    con.query('UPDATE user SET ? WHERE ?',  [user.update, user.where], function (err, rows) {
        if (err != null) {
            console.log(err);
        } else {
            if(callback != null) {
                callback(rows['affectedRows'] == 1);
            }
        }
    });
};

exports.deleteUser = function () {
    con.query('DELETE FROM user WHERE userid=7',function (err, rows) {
        if (err != null) {
            res.end("Query error:" + err);
        } else {
            console.log("deleted");
            return ;
        }
    });
};

exports.insertUser = function (user, callback = null) {
    con.query('SELECT COUNT(*) as count FROM user WHERE ? OR ?', [{uname : user.uname}, {email : user.email}], function (err, rows) {
        if (err != null) {
            res.end("Query error:" + err);
        } else {
            if(callback != null) {
                if(rows[0]['count'] == 0){
                    con.query('INSERT INTO user SET ?', user, function (err, rows) {
                        if (err != null) {
                            res.end("Query error:" + err);
                        } else {
                            if(callback != null) {
                                callback(rows['affectedRows'] == 1);
                            }
                        }
                    });
                }else {
                    callback(false);
                }
            }
        }
    });
};

exports.usernameExists = function (user, callback = null) {
    con.query('SELECT COUNT(*) as count FROM user WHERE ?', user, function (err, rows) {
        if (err != null) {
            res.end("Query error:" + err);
        } else {
            if(callback != null) {
                callback(rows[0]['count'] == 0);
            }
        }
    });
};

exports.emailIdExists = function (email, callback = null) {
    con.query('SELECT COUNT(*) as count, userid FROM user WHERE ?', email, function (err, rows) {
        if (err != null) {
            res.end("Query error:" + err);
        } else {
            if(callback != null) {
                callback(rows[0]['count'] == 0, rows[0]['userid']);
            }
        }
    });
};

exports.checkEmailExistance = function (email, callback = null) {
    con.query('SELECT userid FROM user WHERE ?', email, function (err, rows) {
        if (err != null) {
            console.log(err);
        } else {
            if(callback != null) {
                if(rows.length == 1) {
                    var md5 = require('../Utilities/md5');
                    var record = {
                        encryptedstr : md5.getHash(rows[0]['userid']+''),
                        userid : rows[0]['userid'],
                        expired : 'no'
                    };
                    con.query('INSERT INTO resetpasswordrecord SET ?', record, function (err, rows) {
                        if (err != null) {
                            console.log(err);
                        } else {
                            callback(true, record.userid);
                        }
                    });
                } else {
                    callback(false, null);
                }
            }
        }
    });
};

exports.insertFbUser = function (res,req,user) {
    con.query('SELECT COUNT(*) as count FROM user WHERE ? OR ?', [{uname : user.uname}, {email : user.email}], function (err, rows) {
        if (err != null) {
            res.end("Query error:" + err);
        } else {
            console.log(user);
            if(rows[0]['count'] == 0){
                con.query('INSERT INTO user SET ?', user, function (err, rows) {
                    if (err != null) {
                        res.end("Query error:" + err);
                    }


                });
                res.render('home', { title: 'Instant Merge' });
            }else {
                console.log("find");

            }

        }
    });
};

exports.selectUserByfbid = function (res,req,$email) {

    con.query("SELECT * from user WHERE email=?", $email, function (err, rows) {
        if (err == null) {
            console.log(rows);
            if(rows.length>0)
            {
                console.log("found");
                res.render('login', {
                        title : 'Instant Merge',
                        error : 'You already exist'
                    }
                );

            }else {
                console.log("not found");
                res.render('password', { title: 'Hallo Instant Merge Chat',username : req.session.uname });

            }

        } else {
            res.end("Query error:" + err);
        }
    });
};

//for session mentaining
exports.setfbData =function (req, res ,$var)  {
    $data=$var.passport.user._json;
    req.session.uname= $data['name'];
    req.session.fname= $data['first_name'];
    req.session.lname= $data['last_name'];
    req.session.email= $data['email'];
    req.session.id= $data['id'];
    res.locals.session = req.session;
}