/**
 * 项目入口文件
 */
// 导入Koa实例对象app
const app = require('./app');
// 端口配置对象
const config = require('./app/config');
require('./app/database');
// 实际上app.listen是封装的http.listen
// 创建http服务并监听端口号
app.listen(config["APP_PORT"], () => {
    console.log('http服务已被创建并监听。');
});