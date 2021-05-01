const axios = require("axios");
const express = require('express');
const router = express.Router();

router.get("/lol/list", async (req, res) => {
    const { data: { hero } } = await axios.get("https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js")
    res.send(hero)
})

router.get("/lol/detail", async (req, res) => {
    const name = req.query.name;
    try {
        const { data } = await axios.get(`https://lol.qq.com/biz/hero/${name}.js`);
        let index = data.indexOf("LOLherojs.champion") + `LOLherojs.champion.${name}=`.length;
        let obj = data.slice(index, -1)
        res.send({
            code: 200,
            msg: "success",
            data: obj
        });
    } catch (err) {
        res.send({
            code: "500",
            msg: err.toString()
        });
    }

});

module.exports = {
    lolModules: router
}