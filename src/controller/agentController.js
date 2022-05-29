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
        // 签名，颁发认证
        // 1. 借助openssl生成公钥、私钥
        //      生成私钥：genrsa -out private.key 1024
        //      生成公钥：rsa -in private.key -pubout -out public.key
        const { username, password } = user;
        const token = jwt.sign({ username, password }, PRIVATE_KEY, {
            expiresIn: 60 * 10,
            algorithm: "RS256",
        });
        //返回
        ctx.body = {
            message: `注册成功！${username}，欢迎~`,
            username,
            password,
            token,
        };

        await next();
    }
}

module.exports = new AgentController();