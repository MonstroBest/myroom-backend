const Koa = require('koa');
const app = new Koa();
const path = require('path');
const cors = require('koa2-cors');
const koaStatic = require('koa-static');
// 解析requst.body
//! 注意：koa-bodyparser不支持formdata类型 
const bodyParser = require('koa-body');
const loadRouters = require('../router');
const errorHandler = require('./error-handler');
// 使用koa-cors处理cors预检
app.use(cors({
    // Origin
    origin: '*',
    // Access-Control-Allow-Methods
    methods: ['GET', 'POST', 'OPTIONS', 'PUT'],
    // Access-Control-Allow-Headers
    headers: ['Content-Type', 'Authorization']
}));
// 加载路由
app.loadRouters = loadRouters;
// 要先加载bodyparser中间件再加载路由
// app.use(bodyParser({
//     // 记得配置
//     formidable: {
//         // 文件上传到哪个文件夹下
//         uploadDir: path.join(__dirname, '../uploads')
//     },
//     multipart: true,
//     urlencoded: true
// }));
app.use(async (ctx, next) => {
    // 这里不用async await，后面有异步代码直接寄
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    ctx.set("Access-Control-Allow-Headers", "Authorization");
    await next();
})
app.loadRouters(app);
app.on('error', errorHandler);
app.use(koaStatic('./src/uploads/'));
// 返回给用户信息
app.use(ctx => {
    // ctx.response.body设置返回给用户的信息
    ctx.response.body = ctx.body;
});
module.exports = app;