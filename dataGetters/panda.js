var shareadFuns = require("../shareadFuns");

exports.getRoomID = function (url, callback) {
    if (callback == undefined)
        return;
    url = url.toLowerCase();
    var id = url.match(/panda\.tv\/(\d+)/)[1];
    url ="http://www.panda.tv/ajax_search?roomid="+id;
    shareadFuns.httpGet(url,
        function(data) {
            var r = null;
            if (data!=null) {
                var j = JSON.parse(data)["data"]["items"];
                var k = shareadFuns.first(j, function (item) {
                    return item["roomid"] == id;
                });
                if (k != null) 
                    r = [1, k["status"] == "2" ? id : null];
            }
            callback(r);
        });
}

exports.getLiveInfo = function (id, callback) {
    if (callback == undefined)
        return;
    var a = "http://www.panda.tv/api_room_v2?__plat=pc_web&roomid=" + id + "&_=" + shareadFuns.currentTimeMillis();
    shareadFuns.httpGet(a,
        function (data) {
            var r = null;
            if (data!=null) {
                var j = JSON.parse(data)["data"], k = j["roominfo"], l = j["videoinfo"];
                var c = j["hostinfo"]["name"];
                d = k["name"],
                    e = k["bulletin"],
                    f = k["pictures"]["img"],
                    g = l["room_key"],
                    h = l["plflag"];
                h = h.split("_")[1];
                var u = "http://pl" + h + ".live.panda.tv/live_panda/" + g + ".flv";
                r = {
                    RoomID: id,
                    LiveNick: c,
                    RoomTitle: d,
                    RoomDetails: e,
                    LivingIMG: f,
                    VideoUrl: u
                }   
            }
            callback(r);
        });
}