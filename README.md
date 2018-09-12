# 王者荣耀爬虫+接口
王者荣耀简单爬虫，王者荣耀ajax接口

## 安装依赖
```bash
npm install
```
## 启动
```bash
cd Robots
node ./app.js
```

## 启动成功
```bash
services run as -- localhost:3333
```

## 请求

-   地址：可修改app.js中的 
    ```javascript
    const serverPath = 'localhost'
    ```
-   端口：可修改app.js中的 
    ```javascript
    const serverPort = '3333'
    ```

## Ajax接口

-   英雄列表

    -   官网英雄列表json地址(可以直接Ajax get请求)

    http://pvp.qq.com/web201605/js/herolist.json

    -   请求地址
    ```javascript    
    const url=`http://${ipaddress}:${serviceport}/herolist`
    ajax.get(url).then(res=>{
        dosometing()
    })
    ```
    -   字段详情
        -   ename：英雄id，用来请求英雄详情
        -   cname：英雄名字
        -   title：应该最新皮肤名
        -   skin_name：皮肤名

-   英雄详情

    -   请求地址
    ```javascript    
    let ename=107
    const url=`http://${ipaddress}:${serviceport}/heroDetail/${ename}`
    ajax.get(url).then(res=>{
        dosometing()
    })
    ```
    -   字段详情
        -   skill：英雄技能 类型 Array
            -   img：技能图标
            -   skillname：技能名称
            -   skilldesc：技能被动
            -   skilltips：技能提示
        -   difficulty：英雄指数 类型 Object
            -   Viability：生存能
            -   Aggressivity：攻击伤害
            -   Skill：技能效果
            -   level：操作难度
        -   skin：英雄皮肤列表 类型 Array
            -   name：皮肤名称
            -   bigskin：皮肤大图
            -   smallskin：皮肤小图