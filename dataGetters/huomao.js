
var shareadFuns = require("../shareadFuns");

exports.getRoomID = function (url, callback) {
    if (callback == undefined)
        return;
    shareadFuns.httpGet(url,
        function (data) {
            var r = null;
            if (data != null) {
                var id = data.match(/var cid = (\d+);/)[1];
                if (id != null) {
                    url = "http://api.huomao.com/channels/channelDetail?cid=" + id;
                    shareadFuns.httpGet(url,
                        function(data) {
                            if (data != null)
                                r = [9, shareadFuns.isContains(data, "\"is_live\":1") ? id : null];
                            callback(r);
                        });
                } else
                callback(r);
            } else
                callback(r);
        });
}

exports.getLiveInfo = function(id, callback) {
    if (callback == undefined)
        return;
    var a = "http://api.huomao.com/channels/channelDetail?cid=" + id;
    shareadFuns.httpGet(a,
        function(data) {
            var r = null;
            if (data != null) {
                var j = JSON.parse(data)["data"],
                    c = j["channel"],
                    d = j["username"],
                    e = j["content"],
                    f = j["streamList"][2]["TD"];
                r = {
                    RoomID: id,
                    RoomTitle: c,
                    LiveNick: d,
                    RoomDetails: e,
                    LivingIMG: "",
                    VideoUrl: f
                }
            }
            callback(r);
        });
}