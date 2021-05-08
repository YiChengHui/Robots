const axios = require("axios");
const express = require('express');
const router = express.Router();
const qs = require("querystring")

router.get("/music", async (req, res) => {
    const params = qs.stringify(req.query);
    const { data } = await axios.get(`https://api.uomg.com/api/rand.music?${params}`)
    res.send(data)
})

module.exports = {
    music: router
}