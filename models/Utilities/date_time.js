module.exports = {
        getDate : function() {
        var myDate = new Date();
        var strDate = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate();
        strDate += " ";
        strDate += myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds();
        return strDate;
    }
}