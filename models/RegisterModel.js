//导入 mongoose
const mongoose = require('mongoose');
//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
let registerSchema = new mongoose.Schema({
    openId: {//openid主键，用户id
        type: String,
        required: true, //必填项
    },
    pet: {
        type: Object,
        required: true,
    },
    doctor: {
        type: Object,
        required: true,
    },
    items: {//医护项目
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    }
    , state: {//状态
        type: Number,
        default: 0
    }
    , cases: {//病例
        type: String,
        default: ''
    }
    , commodity: {//医疗项目
        type: Array,
        default: []
    }
});

//创建模型对象  对文档操作的封装对象
let registerModel = mongoose.model('register', registerSchema);

//暴露模型对象
module.exports = registerModel;