var shareadFuns = require("../shareadFuns");

exports.getRoomID = function (url, callback) {
    if (callback == undefined)
        return;
    shareadFuns.httpGet(url,
        function (data) {
            var r = null;
            if (data!=null) {
                var id = data.match(/"Status":\d,\"RoomId\":\d+/)[0];
                if (shareadFuns.isContains(data, "<title>战旗直播_高清流畅的游戏直播平台 - zhanqi.tv</title>") || id == null) {
                    callback(r);
                    return;
                }
                r = [2, shareadFuns.isContains(data, "\"Status\":4") ? data.match(/("RoomId"):(\d+)/)[2] : null];
            }
            callback(r);
        });
}

exports.getLiveInfo = function (id, callback) {
    if (callback == undefined)
        return;
    var a ="http://apis.zhanqi.tv/static/v2.1/room/"+id + ".json";
    shareadFuns.httpGet(a,
        function (data) {
            var r = null;
            if (data!=null) {
                var j = JSON.parse(data)["data"];
                var c = j["nickname"],
                    d = j["title"],
                    e = j["bpic"],
                    f = j["videoIdKey"];
                r = {
                    RoomID: id,
                    LiveNick: c,
                    RoomTitle: d,
                    LivingIMG: e,
                    RoomDetails: "",
                    VideoUrl: "http://wshdl.load.cdn.zhanqi.tv/zqlive/+" + f + ".flv"
                };
            }
            callback(r);
        });
}