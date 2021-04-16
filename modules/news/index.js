const data = require("./data.json");
const express = require('express');
const router = express.Router();

router.get("/news", (req, res) => {
    res.send(data)
})
module.exports = {
    newsModule: router
}