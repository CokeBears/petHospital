//商品
const express = require('express')
//导入解析报文的包body-parser
const bodyParser = require('body-parser')

const checkTokenMiddle = require('../../middlewares/checkTokenMiddle')
//导入model
// const md5 = require('md5');
const commodityModel = require('../../models/CommodityModel');
//解析JSON格式请求体的中间件
const jsonParser = bodyParser.json()
//解析querystring（是一种用&连接的格式）格式请求体的中间件
const urlencodedParser = bodyParser.urlencoded({ extended: false })
//导入路由中间件
const router = express.Router()

//新增数据
router.post('/push', jsonParser, checkTokenMiddle, (req, res, next) => {
    const { name, price, sort } = req.body
    commodityModel.create({
        name: name,
        price: price,
        sort: sort,
    }).then((data) => {
        res.status(200).send(data)
    }).catch((err) => {
        // 处理错误情况
        console.error(err);
    });
})

//修改数据
router.post('/revise', jsonParser, checkTokenMiddle, (req, res, next) => {
    const { name, price, sort } = req.body.form
    const id = req.body.id
    commodityModel.updateOne({ _id: id }, {
        name: name,
        price: price,
        sort: sort,
    }).then((data) => {
        res.status(200).send(data)
    }).catch((err) => {
        // 处理错误情况
        console.error(err);
    });
})

//显示所有数据
router.get('/find', jsonParser, checkTokenMiddle, (req, res, next) => {
    commodityModel.find({}).then((data) => {
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
    commodityModel.find({}).skip(skipNum).limit(pageSize).then((data) => {
        res.json(data)
    }).catch((err) => {
        // 处理错误情况
        console.error(err);
    });
})

//删除
router.delete('/delete', jsonParser, checkTokenMiddle, (req, res, next) => {
    const id = req.query.id
    commodityModel.deleteOne({ _id: id }).then((data) => {
        res.status(200).send('成功删除');
    }).catch((err) => {
        // 处理错误情况
        console.error(err);
    });
})

//类型查找
router.post('/sort', jsonParser, (req, res, next) => {
    const sort = req.body.sort
    commodityModel.find({ sort: sort }).then((data) => {
        res.json(data)
    }).catch((err) => {
        // 处理错误情况
        console.error(err);
    });
})

module.exports = router;