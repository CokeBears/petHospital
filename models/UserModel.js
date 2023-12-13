//导入 mongoose
const mongoose = require('mongoose');
//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
let userSchema = new mongoose.Schema({
  openId: {//openid主键，用户id
    type: String,
    required: true, //必填项
    unique: true  //唯一值
  },
  userName:{//用户名
    type: String,
    required:true,
  },
  phone:{//手机号
    type: String,
    required: true, //必填项
    unique: true  //唯一值
  },
  userImg:{//头像存储地址
    type: String,
    required:true,
  },
  cart:{
    type:Array,
    default:[],
  }
});

//创建模型对象  对文档操作的封装对象
let userModel = mongoose.model('user', userSchema);

//暴露模型对象
module.exports = userModel;
