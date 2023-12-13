//预约
const express = require('express')
//导入解析报文的包body-parser
const bodyParser = require('body-parser')

const checkTokenMiddle = require('../../middlewares/checkTokenMiddle')

const registerModel = require('../../models/RegisterModel')

//解析JSON格式请求体的中间件
const jsonParser = bodyParser.json()
//解析querystring（是一种用&连接的格式）格式请求体的中间件
const urlencodedParser = bodyParser.urlencoded({ extended: false })
//导入路由中间件
const router = express.Router()

//预约表录入
router.post('/push', jsonParser, checkTokenMiddle, (req, res, next) => {
    let { pet, doctor, items, time } = req.body
    let openid = req.user.openId
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // JavaScript 的月份从 0 开始，所以我们需要加 1
    let day = date.getDate();
    let dateString = `${year}/${month}/${day} ${time}`;
    // 携带openid录入数据库
    registerModel.create({
        openId: openid,
        pet: pet,
        items: items,
        time: dateString,
        doctor: doctor
    }).then(data => {
        res.json('OK')
    }).catch((err) => {
        // 处理错误情况
        console.error(err);
    });
})

//用户查找预约
router.get('/', jsonParser, checkTokenMiddle, (req, res, next) => {
    let openid = req.user.openId
    registerModel.find({ openId: openid, state: 0 }).then((data) => {
        res.json(data)
    }).catch((err) => {
        // 处理错误情况
        console.error(err);
    });
})

//取消预约，删除预约内容
router.delete('/delete', jsonParser, checkTokenMiddle, (req, res, next) => {
    const id = req.query.id
    registerModel.deleteOne({ _id: id }).then((data) => {
        res.json('成功删除');
    }).catch((err) => {
        // 处理错误情况
        console.error(err);
    });
})

//用户查看宠物历史病例
router.post('/state', jsonParser, checkTokenMiddle, (req, res, next) => {
    const petId = req.body.id
    registerModel.find({ 'pet._id': petId, state: 1 }).then((data) => {
        res.json(data)
    }).catch((err) => {
        // 处理错误情况
        console.error(err);
    });
})

// 问诊查看预约
router.get('/adminFind', jsonParser, checkTokenMiddle, (req, res, next) => {
    let _id = req.user._id
    registerModel.find({ doctor: _id, state: 0 }).then((data) => {
        res.json(data)
    }).catch((err) => {
        // 处理错误情况
        console.error(err);
    });
})

//医生查看历史病例
router.get('/historyFind', jsonParser, checkTokenMiddle, (req, res, next) => {
    let _id = req.user._id
    registerModel.find({ doctor: _id, state: 1 }).then((data) => {
        res.json(data)
    }).catch((err) => {
        // 处理错误情况
        console.error(err);
    });
})
//分页
router.post('/historyFind', jsonParser, checkTokenMiddle, (req, res, next) => {
    let _id = req.user._id
    const { currentPage, pageSize } = req.body
    let skipNum = (currentPage - 1) * pageSize
    registerModel.find({ doctor: _id, state: 1 }).skip(skipNum).limit(pageSize).then((data) => {
        res.json(data)
    }).catch((err) => {
        // 处理错误情况
        console.error(err);
    });
})

// 问诊表_id查询
router.post('/idFind', jsonParser, checkTokenMiddle, (req, res, next) => {
    const id = req.body.id
    registerModel.findOne({ _id: id }).then((data) => {
        res.json(data)
    }).catch((err) => {
        // 处理错误情况
        console.error(err);
    });
})

//问诊表，医生提交问诊结论后将结论后将预约状态state变为1（已就诊）
router.post('/cases', jsonParser, checkTokenMiddle, (req, res, next) => {
    const subimtList = req.body
    const now = new Date();
    const currentTime = now.toLocaleString();
    registerModel.updateOne({ _id: subimtList.id }, {
        cases: subimtList.textarea,
        state: 1,
        time: currentTime,
        commodity: subimtList.itemsList,
    }).then((data) => {
        res.json(data)
    }).catch((err) => {
        // 处理错误情况
        console.error(err);
    });
})


module.exports = router;