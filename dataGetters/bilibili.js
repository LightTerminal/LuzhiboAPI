var shareadFuns = require("../shareadFuns");

exports.getRoomID = function (url, callback) {
    if (callback == undefined)
        return;
    shareadFuns.httpGet(url,
        function (data) {
            var r = null;
            if (data != null) {
                var id = data.match(/room_id=(\d+)/)[0].match(/\d+/)[0];
                if (id != null) {
                    url = "http://live.bilibili.com/live/getInfo?roomid=" + id;
                    shareadFuns.httpGet(url,
                        function(data) {
                            if (data != null) {
                                if (!shareadFuns.isContains(data, "\\u623f\\u95f4\\u4e0d\\u5b58\\u5728"))
                                    r = [6, shareadFuns.isContains(data, "\"_status\":\"on\"") ? id : null];
                                callback(r);
                            }
                        });
                }
                else
                    callback(r);
            } else
                callback(r);
        });
}

exports.getLiveInfo = function (id, callback) {
    if (callback == undefined)
        return;
    var r = null;
    var a = "room_info",
        b = "room_id=" + id,
        c = getApiUrl(a, b);
    shareadFuns.httpGet(c, function(data) {
        if (data != null) {
            var j = JSON.parse(data)["data"],
                a = j["title"],
                b = j["uname"],
                c = j["cover"],
                d = j["schedule"]["cid"],
                i = Number(d);
            if (i > 10000000)
                i -= 10000000;
            var e = "playurl",
                f = "cid=" + i + "&rnd=" + shareadFuns.random(100, 9999),
                g = getApiUrl(e, f);
            shareadFuns.httpGet(g,
                function(data) {
                    if (data != null) {
                        d = data.match(/<url><!\[CDATA\[(\S+)\]\]><\/url>/)[1];
                        r =
                        {
                            RoomID: id,
                            RoomTitle: a,
                            LiveNick: b,
                            LivingIMG: c,
                            RoomDetails: "",
                            VideoUrl: d
                        };
                    }
                    callback(r);
                });
        } else
            callback(r);
    });
}

function getApiUrl(api,args) {
    var  a = "http://live.bilibili.com/api/"+api+"?",
        b = "appkey=422fd9d7289a1dd9&"+args,
            c = b + "ba3a4e554e9a6e15dc4d1d70c2b154e3",
            d = "&sign=" +shareadFuns.getMD5String(c),
            e = a + b + d;
    return e;
}