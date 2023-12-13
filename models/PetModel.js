//导入 mongoose
const mongoose = require('mongoose');
//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
let petSchema = new mongoose.Schema({
    openId: {
        type: String,
        required: true, //必填项
    },
    phone: {//手机号
        type: String,
        required: true, //必填项
    },
    name: {//宠物名
        type: String,
        required: true,
    },
    variety: {//品种
        type: String,
        required: true, //必填项
    },
    radio: {//性别
        type: String,
        required: true, //必填项
    },
    petImg: {//头像存储地址
        type: String,
        required: true,
    },
    petDate: {//生日
        type: String,
        required: true,
    },
    sterilization: {//绝育
        type: Boolean,
        required: true,
    },
    vaccine: {//疫苗
        type: Boolean,
        required: true,
    }
});

//创建模型对象  对文档操作的封装对象
let petModel = mongoose.model('pet', petSchema);

//暴露模型对象
module.exports = petModel;