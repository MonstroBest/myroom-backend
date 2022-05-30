const service = require('../service/agentService');
const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app/config");

class AgentController {
    /**
     * 创建经纪人用户账号
     * @param {*} ctx context
     * @param {*} next next
     */
    async createAgent(ctx, next) {
        const user = ctx.request.body;
        const result = await service.createAgent(user);
        const { username, password } = user;
        //返回
        ctx.body = {
            message: `注册成功！${username}，欢迎~`
        };
        await next();
    }
    /**
     * 经纪人登录
     * @param {*} ctx 
     * @param {*} next 
     */
    async login(ctx, next) {
        const { username, password } = ctx.request.body;
        // 签名，颁发认证
        // 1. 借助openssl生成公钥、私钥
        //      生成私钥：genrsa -out private.key 1024
        //      生成公钥：rsa -in private.key -pubout -out public.key
        const token = jwt.sign({ username, password }, PRIVATE_KEY, {
            expiresIn: 60 * 10,
            algorithm: "RS256",
        });
        ctx.body = {
            message: `登录成功！${username}，欢迎~`,
            token
        };
    }
    /**
     * 存储json
     * @param {*} ctx 
     * @param {*} next 
     */
    async saveJson(ctx, next) {
        const jsonInfo = ctx.request.body;
        const mes = await service.saveJson(jsonInfo);
        //返回
        ctx.body = {
            message: `id为${jsonInfo.id}的JSON${mes}~`
        };
        await next();
    }
}

module.exports = new AgentController();