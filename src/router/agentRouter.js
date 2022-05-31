// 启用koa路由
const Router = require('koa-router');

// controller中的方法
const {
    createAgent,
    login,
    saveJson
} = require('../controller/agentController');

const {
    userValidator,
    verifyAgent,
    handlePassword,
    verifyLogin,
    jsonValidator,
    checkIfJsonRepeatOrNotExists
} = require('../middleware/agentMiddleware');

const agentRouter = new Router({ prefix: '/agent' });
// 创建用户前先验证用户名是否已注册、再加密密码，最后插入数据库
agentRouter.post('/registerAgent', userValidator, verifyAgent, handlePassword, createAgent);

agentRouter.post('/login', userValidator, handlePassword, verifyLogin, login)
// 校验json是否合法，是的话将json列表存入数据库
agentRouter.post('/saveJson', jsonValidator, checkIfJsonRepeatOrNotExists, saveJson);

module.exports = agentRouter;