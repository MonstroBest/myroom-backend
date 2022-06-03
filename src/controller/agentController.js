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
        const { message, id } = await service.saveJson(jsonInfo);
        //返回
        ctx.body = {
            message: `id为${id.toString()}的JSON${message}~`,
            id
        };
        await next();
    }
    /**
     * 返回所有json的id和name
     * @param {*} ctx 
     * @param {*} next 
     */
    async getAllJson(ctx, next) {
        const res = await service.getAllJson();
        // res经处理后返回的结果，包含每条json的id和name
        const rtnRes = [];
        res.forEach(json => {
            const { json_value, json_id } = json;
            const jsonName = JSON.parse(json_value).name;
            rtnRes.push({
                jsonName,
                jsonId: json_id
            });
        });
        // 返回
        ctx.body = rtnRes;
        await next();
    }
    /**
     * 根据id返回对应json
     * @param {*} ctx 
     * @param {*} next 
     */
    async getJsonById(ctx, next) {
        // ctx.query中以对象的形式存放着GET请求的所有参数
        const { id } = ctx.query;
        const res = await service.getJsonById(id);
        // 返回
        ctx.body = {
            json: res[0]["json_value"],
            id
        };
        await next();
    }
    /**
     * 获取所有楼盘的id和listing_name
     * @param {*} ctx 
     * @param {*} next 
     */
    async getHouseList(ctx, next) {
        const res = await service.getHouseList();
        // 返回
        ctx.body = {
            houseList: res
        }
    }
    /**
     * 根据id查询对应楼盘的所有信息
     * @param {*} ctx 
     * @param {*} next 
     */
    async getHouseInfoById(ctx, next) {
        // ctx.query中以对象的形式存放着GET请求的所有参数
        const { id } = ctx.query;
        const res = await service.getHouseInfoById(id);
        // 返回
        ctx.body = {
            houseInfo: res[0]
        }
    }
}

module.exports = new AgentController();