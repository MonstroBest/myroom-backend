const connections = require('../app/database');

class AgentService {
    /**
     * 查询经纪人用户账号是否存在
     * @param {*} username 用户账号
     * @returns 查询结果
     */
    async getAgentName(username) {
        const statement = `SELECT * FROM agent_info WHERE agent_username = ?`;
        const result = await connections.execute(statement, [username]);
        // result数组有两部分，result[0]是查询到的多条结果，result[1]是表中的所有字段名
        return result[0];
    }
    /**
     * 创建经纪人用户
     * @param {*} user 用户信息对象，包含username和password
     * @returns 插入结果
     */
    async createAgent(user) {
        const { username, password, name } = user;
        const statement = `INSERT INTO agent_info (agent_username, agent_password, agent_name) VALUES (?, ?, ?);`;
        const result = await connections.execute(statement, [username, password, name]);
        return result[0];
    }
    /**
     * 存储json
     * @param {*} json 
     * @returns 
     */
    async saveJson(jsonInfo) {
        const { json, id } = jsonInfo;
        const jsonResult = await this.getJsonById(id);
        // 未存储过，进行存储
        if (!jsonResult.length) {
            const statement = `INSERT INTO json_table (json_id, json_value) VALUES (?, ?);`;
            await connections.execute(statement, [id, json]);
            return '存储成功';
        } else { // 存储过，进行修改
            await this.updateJsonById(json, id);
            return `修改成功`;
        }
    }
    /**
     * 根据id查询对应json
     * @param {*} id json的id
     * @returns 
     */
    async getJsonById(id) {
        const statement = `SELECT * from json_table WHERE json_id = ?;`
        const result = await connections.execute(statement, [id]);
        return result[0];
    }
    /**
     * 根据id更新对应json
     * @param {*} json 
     * @param {*} id 
     * @returns 
     */
    async updateJsonById(json, id) {
        const statement = `UPDATE json_table SET json_value = ? WHERE json_id = ?;`
        const result = await connections.execute(statement, [json, id]);
        return result[0];
    }
}

module.exports = new AgentService();