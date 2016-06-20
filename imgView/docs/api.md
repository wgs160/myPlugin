## 移动端图片放大控件使用说明

### cmd模块用户使用
* 调用组件模块 `var img = require("imgView");` 即可直接使用 ` var a = new img(....);` 无依赖

```
    var img = require("imgView");
    var a = new img({
        open:"#aa",
        urlList:["images/g1.jpg","images/g2.jpg","images/g3.jpg","images/img.jpg"]
    })
```

### 普通用户
* 引入js

```
    var a = new imgView({
        open:"#aa",
        urlList:["images/g1.jpg","images/g2.jpg","images/g3.jpg","images/img.jpg"]
    })
```

### 参数
* urlList: 图片地址的数组
* open: 打开目标 传id或者class

## 有问题反馈
在使用中有任何问题，欢迎反馈给我，可以用以下联系方式跟我交流

* 豆芽：15031493
* QQ: 105828564
