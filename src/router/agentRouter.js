// 启用koa路由
const Router = require('koa-router');

// controller中的方法
const {
    createAgent,
    login,
    saveJson,
    getAllJson,
    getJsonById,
    getHouseList,
    getHouseInfoById
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
// 返回所有的json
agentRouter.get('/getAllJson', getAllJson);
// 根据id查找并返回对应json
agentRouter.get('/getJson', getJsonById);
// 返回所有楼盘的id和listing_name
agentRouter.get('/getHouseList', getHouseList);
// 根据楼盘id，返回对应楼盘的所有信息
agentRouter.get('/getHouseInfo', getHouseInfoById);

module.exports = agentRouter;