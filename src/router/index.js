// node自带的文件模块fs
const fs = require('fs');

const loadRouters = app => {
    // __dirname：当前模块目录的路径名
    // fs.readdirSync：（同步地）读取该路径目录下的各文件名
    fs.readdirSync(__dirname).forEach(file => {
        if(file === 'index.js') return;
        // 加载文件
        const router = require(`./${file}`);
        // 
        app.use(router.routes());
        app.use(router.allowedMethods());
    })
}

module.exports = loadRouters;