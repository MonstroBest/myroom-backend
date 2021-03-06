const errorTypes = require("../constants/error-types");
const { getAgentName, getJsonByAuthorAndName, getJsonById } = require("../service/agentService");
const passwordHandler = require("../utils/password-handler");
const { jsonValidate } = require("../utils");
/**
 * 经纪人注册校验，验证用户名、密码是否为空、用户名是否已被注册
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
const userValidator = async (ctx, next) => {
    const { username, password } = ctx.request.body;
    console.log(`verify ${username} now`);
    //验证用户名或者密码不能为空
    if (!username || !password) {
        const err = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
        // 提交错误并返回
        return ctx.app.emit("error", err, ctx);
    }
    await next();
};
const verifyAgent = async (ctx, next) => {
    //验证用户名未被注册
    const { username } = ctx.request.body;
    const result = await getAgentName(username);
    if (result.length) {
        const error = new Error(errorTypes.NAME_ALREADY_EXISTS);
        return ctx.app.emit("error", error, ctx);
    }

    // 设为异步，等上面操作结果返回后再进行下一步
    await next();
};
/**
 * 对密码进行加密处理
 * @param {*} ctx
 * @param {*} next
 */
const handlePassword = async (ctx, next) => {
    const { password } = ctx.request.body;
    ctx.request.body.password = passwordHandler(password);

    await next();
};

/**
 * 经纪人登录校验，判断用户是否存在、密码是否匹配
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
const verifyLogin = async (ctx, next) => {

    const { username, password } = ctx.request.body;
    // 1. 判断用户是否存在
    const res = await getAgentName(username);
    if (!res.length) {
        const error = new Error(errorTypes.USER_IS_NOT_EXIST);
        return ctx.app.emit("error", error, ctx);
    }
    // 2. 密码是否匹配
    if (password !== res[0].agent_password) {
        const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_INCORRECT);
        return ctx.app.emit("error", error, ctx);
    }

    await next();
};
/**
 * 检查是否是合法JSON
 * @param {*} ctx 
 * @param {*} next 
 * @returns 
 */
const jsonValidator = async (ctx, next) => {
    const { json } = ctx.request.body;
    if (!jsonValidate(json)) {
        const error = new Error(errorTypes.NOT_A_JSON);
        return ctx.app.emit("error", error, ctx);
    }
    await next();
}
/**
 * 初次存储时检查该author下是否存在重名的name
 * @param {*} ctx 
 * @param {*} next 
 * @returns 
 */
const checkIfJsonRepeatOrNotExists = async (ctx, next) => {
    const { json, id } = ctx.request.body;
    const { author, name } = JSON.parse(json);
    if (!id) { // 没传id，说明是初次存储，需要检查是否有重复
        const result = await getJsonByAuthorAndName(author, name);
        if (result.length) {
            const error = new Error(errorTypes.JSON_ALREADY_EXISTS);
            return ctx.app.emit("error", error, ctx);
        }
    } else { // 传了id，说明是更新，需要检查是否存在
        const result = await getJsonById(id);
        if (!result.length) {
            const error = new Error(errorTypes.JSON_NOT_EXISTS);
            return ctx.app.emit("error", error, ctx);
        }
    }
    await next();
}

module.exports = {
    userValidator,
    verifyAgent,
    handlePassword,
    verifyLogin,
    jsonValidator,
    checkIfJsonRepeatOrNotExists
};
