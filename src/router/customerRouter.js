// 启用koa路由
const Router = require('koa-router');

const {
    getAllJson,
    getAllAgentHouse
} = require('../controller/customerController')

const customerRouter = new Router({prefix: '/customer'});
// 获取所有json
customerRouter.get('/getAllJson', getAllJson);
// 获取所有房源信息
customerRouter.get('/getAllAgentHouse', getAllAgentHouse);

module.exports = customerRouter;