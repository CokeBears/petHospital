//导入 mongoose
const mongoose = require('mongoose');
//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
let adminSchema = new mongoose.Schema({
  adminId: {//id
    type: String,
    required: true, //必填项
    unique: true  //唯一值
  }, password: {//密码
    type: String,
    required: true,
  }, avatar: {//头像位置
    type: String,
    default: '57b1a0ebbdca4dd7b2207b352f0f515b.jpg'
  }, name: {//姓名
    type: String,
    default: '未取名用户'
  }, division: {//科室
    type: String,
    default: '未选科室'
  }, position: {//职务
    type: String,
    default: '未选职务'
  }, power: {//权限
    type: Number,
    default: 1
  }, time: {
    type: Array,
    default: 0
  }
});

//创建模型对象  对文档操作的封装对象
let adminModel = mongoose.model('admin', adminSchema);

//暴露模型对象
module.exports = adminModel;
