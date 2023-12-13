const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// 配置Multer，只接受图片文件
const storage = multer.memoryStorage(); // 将文件保存在内存中
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    // 接受图片文件
    cb(null, true);
  } else {
    // 拒绝非图片文件
    cb(new Error('只能上传图片文件'), false);
  }
};

const upload = multer({ storage, fileFilter });

// 图片上传必须用post方法
router.post('/', upload.single('file'), (req, res) => {
    fs.writeFile(path.join(__dirname, '../../uploads/' + req.file.originalname), req.file.buffer, (err) => {
        if (err) { 
            return res.send('写入失败');
        }
        res.json(req.file.originalname);
    });
});

module.exports = router;