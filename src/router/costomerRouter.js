// 启用koa路由
const Router = require('koa-router');

const costomerRouter = new Router({prefix: '/costomer'});

module.exports = costomerRouter;