
var shareadFuns = require("../shareadFuns");

exports.getRoomID = function (url, callback) {
    if (callback == undefined)
        return;
    url = url.toLowerCase();
    var id = url.match(/quanmin\.tv\/v\/(\w+)/)[1];
    url = "http://www.quanmin.tv/json/rooms/"+id+"/info1.json";
    shareadFuns.httpGet(url,
        function (data) {
            var r = null;
            if (data != null) {
                var j = JSON.parse(data);
                r = [, j["play_status"] ? id : null];
            }
            callback(r);
        });
}

exports.getLiveInfo = function(id, callback) {
    if (callback == undefined)
        return;
    var a = "http://www.quanmin.tv/json/rooms/" + id + "/info1.json";
    shareadFuns.httpGet(a,
        function(data) {
            var r = null;
            if (data != null) {
                var j = JSON.parse(data),
                    c = j["title"],
                    d = j["nick"],
                    e = j["intro"],
                    f = j["thumb"],
                    g = "http://flv.quanmin.tv/live/" + id + ".flv";
                r = {
                    RoomID: id,
                    RoomTitle: c,
                    LiveNick: d,
                    RoomDetails: e,
                    LivingIMG: f,
                    VideoUrl: g
                };
            }
            callback(r);
        });
}