## 移动端地址控件使用说明

### cmd模块用户使用
* 调用组件模块 `var ads = require("address");` 即可直接使用 ` var a = new ads(....);` 无依赖

```
    var ads = require("address");
    var a = new ads({
        columns:[{state: "prov",text: "河北",disable: false,id:"60"},
            {state: "city",text: "邯郸市",disable: false,id:"9094"},
            {state: "area",text: "复兴区",disable: false,id:"10621"}],
        open:".to-address",
        callback: function (result) {
            alert(JSON.stringify(result));
        }
    });
```

### 普通用户
* 引入js

```
      var ads = new address({
          columns:[{state: "prov",text: "河北",disable: false,id:"60"},
              {state: "city",text: "邯郸市",disable: false,id:"9094"},
              {state: "area",text: "复兴区",disable: false,id:"10621"}],
          open:".to-address",
          callback: function (result) {
              alert(JSON.stringify(result));
          }
      });
```

### 参数
* columns:初始化时选择列数，最多为4个列,若有初始数据时在对应的text和id写上初始值，若无可不写
    * state：该列的类型，按顺序放
    * text：地区名称
    * disable：是否禁用不可点击
    * id：地区代码
* callback: 回调
* open: 打开目标 传id或者class

### 方法
* 获取选中的数据
    * `var ads = new address(xxxx);`
    * `ads.data;`
    * 获取地址的数据,返回一个对象
    * 格式 `{prov:{name:"",id:""},city:{name:"",id:""},area:{name:"",id:""},town:{name:"",id:""}}`

## 有问题反馈
在使用中有任何问题，欢迎反馈给我，可以用以下联系方式跟我交流

* 豆芽：15031493
* QQ: 105828564
