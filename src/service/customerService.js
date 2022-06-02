const connections = require('../app/database');

class CustomerService {
    /**
     * 查询所有json并返回
     * @param {*}
     * @returns 查询结果
     */
    async getAllJson() {
        const statement = `SELECT * FROM json_table`;
        const result = await connections.execute(statement);
        // result数组有两部分，result[0]是查询到的多条结果，result[1]是表中的所有字段名
        return result[0];
    }

    async getAllAgentHouse() {
        const statement = `SELECT * FROM agent_house`;
        const result = await connections.execute(statement);
        // result数组有两部分，result[0]是查询到的多条结果，result[1]是表中的所有字段名
        return result[0];
    }

    async getAgentHouse(page=1, pageSize=10) {
        const statement = `SELECT * FROM agent_house LIMIT ${(page - 1)*pageSize}, ${pageSize}`;
        const result = await connections.execute(statement);
        // result数组有两部分，result[0]是查询到的多条结果，result[1]是表中的所有字段名
        return result[0];
    }
}

module.exports = new CustomerService();