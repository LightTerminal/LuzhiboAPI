var getter = require("./dataGetters/iGetter");

var url = "http://www.huajiao.com/l/57977226?hd=1";
getter = new getter(url);

getter.getRoomID(
    function(room) {
        if (room != null && room[1] != null) {
            getter.getLiveInfo(function(live) {
                console.log(live);
            });
        }
    });