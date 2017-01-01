var getters = [require("./douyu"), require("./panda"), require("./zhanqi"), require("./longzhu"), require("./huya"), require("./qie"), require("./bilibili"), require("./quanmin"), require("./huajiao"), require("./huomao")];

module.exports = function (url) {
    var getter = checkUrl(url);
    if (getter == null)
        return false;

    var id = null;
    this.getRoomID= function(callback) {
        if (callback == undefined || getter==null)
            return;
        getter.getRoomID(url,function(room) {
            if (room != null && room[1] != null)
                id = room[1];
            callback(room);
        });
    }

    this.getLiveInfo= function(callback) {
        if (callback == undefined || getter == null || id==null)
            return;
        getter.getLiveInfo(id, function (live) {
            callback(live);
        });
    }
    return true;
}

function checkUrl(url) {
    url = url.toLowerCase();
    var regs = [
        /(douyu\.tv)|((douyu)|(douyutv)\.com)/,
        /panda\.tv/,
        /zhanqi\.tv/,
        /longzhu\.com/,
        /huya\.com/,
        /live\.qq\.com/,
        /live\.bilibili\.com/,
        /quanmin\.tv/,
        /huajiao\.com/,
        /huomao\.com/
    ];
    for (var i = 0; i < regs.length; i++) {
        if (regs[i].test(url))
            return getters[i];
    }
    return null;
}