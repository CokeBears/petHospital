//宠物管理
const express = require('express')
//导入解析报文的包body-parser
const bodyParser = require('body-parser')
const checkTokenMiddle = require('../../middlewares/checkTokenMiddle')
//导入model
// const md5 = require('md5');
const petModel = require('../../models/PetModel');
const fs = require('fs');
const path = require('path');

//解析JSON格式请求体的中间件
const jsonParser = bodyParser.json()
//解析querystring（是一种用&连接的格式）格式请求体的中间件
const urlencodedParser = bodyParser.urlencoded({ extended: false })
//导入路由中间件
const router = express.Router()

router.get('/', jsonParser, checkTokenMiddle, (req, res, next) => {
    let openid = req.user.openId
    //查找宠物
    petModel.find({ openId: openid }).then((data) => {
        res.json(data)
    }).catch((err) => {
        // 处理错误情况
        console.error(err);
    });
})

router.post('/find', jsonParser, checkTokenMiddle, (req, res, next) => {
    let id = req.body.id
    //查找宠物
    petModel.findOne({ _id: id }).then((data) => {
        res.json(data)
    }).catch((err) => {
        // 处理错误情况
        console.error(err);
    });
})

router.post('/push', jsonParser, checkTokenMiddle, (req, res, next) => {
    //新建宠物
    let openid = req.user.openId
    let { phone, name, variety, radio, date, sterilization, vaccine, avatar } = req.body
    petModel.create({
        openId: openid,
        name: name,
        phone: phone,
        variety: variety,
        radio: radio,
        petImg: avatar,
        petDate: date,
        sterilization: sterilization,
        vaccine: vaccine
    }).then((data) => {
        res.status(200).send('成功提交');
    }).catch((err) => {
        // 处理错误情况
        console.error(err);
    });
})

router.delete('/delete', jsonParser, checkTokenMiddle, (req, res, next) => {
    const id = req.query.id
    const avatar = req.query.avatar
    const imagePath = path.join('uploads', avatar);
    //删除头像
    fs.unlink(imagePath, (err) => {
        if (err) {
            console.error(err);
        } else {
            //删除宠物数据
            petModel.deleteOne({ _id: id }).then((data) => {
                res.status(200).send('成功删除');
            }).catch((err) => {
                // 处理错误情况
                console.error(err);
            });
        }
    })

})

router.post('/revise', jsonParser, checkTokenMiddle, (req, res, next) => {
    // 需要宠物id
    let openid = req.user.openId
    const id = req.query.id
    const oldAvatar = req.query.oldAvatar
    let { name, variety, radio, date, sterilization, vaccine, avatar } = req.body
    //先删除原先的头像
    if (oldAvatar != avatar) {
        // console.log('新头像');
        const imagePath = path.join('uploads', oldAvatar);
        fs.unlink(imagePath, (err) => {
            console.error(err);
        })
    }
    //通过id修改宠物数据
    petModel.updateOne({ _id: id }, {
        openId: openid,
        name: name,
        variety: variety,
        radio: radio,
        petImg: avatar,
        petDate: date,
        sterilization: sterilization,
        vaccine: vaccine
    }).then(data => {
        res.json({
            code: '1000',
            msg: '修改成功',
            pet: data
        })
    }).catch(err => {
        res.json({
            code: '1001',
            msg: '修改失败',
            err: err
        })
    });
})

module.exports = router;