
// dotenv能将.env中的配置提取到process.env中
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
dotenv.config();

// 读取公钥、私钥并导出
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'));

module.exports = {
    APP_PORT,
    MYSQL_PORT,
    MYSQL_HOST,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
} = process.env;

module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;