const request = require('request');
const fs = require("fs");
const apikey = "c23268905aa8c0dc80690f8e07559be3";
request(`http://v.juhe.cn/toutiao/index?type=top&key=${apikey}`, (err, req, body) => {
    data = err ? JSON.stringify(err) : JSON.stringify(body)
    fs.writeFilea("./data.json", JSON.stringify(data));
})