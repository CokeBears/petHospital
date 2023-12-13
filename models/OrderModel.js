//导入 mongoose
const mongoose = require('mongoose');
//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
let orderSchema = new mongoose.Schema({
    openId: {//openid主键，用户id
        type: String,
        required: true, //必填项
    },
    user:{
        type: Object,
        default: {},
    },
    cart: {
        type: Array,
        default: [],
    },
    state: {
        type: String,
        default: '未支付'
    },
    time: {
        type: String,
        default: ''
    },
    totalPrice:{
        type: Number,
        default: 0
    }
});

//创建模型对象  对文档操作的封装对象
let orderModel = mongoose.model('oredr', orderSchema);
//暴露模型对象
module.exports = orderModel;
