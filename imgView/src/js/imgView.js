/**
 * Created by 15031493 on 2015/11/20.
 */
;(function(factory,d,w){
    if (typeof define == 'function' && define.cmd) { // CommonJS
        define(function (require,exports,module) {
            module.exports = factory(d,w);
        });
    }
    else { //正常使用
        w.imgView = factory.call(w,d,w);
        //w.imgTouch = factory(d,w);
    }
})(function (d,w) {
    // 插件的代码
    var _uuid = 0;
    var isLoadCss = false;
    var evt = "onorientationchange" in w ? "orientationchange" : "resize";

    //参数
    var defaults = {
        open:"",//开关对象
        tarParent:"body",//父级对象
        urlList:[]//图片地址数组
    };
    //样式
    var itStyle= ".ui-m-iv{position:fixed;top:0;left:0;width:100%;height:100%;z-index:4}.ui-m-iv li{position:absolute;top:0;left:0;height:100%;width:100%;background-position:center center;background-repeat:no-repeat;background-size:contain}.ui-m-iv .tran{-webkit-transition:all .3s ease-out}.ui-m-iv-mask{position:fixed;top:0;width:100%;height:100%;background:#000;z-index:3;opacity:.3}.ui-m-iv-oh{overflow-y:hidden}.hide{display:none}";

    var imgView = function (opt){
        var opts = _extend(defaults,opt);
        if(opts.open.length == 0){
            alert("请绑定开关对象");
            return false;
        }
        //数据保存
        this.uuid =_uuid;
        this.index =  0;
        this.pre =0;
        this.next = 0;
        this.startPos =  {x:0,y:0};
        this.endPos =  {x:0,y:0};
        this.len = opts.urlList.length;
        this.urlList = opts.urlList;
        this.open = opts.open;
        this.tarParent = opts.tarParent;
        this.callback = opts.callback;
        this.$ul = null;
        this.$lis = null;
        this.itemWidth = w.screen.width;
        _uuid ++;
        this.init();
    }

    imgView.prototype = {
        constructor : imgView,
        init: function () {
            var _self = this;
            _self.creatHtml();
            _self.loadCss();
            _self.$ul = d.querySelector("#it"+_self.uuid);
            _self.$lis = _self.$ul.querySelectorAll("li");
            _self.openBind();
            _self.closeBind();
            if(_self.len <= 1){
                return false;
            }
            _self.setIndex(0);
            _self.touchStart();
            _self.touchMove();
            _self.touchEnd();

            w.addEventListener(evt, function () {
                _self.itemWidth = w.screen.width;
            } , false);

        },
        loadCss: function () {
            if(isLoadCss)return ;
            var style = d.createElement("style");
            style.type= "text/css";
            style.innerText = itStyle;
            d.querySelector("head").appendChild(style);
            isLoadCss = true;
        },
        //页面框架初始化
        creatHtml: function () {
            var _self = this;
            var lisHtml = "";
            var hide = "";
            var style = "";
            if(_self.len == 2){
                _self.len = 4;
                _self.urlList = _self.urlList.concat(_self.urlList);
            }

            //父级宽度
            var p_width = _self.len * 100 + "%";
            //生成图片，且隐藏除第一张以外的
            _self.urlList.forEach(function (ele,i) {
                var hide = "";
                var style = "";
                if(i == _self.len-1&&i!=0){
                    style ="transform: translateX(-100%)";
                    hide = "hide";
                }
                else if(i!=0){
                    style = "transform: translateX(100%)";
                    hide = "hide";
                }
                lisHtml += "<li class='"+hide+"' style='background-image: url("+ele+");"+style+"'></li>"
            })
            var _html = "<ul  class='ui-m-iv hide' id='it"+_self.uuid+"'>" +lisHtml+
                "</ul>"
            d.querySelector(_self.tarParent).insertAdjacentHTML("beforeend",_html);
        },
        //绑定关闭按钮
        closeBind: function () {
            var _self = this;
            _self.$ul.addEventListener("click", function () {
                _self.$ul.classList.add("hide")
                _self.closeMask();
            })
        },
        //绑定打开按钮
        openBind: function () {
            var _self = this;
            d.querySelector(_self.open).addEventListener("click", function () {
                _self.getMask();
                _self.$ul.classList.remove("hide");
            });
        },
        touchStart: function (event) {
            var _self = this;
            _self.$ul.addEventListener("touchstart",start);
            function start(event){
                var touch = event.targetTouches[0];
                _self.startPos = {x:touch.pageX,y:touch.pageY};
                [].forEach.call(_self.$lis,function (ele,_i) {
                    ele.classList.remove("tran","hide");
                })
            }

        },
        touchMove: function (event) {
            var _self = this;
            _self.$ul.addEventListener("touchmove",move);
            function move(event){
                //多个touch对象或缩放时 取消
                if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
                var touch = event.targetTouches[0];
                _self.endPos = {x:touch.pageX - _self.startPos.x,y:touch.pageY - _self.startPos.y};
                event.preventDefault();      //阻止触摸事件的默认行为，即阻止滚屏

                _self.$lis[_self.index].style.transform = "translateX("+_self.endPos.x + "px)";
                _self.$lis[_self.pre].style.transform = "translateX(" +  (- _self.itemWidth + _self.endPos.x) + "px)";
                _self.$lis[_self.next].style.transform = "translateX("+ (_self.itemWidth + _self.endPos.x) +"px)";
            }
        },
        touchEnd: function () {
            var _self = this;
            _self.$ul.addEventListener("touchend",end);

            function end() {
                if (_self.endPos.x > _self.itemWidth / 3) {//右划
                    _self.index -= 1;
                    _self.index = _self.setIndex(_self.index);
                    _self.$lis[_self.pre].classList.add("hide");
                } else if (_self.endPos.x < -_self.itemWidth / 3) {//左划
                    _self.index += 1;
                    _self.index = _self.setIndex(_self.index);
                    _self.$lis[_self.next].classList.add("hide");
                }
                _self.endPos = {x: 0, y: 0};
                _self.$lis[_self.index].style.transform = "translateX(0)";
                _self.$lis[_self.pre].style.transform = "translateX(-100%)";
                _self.$lis[_self.next].style.transform = "translateX(100%)";
                [].forEach.call(_self.$lis, function (ele) {
                    ele.classList.add("tran");
                })
            }
        },
        setIndex : function (index) {
            var _self = this;
            if(index== -1){
                index = _self.len - 1;
            }
            if(index == _self.len){
                index = 0;
            }
            _self.pre =  index - 1 == -1 ? _self.len - 1 : index - 1;
            _self.next =index + 1 == _self.len ? 0 : index + 1;
            return index;
        },
        //遮罩层打开关闭
        getMask: function () {
            if(d.querySelector(".ui-m-iv-mask")){
                d.querySelector(".ui-m-iv-mask").classList.remove("hide");
                d.body.classList.add("ui-m-iv-oh");
                d.documentElement.classList.add("ui-m-iv-oh");
                return false;
            };
            var str = "<div class='ui-m-iv-mask' ></div>";
            d.body.insertAdjacentHTML('beforeEnd',str);
            d.body.classList.add("ui-m-iv-oh");
            d.documentElement.classList.add("ui-m-iv-oh");
        },
        closeMask:function(){
            d.querySelector(".ui-m-iv-mask").classList.add("hide");
            d.body.classList.remove("ui-m-iv-oh");
            d.documentElement.classList.remove("ui-m-iv-oh");
        }
    };

    /************工具**************/
    function _extend(target,source){
        for(key in source){
            if (source[key] !== undefined) target[key] = source[key]
        }
        return target;
    }

    return imgView;

},document,window)
