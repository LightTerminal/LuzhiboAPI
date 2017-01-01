var shareadFuns = require("../shareadFuns");

exports.getRoomID = function (url, callback) {
    if (callback == undefined)
        return;
    url = url.toLowerCase();
    var id = url.match(/huajiao\.com\/l\/(\d+)/)[1];
    url = "http://h.huajiao.com/l/index?liveid="+id;
    shareadFuns.httpGet(url,
        function (data) {
            var r = null;
            if (data != null) {
                if (!shareadFuns.isContains(data, "err-d4bcf8ad0d.png"))
                    r = [8, !shareadFuns.isContains(data, "直播已结束") && !shareadFuns.isContains(data, "\"replay_status\":1") ? id : null];
            }
            callback(r);
        });
}

exports.getLiveInfo = function (id, callback) {
    if (callback == undefined)
        return;
    var a = "http://h.huajiao.com/l/index?liveid="+id;
    shareadFuns.httpGet(a,
        function (data) {
            var r = null;
            if (data != null) {
                var a=data.match(/<script type="text\/javascript">(\n?.+)+<\/script>/)[0],
                x=a.indexOf("{"),y=a.lastIndexOf("}");
                a=a.substring(x,y+1);
                a="var j="+a;
                eval(a);
                j=j["feed"];
                                var b = j["feed"]["title"],
                    c = j["author"]["nickname"],
                    d = j["feed"]["sn"];
                       d="http://g2.live.360.cn/liveplay?stype=flv&channel=live_huajiao_v2&bid=huajiao&sn="+d+"&sid=null&_rate=null&ts=null";
                       shareadFuns.httpGet(d,function(data){
                               if (data != null) {
                                     d =data.substring(0,3)+data.substring(6,data.length);
                                     d=new Buffer(d, 'base64').toString();
                                    d=JSON.parse(d)["main"];
                                   r=
                                   {
                                       RoomID:id,
                                                       RoomTitle : b,
                LiveNick : c,
                RoomDetails : "",
                LivingIMG : "",
                VideoUrl : d
                                   };
                               }
                               callback(r);
                       });
            }
            else
            callback(r);
        });
}