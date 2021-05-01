const app = require('express')()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const { baiduModules } = require("./modules/baidu/index");
const { newsModule } = require("./modules/news/index");
const { heroModules } = require("./modules/hero/index");
const { lolModules } = require("./modules/lol/index");
app.use("/", baiduModules);
app.use("/", newsModule);
app.use("/", heroModules);
app.use("/", lolModules);

// 服务地址
const serverPath = 'localhost'
//服务端口
const serverPort = '3333'

app.listen(serverPort, serverPath, () => {
    console.log(`services run as -- ${serverPath}:${serverPort}`);
})