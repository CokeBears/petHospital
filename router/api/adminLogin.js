//使用微信登录校验
const express = require('express')
//导入解析报文的包body-parser
const bodyParser = require('body-parser')
//导入jwt
const jwt = require('jsonwebtoken');
const checkTokenMiddle = require('../../middlewares/checkTokenMiddle')
//导入model
const adminModel = require('../../models/AdminModel');
//解析JSON格式请求体的中间件
const jsonParser = bodyParser.json()
//导入路由中间件
const router = express.Router()

//注册
router.post('/enroll', jsonParser, (req, res, next) => {
    const Admin = req.body
    let { id, password } = Admin
    adminModel.create({
        adminId: id,
        password: password
    }).then((data) => {
        res.json(1001);
    }).catch((err) => {
        // 处理错误情况
        res.json(1002);
        console.error(err);
    });
})

//登录
router.post('/login', jsonParser, (req, res, next) => {
    const Admin = req.body
    let { id, password } = Admin
    //查找账号
    adminModel.findOne({ adminId: id }).then((data) => {
        let { avatar, name, division, position, adminId, power } = data
        if (data.password == password) {
            let token = jwt.sign({
                _id: data._id,
            }, 'cjy', {
                expiresIn: 60 * 60 * 24 * 7
            });
            //响应 token
            res.json({
                code: '2001',
                msg: '登录成功',
                _id: data._id,
                token: token,
                admin: {
                    avatar: avatar,
                    name: name,
                    division: division,
                    position: position,
                    adminId: adminId,
                    power: power
                }
            })
        } else {
            res.json(2002);
        }
    }).catch((err) => {
        // 处理错误情况
        res.json(2003);
    });
})

// 修改
router.post('/update', jsonParser, checkTokenMiddle, (req, res, next) => {
    let _id = req.user._id
    // console.log(_id);
    let { avatar, name, division, position, adminId } = req.body
    adminModel.updateOne({ _id: _id }, {
        avatar: avatar,
        name: name,
        division: division,
        position: position,
        adminId: adminId,
    }).then(data => {
        res.json({
            code: '1000',
            msg: '修改成功',
            admin: {
                avatar: avatar,
                name: name,
                division: division,
                position: position,
                adminId: adminId,
            }
        })
    }).catch(err => {
        res.json({
            code: '1001',
            msg: '修改失败',
            err: err
        })
    });
})

// 查找
router.get('/find', jsonParser, checkTokenMiddle, (req, res, next) => {
    let _id = req.user._id
    const token = req.headers.token;
    adminModel.findOne({ _id: _id }).then((data) => {
        // console.log(data);
        const { avatar, name, division, position, adminId, power } = data
        const admin = {
            avatar: avatar,
            name: name,
            division: division,
            position: position,
            adminId: adminId,
            power: power
        }
        res.json({
            code: '2001',
            msg: '登录成功',
            _id: _id,
            token: token,
            admin: admin
        })
    }).catch((err) => {
        // 处理错误情况
        console.error(err);
    });
})

//查找可预约医生
router.get('/doctor', jsonParser, (req, res, next) => {
    adminModel.find({}).then((data) => {
        const doctor = data.map(({ _id, name, division, position }) => ({ _id, name, division, position }));
        res.json(doctor)
    }).catch((err) => {
        // 处理错误情况
        console.error(err);
    });
})

module.exports = router;