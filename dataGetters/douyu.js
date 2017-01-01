var shareadFuns = require("../shareadFuns");

exports.getRoomID = function (url, callback) {
        if (callback == undefined)
            return;
        shareadFuns.httpGet(url,
            function (data) {
                var r = null;
                if (data != null) {
                    var id = data.match(/"room_id":\d+/g)[0].match(/\d+/)[0];
                    if (id!=null) 
                        r = [0,shareadFuns.isContains(data, "上次直播") ? null:id];
                }
                callback(r);
            });
    }

 exports.getLiveInfo= function(id, callback) {
     if (callback == undefined)
         return;
     var a = "http://www.douyutv.com/api/v1/",
         b = "room/" + id + "?aid=wp&client_sys=wp&time=" + shareadFuns.currentTimeMillis();
     b += "&auth=" + shareadFuns.getMD5String(b + "zNzMV1y4EMxOHS6I5WKm");
     shareadFuns.httpGet(a+b,
         function(data) {
             var r = null;
             if (data != null) {
                 var j = JSON.parse(data).data;
                 if (j != null) {
                     var d = j["rtmp_url"],
                         e = d + "/" + j["rtmp_live"],
                         f = j["room_src"],
                         g = j["room_name"],
                         h = j["show_details"],
                         i = j["nickname"];
                     r = {
                         RoomID:id,
                         VideoUrl: e,
                         LivingIMG: f,
                         RoomTitle: g,
                         RoomDetails: h,
                         LiveNick: i
                     }
                 }
             }
             callback(r);
         });
 }