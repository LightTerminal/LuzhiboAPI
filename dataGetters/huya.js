var shareadFuns = require("../shareadFuns");
var jquery=require("jquery");

var ua ="Mozilla/5.0 (iPad; CPU OS 8_1_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12B466 Safari/600.1.4";
exports.getRoomID = function (url, callback) {
    if (callback == undefined)
        return;
    url = url.toLowerCase();
    var id = url.match(/huya\.com\/(\w+)/)[1];
    url = "http://m.huya.com/" + id;
    shareadFuns.httpGet(url,
        function(data) {
            var r = null;
            if (data != null) {
                if (!shareadFuns.isContains(data,"找不到此页面"))
                    r = [4, !shareadFuns.isContains(data, "ISLIVE =  false") ? id : null];
                callback(r);
            }
        },ua);
}

exports.getLiveInfo = function (id, callback) {
    if (callback == undefined)
        return;
    var url ="http://m.huya.com/"+id;
    shareadFuns.httpGet(url,
        function (data) {
            var r = null;
            if (data != null) {
                var doc=jquery(data),
                rootNode=doc.find("#m-container"),
                 playerNode = doc.find("#html5player-video"),
                    infoNode = rootNode.find("div.live-info-desc");
                                 var a = infoNode.find("h1").text(),
                    b = infoNode.find("h2").text(),
                    c =rootNode.find("div.notice_content").text().replace(/\s+/g,"");
                    c = c.substring(2, c.length - 2);
                var d = playerNode.attr("poster"),
                    e = playerNode.find("source").attr("src");
                e = e.match(/\d+_\d+/)[0];
                e = "http://hls.yy.com/"+e+"_10057.flv";
                r=
                {
                RoomID:id,
                RoomTitle : a,
                LiveNick : b,
                RoomDetails : c,
                LivingIMG :d,
                VideoUrl :e  
                };
            }
            callback(r);
        },ua);
}