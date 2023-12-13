//导入 mongoose
const mongoose = require('mongoose');
//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
let commoditySchema = new mongoose.Schema({
  name: {//商品名称
    type: String,
    required: true, //必填项
  }, price: {//价格
    type: Number,
    required: true,
  }, sort: {//类别
    type: String,
    required: true,
  }
});

//创建模型对象  对文档操作的封装对象
let commodityModel = mongoose.model('commodity', commoditySchema);

//暴露模型对象
module.exports = commodityModel;
