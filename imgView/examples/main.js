/**
 * Created by nn on 2015/11/16.
 */
define(function(require,exports,module){
    var img = require("imgView");
    var a = new img({
        open:"#aa",
        //urlList:["images/g1.jpg"]
        //urlList:["images/g1.jpg","images/g2.jpg"]
        urlList:["images/g1.jpg","images/g2.jpg","images/g3.jpg","images/img.jpg"]
    })
    var b = new img({
        open:"#ab",
        //urlList:["images/g1.jpg"]
        //urlList:["images/g1.jpg","images/g2.jpg"]
        urlList:["images/g1.jpg","images/img.jpg"]
    })
});