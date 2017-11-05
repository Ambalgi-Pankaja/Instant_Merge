/**
 * Created by abhishek on 12/13/2016.
 */
module.exports = {
    getHash : function(plainString) {
        var crypto = require('crypto');
        var hash = crypto.createHash('md5').update(plainString).digest('hex');
        hash = hash.substring(14, 19) + '' + hash.substring(20, 25);
        hash = hash.split('').reverse().join('');
        return hash;
    }
}