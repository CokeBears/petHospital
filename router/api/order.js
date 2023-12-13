//购物车
const express = require('express')
//导入解析报文的包body-parser
const bodyParser = require('body-parser')
const checkTokenMiddle = require('../../middlewares/checkTokenMiddle')
//导入model
// const md5 = require('md5');
const orderModel = require('../../models/OrderModel');

//解析JSON格式请求体的中间件
const jsonParser = bodyParser.json()
//解析querystring（是一种用&连接的格式）格式请求体的中间件
const urlencodedParser = bodyParser.urlencoded({ extended: false })
//导入路由中间件
const router = express.Router()

// 查找购物车
router.get('/find', jsonParser, checkTokenMiddle, (req, res, next) => {
    let openid = req.user.openId
    orderModel.find({
        openId: openid
    }).then((data) => {
        res.json(data)
    }).catch((err) => {
        // 处理错误情况
        console.error(err);
    });
})

router.get('/findMax', jsonParser, checkTokenMiddle, (req, res, next) => {
    orderModel.find({}).then((data) => {
        res.json(data)
    }).catch((err) => {
        // 处理错误情况
        console.error(err);
    });
})

//分页
router.post('/find', jsonParser, checkTokenMiddle, (req, res, next) => {
    const { currentPage, pageSize } = req.body
    let skipNum = (currentPage - 1) * pageSize
    orderModel.find({}).skip(skipNum).limit(pageSize).then((data) => {
        res.json(data)
    }).catch((err) => {
        // 处理错误情况
        console.error(err);
    });
})

//单项查找
router.post('/findOne', jsonParser, checkTokenMiddle, (req, res, next) => {
    const id = req.body.id
    orderModel.findOne({
        _id: id
    }).then((data) => {
        res.json(data)
    }).catch((err) => {
        // 处理错误情况
        console.error(err);
    });
})

//提交创建订单
router.post('/push', jsonParser, checkTokenMiddle, (req, res, next) => {
    let openid = req.user.openId
    const cart = req.body.cart
    const user = req.body.userInfo
    const totalPrice = req.body.totalPrice
    const now = new Date();
    const currentTime = now.toLocaleString();
    orderModel.create({
        openId: openid,
        cart: cart,
        time: currentTime,
        totalPrice: totalPrice,
        user: user
    }).then((data) => {
        res.json(1001);
    }).catch((err) => {
        // 处理错误情况
        res.json(1002);
        console.error(err);
    });
})

//确认付款
router.post('/state', jsonParser, checkTokenMiddle, (req, res, next) => {
    const id = req.body.id
    orderModel.updateOne({ _id: id }, { state: '已支付' }).then((data) => {
        res.json(data)
    }).catch((err) => {
        // 处理错误情况
        console.error(err);
    });
})

module.exports = router;