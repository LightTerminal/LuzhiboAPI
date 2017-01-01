var crypto = require("crypto");
var http = require("http");

exports.currentTimeMillis = function () {
    return new  Date().getTime();
}

exports.getMD5String= function(str) {
    return crypto.createHash("md5").update(str).digest("hex");
}

exports.httpGet = function(url, callback, ua) {
    if (callback == undefined)
        return;
    var options = require("url").parse(url);
    if (ua != undefined)
        options.headers = {"User-Agent":ua};
    http.get(options,
            function(res) {
                var size = 0;
                var chunks = [];
                res.on('data',
                    function(chunk) {
                        size += chunk.length;
                        chunks.push(chunk);
                    });
                res.on('end',
                    function() {
                        var data = Buffer.concat(chunks, size);
                            callback(data.toString());
                    });
            })
        .on('error',
            function() {
                    callback(null);
            });
}

exports.isContains=function (str, subStr) {
    return str.indexOf(subStr)!=-1;
}

exports.first = function (arr,callback) {
    if (callback == undefined)
        return arr[0];
    for (var i = 0; i < arr.length; i++) {
        var x = arr[i];
        if (callback(x)) {
            return x;
        }
    }
    return null;
}

exports.random= function(min,max) {
    var a = max - min,
        b = Math.random() * a + min,
        c = Math.floor(b);
    return c;
}