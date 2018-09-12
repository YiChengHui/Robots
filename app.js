const requestJson = require('request')
const chreeio = require('cheerio')
const app = require('express')()
const request = require('superagent')
const charset = require("superagent-charset");
//服务地址
const serverPath = 'localhost'
//服务端口
const serverPort = '3333'
charset(request)

function requetsHtml(url) {
    //promise
    return new Promise((res, rej) => {
        //亡者农药的网站全是 <meta charset='gbk'> 所以superagent-charset用来解析gbk码
        request.get(url).charset('gbk').end((error, body) => {
            error ? rej(error) : res(body.text)
        })
    })
}

function getHeroList() {
    return new Promise((res, rej) => {
        requestJson('http://pvp.qq.com/web201605/js/herolist.json', (err, req, body) => {
            err ? rej(err) : res(eval(body))
        })
    })
}

//允许所有请求访问
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});
//请求英雄列表，响应给ajax
app.get('/herolist', (req, res) => {
    getHeroList().then(data => {
        res.send(data)
    })
})
//请求英雄详情，响应给ajax
app.get('/heroDetail/:id', (req, res) => {
    let heroId = req.params.id
    //农药的英雄id都是3位数
    if (heroId.length < 3) {
        res.send({
            msg: '请求的id不存在',
            status: 0
        })
        return
    }
    //检查id是否存在
    getHeroList().then(data => {
        let check = false
        for (let x = 0; x < data.length; x++) {
            if (data[x].ename == heroId) {
                check = true
                break
            }
        }
        if (check == false) {
            res.send({
                msg: '请求的id不存在',
                status: 0
            })
            return
        }
        return requetsHtml('http://pvp.qq.com/web201605/herodetail/' + heroId + '.shtml')
    }).then(data => {
        //chreeio解析html文档
        const $ = chreeio.load(data, {
            decodeEntities: false
        })
        //需要返回的数据
        let obj = {
            skill: [],
            difficulty: {},
            skin: []
        }
        //遍历英雄综合指数
        for (let i = 0; i < $('ul.cover-list .ibar').length; i++) {
            let keyI = ['Viability', 'Aggressivity', 'Skill', 'level']
            let temp = $('ul.cover-list .ibar')[i].attribs.style
            temp = temp.slice(temp.indexOf(":") + 1)
            obj.difficulty[keyI[i]] = temp
        }

        //遍历技能名字
        for (let j = 0; j < $('.skill-show .show-list').length; j++) {
            obj.skill.push({
                img: 'http://' + $('.skill-u1 li').find('img').attr('src').slice(2),
                skillname: $('.skill-show .show-list').eq([j]).find('.skill-name').html(),
                skilldesc: $('.skill-show .show-list').eq([j]).find('.skill-desc').html(),
                skilltips: $('.skill-show .show-list').eq([j]).find('.skill-tips').html(),
            })
        }
        //遍历英雄皮肤名
        let skinName = $('.pic-pf-list').attr('data-imgname').split('|')
        for (let k = 0; k < skinName.length; k++) {
            obj.skin.push({
                name: skinName[k],
                bigskin: `http://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/${heroId}/${heroId}-bigskin-${k+1}.jpg`,
                smallskin: `http://game.gtimg.cn/images/yxzj/img201606/heroimg/${heroId}/${heroId}-smallskin-${k+1}.jpg`,
            })
        }
        res.send(obj);
    })
})
app.listen(serverPort, serverPath, () => {
    console.log(`services run as -- ${serverPath}:${serverPort}`);
})