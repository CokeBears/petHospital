//购物车
const express = require('express')
//导入解析报文的包body-parser
const bodyParser = require('body-parser')
const checkTokenMiddle = require('../../middlewares/checkTokenMiddle')
//导入model
// const md5 = require('md5');
const userModel = require('../../models/UserModel');
const orderModel = require('../../models/OrderModel');
const fs = require('fs');
const path = require('path');

//解析JSON格式请求体的中间件
const jsonParser = bodyParser.json()
//解析querystring（是一种用&连接的格式）格式请求体的中间件
const urlencodedParser = bodyParser.urlencoded({ extended: false })
//导入路由中间件
const router = express.Router()

//修改商品（包括删除、清空和添加）
router.post('/push', jsonParser, checkTokenMiddle, (req, res, next) => {
    let openid = req.user.openId
    cart = req.body
    userModel.updateOne({ openId: openid }, {
        cart: cart
    }).then((data) => {
        res.json(data)
    }).catch((err) => {
        // 处理错误情况
        console.error(err);
    });
})

// 查找购物车
router.get('/find', jsonParser, checkTokenMiddle, (req, res, next) => {
    let openid = req.user.openId
    userModel.findOne({
        openId: openid
    }).then((data) => {
        res.json(data.cart)
    }).catch((err) => {
        // 处理错误情况
        console.error(err);
    });
})

module.exports = router;