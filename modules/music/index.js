const axios = require("axios");
const express = require('express');
const router = express.Router();
const qs = require("querystring")

router.get("/music", async (req, res) => {
    const params = qs.stringify(req.query);
    const { data } = await axios.get(`https://api.uomg.com/api/rand.music?${params}`)
    res.send(data)
})
router.get("/music/search", async (req, res) => {
    const keyword = req.query.keyword;
    const arr = ["netease", "qq", "kugou", "kuwo", "xiami", "baidu"];
    // const data = await axios.all(arr.map(item => axios.post("http://music.yichenghui.net", {
    //     input: keyword,
    //     filter: "name",
    //     type: item,
    //     page: 1
    // })))
    // debugger
    const data = await axios.post("http://music.yichenghui.net", {
        input: keyword,
        filter: "name",
        type: "netease",
        page: 1
    });
    res.send(data)
})

module.exports = {
    music: router
}