// 启用koa路由
const Router = require('koa-router');
// 处理文件上传的第三方中间件
const multer = require('koa-multer');
const path = require('path');

// controller中的方法
const {
    uploadFile
} = require('../controller/fileController');

// const {
    
// } = require('../middleware/fileMiddleware');
const fileRouter = new Router({ prefix: '/file' });
const storage = multer.diskStorage({
    // 设置文件存放路径
    destination: (req, file, callback) => {
        // 回调函数
        callback(null, 'src/uploads/');
    },
    // 指定接受到的文件存放本地时的文件名
    // path.extname() 取出文件的后缀名，如'index.html'取出'.html'
    // file.originalname 上传文件的原始名称
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({
    storage,
    dest: '../uploads/'
});
//
fileRouter.post('/uploadFile', upload.single('file'), uploadFile);

module.exports = fileRouter;