/**
 * Created by nn on 2015/11/16.
 */
define(function(require,exports,module){
    var ads = require("address");

    var a = new ads({
        columns:[{state: "prov",text: "河北",disable: false,id:"60"},
            {state: "city",text: "邯郸市",disable: false,id:"9094"},
            {state: "area",text: "",disable: false,id:""},
            {state: "town",text: "",disable: false,id:""}],
        open:".to-address",
        callback: function (result) {
            console.log(result);
            document.querySelector("#province-name").innerText = result.prov.name;
            document.querySelector("#city-name").innerText = result.city.name;
            document.querySelector("#area-name").innerText = result.area.name;
            alert(JSON.stringify(result));
        }
    });

    var b = new ads({
        columns:[{state: "prov",text: "山西",disable: false,id:"50"},
            {state: "city",text: "长治市",disable: false,id:"9249"},
            {state: "area",text: "襄垣县",disable: false,id:"11947"}],
        open:".to-addresss",
        callback: function (result) {
            alert(JSON.stringify(result));
        }
    });


     document.getElementById("aa").addEventListener("click",function(){
        console.log(JSON.stringify(a.data));
        console.log(JSON.stringify(b.data));
    })
    /*   function P(){
           this.name = "aaa";
           this.init();
       }
       P.prototype.init = function (){
           this.name = "qqq" ;
       }
       P.prototype.set = function (b){
           this.name = b ;
       }
       P.prototype.get = function (){
           console.log(this.name);
       }

       var aa = new P();
       var bb = new P();

       aa.get();
       aa.set("aaaa");
       bb.set("bbbb");
       aa.get();
       bb.get();*/
});