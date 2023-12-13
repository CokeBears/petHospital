//导入express
const express = require('express');

//转换文件路径path
const path = require('path');

//创建应用对象
const app = express();
//跨域解决
const cors = require('cors');
//导入mongoose
const mongoose = require('mongoose');

//导入db
const db = require('./db/db');
//导入路由
const helloRouter = require('./router/web/hello');
const wxlogin = require('./router/api/userLogin')
const pet = require('./router/api/pet')
const upload = require('./router/api/upload')
const register = require('./router/api/register')
const adminLogin = require('./router/api/adminLogin')
const commodity = require('./router/api/commodity')
const cart = require('./router/api/cart')
const order = require('./router/api/order')

//连接数据库
db(() => {
    app.use(cors());
    app.use(express.static(path.join(__dirname, "../static")))
    //引入路由
    app.use('/', helloRouter)
    app.use('/', wxlogin)
    app.use('/pet', pet)
    app.use('/upload', upload)
    app.use('/register', register)
    app.use('/adminLogin', adminLogin)
    app.use('/commodity', commodity)
    app.use('/cart',cart)
    app.use('/order',order)
    
    //图片访问
    app.use('/uploads', express.static('uploads'));
    //监听端口
    app.listen(3000, () => {
        console.log('服务已启动,端口3000正在监听');
    })
})

