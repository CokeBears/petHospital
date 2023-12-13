//使用微信登录校验
const express = require('express')
//导入解析报文的包body-parser
const bodyParser = require('body-parser')
//导入axios发送请求
const axios = require('axios')
//导入jwt
const jwt = require('jsonwebtoken');
const checkTokenMiddle = require('../../middlewares/checkTokenMiddle')

//导入model
// const md5 = require('md5');
const userModel = require('../../models/UserModel');
const petModel = require('../../models/PetModel');

//解析JSON格式请求体的中间件
const jsonParser = bodyParser.json()
//解析querystring（是一种用&连接的格式）格式请求体的中间件
const urlencodedParser = bodyParser.urlencoded({ extended: false })
//导入路由中间件
const router = express.Router()

let openid = null;

router.get('/wxlogin', (req, res, next) => {
    res.send('获取到数据');
})

//接收前端发送的携带code，拼接请求数据向微信发送获取openid
router.post('/wxlogin', jsonParser, (req, res, next) => {
    const data = {
        "appid": "wxb072169e78503167",
        "secret": "78f29e5c6cc1a6b60d89bb4c09dbb908",
        "js_code": req.body.code,
    }
    axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${data.appid}&secret=${data.secret}&js_code=${data.js_code}&grant_type=authorization_code`)
        .then(response => {
            //登录成功，获取到openid
            // console.log(response.data.openid);
            openid = response.data.openid;
            userModel.findOne({ openId: openid })
                .then(data => {
                    if (data != null) {
                        // console.log("注册过的账号");
                        //注册过的账号可以在数据库中取出相关数据并生成token
                        let { userName, phone } = data;
                        let token = jwt.sign({
                            openId: openid,
                        }, 'cjy', {
                            expiresIn: 60 * 60 * 24 * 7
                        });
                        //响应 token
                        res.json({
                            code: '0000',
                            msg: '登录成功',
                            info: {
                                userName: userName,
                                phone: phone,
                                userImg: data.userImg,
                            },
                            token: token,
                        })
                    } else {
                        res.json({
                            code: '0001',
                            msg: '未注册'
                        })
                    }
                }).catch(err => {
                    console.error(err);
                });
            // next();
        })
        .catch(err => {
            console.log(err);
        });
})

router.post('/userMsg', jsonParser, (req, res, next) => {
    let { userName, phone, avatar } = req.body;
    userModel.create({
        openId: openid,
        userName: userName,
        phone: phone,
        userImg: avatar,
    }).then((data) => {
        // 处理成功情况
        let { userName, phone, avatar } = data;
        let token = jwt.sign({
            openId: openid,
        }, 'cjy', {
            expiresIn: 60 * 60 * 24 * 7
        });
        // 响应 token
        res.json({
            code: '0000',
            msg: '登录成功',
            info: {
                userName: userName,
                phone: phone,
                userImg: data.userImg,
            },
            token: token,
        });
    }).catch((err) => {
        // 处理错误情况
        console.error(err);
    });
})

router.post('/alter', jsonParser, checkTokenMiddle, (req, res, next) => {
    let openid = req.user.openId
    let { userName, userImg, phone } = req.body;
    userModel.updateOne({ openId: openid }, { userName: userName, userImg: userImg, phone: phone }).then(data => {
        petModel.updateOne({ openId: openid }, { phone: phone }).then(data => {
            res.json({
                code: '1000',
                msg: '修改成功',
                user: {
                    userName: userName,
                    userImg: userImg,
                    phone: phone
                }
            })
        }).catch(err => {
            res.json({
                code: '1011',
                msg: '修改失败',
                err: err
            })
        });
    }).catch(err => {
        res.json({
            code: '1001',
            msg: '修改失败',
            err: err
        })
    });

})


module.exports = router;