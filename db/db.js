//安装mongoose
//导入mongoose
const mongoose = require('mongoose')
//导入配置文件
const config = require('../config/config')

//success数据库连接成功回调
//error数据库连接失败回调
module.exports = function (success, error) {
    //判断error是否为undefined,为其设置默认值
    if (typeof error !== 'function') {
        error = () => {
            console.log('连接失败!');
            console.log(error);
        }
    }

    //解构赋值
    const { DBHOST, DBPORT, DBNAME } = config

    //连接mongoose服务 test数据库名称
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);
    //设置回调 once只执行一次
    mongoose.connection.once('open', () => {
        success();
        console.log('连接成功');
    })//连接成功回调
    mongoose.connection.on('error', () => {
        error();
    })//连接错误回调
    mongoose.connection.on('close', () => {
        console.log('连接关闭');
    })//连接关闭回调
}