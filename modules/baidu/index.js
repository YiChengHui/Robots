const qs = require('querystring');
const axios = require("axios");
const express = require('express');
const router = express.Router();

async function getBaiduToken() {
    return axios.get(`https://aip.baidubce.com/oauth/2.0/token`, {
        params: {
            'grant_type': 'client_credentials',
            'client_id': 'mxFbEKje0C6zkUHqsGzxoXTz',
            'client_secret': 'hoesS2uAevxqwBUbxi7llm2olmjkqDzp'
        }
    })
};

async function textocr(req, res) {
    const { data: { access_token } } = await getBaiduToken();
    const json = {
        access_token,
        image: encodeURI(req.body.image)
    }

    const { data } = await axios({
        method: "POST",
        url: `https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic`,
        data: json,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: [
            data => {
                let ret = "";
                for (let it in data) {
                    ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`
                }
                return ret;
            }
        ]
    });
    res.send(data)
}

router.post("/baidu/textocr", textocr);

module.exports = {
    getBaiduToken,
    baiduModules: router
}