// 启用koa路由
const Router = require('koa-router');

// controller中的方法
const {
    createAgent
} = require('../controller/agentController');

const {
    verifyAgent,
    handlePassword,
} = require('../middleware/agentMiddleware');

const agentRouter = new Router({prefix: '/agent'});
// 创建用户前先验证用户名是否已注册、再加密密码，最后插入数据库
agentRouter.post('/registerAgent', verifyAgent, handlePassword, createAgent);

module.exports = agentRouter;