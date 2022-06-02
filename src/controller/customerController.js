const service = require('../service/customerService');
class CustomerController {
    /**
     * 获取所有json
     * @param {*} ctx 
     * @param {*} next 
     */
    async getAllJson(ctx, next) {
        const result = await service.getAllJson();
        //返回
        ctx.body = {
            jsonList: result
        };
        await next();
    }

    async getAllAgentHouse(ctx, next) {
        const result = await service.getAllAgentHouse();
        //返回
        ctx.body = {
            agentHouse: result
        };
        await next();
    }

    async getAgentHouse(ctx, next) {
        const { page, pageSize } = ctx.query
        const result = await service.getAgentHouse(page, pageSize);
        //返回
        ctx.body = {
            agentHouse: result
        };
        await next();
    }
}

module.exports = new CustomerController();