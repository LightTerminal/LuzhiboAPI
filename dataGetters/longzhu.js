var shareadFuns = require("../shareadFuns");

exports.getRoomID = function (url, callback) {
    if (callback == undefined)
        return;
    url = url.toLowerCase();
    var id = url.match(/longzhu\.com\/(\w+)/)[1];
    url = "http://searchapi.plu.cn/api/search/room?title=" + id;
    shareadFuns.httpGet(url,
        function (data) {
            var r = null;
            if (data!=null) {
                var j = JSON.parse(data)["items"];
                if (j.length > 0)
                    r = [ 3, j[0]["live"]["isLive"]?id: null ];
            }
            callback(r);
        });
}

exports.getLiveInfo = function (id, callback) {
    if (callback == undefined)
        return;
    var a = "http://roomapicdn.plu.cn/room/RoomAppStatusV2?domain=" + id;
    shareadFuns.httpGet(a,
        function (data) {
            var r = null;
            if (data != null) {
                var j = JSON.parse(data)["BaseRoomInfo"];
                var c = j["Name"],
                    d = j["Desc"],
                    e = j["BoardCastTitle"],
                    i = j["Id"];
                a = "http://livestream.plu.cn/live/getlivePlayurl?roomId=" + i;
                shareadFuns.httpGet(a,
                    function(data) {
                        if (data != null) {
                            var b = JSON.parse(data)["playLines"][0]["urls"][0]["securityUrl"];
                            r = {
                                RoomID: id,
                                iveNick: c,
                                RoomDetails: d,
                                RoomTitle: e,
                                LivingIMG: "",
                                VideoUrl: b
                            }
                        }
                        callback(r);
                    });
            } else
                callback(r);
        });
}