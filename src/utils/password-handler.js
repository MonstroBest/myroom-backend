// 使用node自带的库来进行加密
const crypto = require('crypto');

const md5Password = (password) => {
    // 使用md5对象对密码进行加密
	const md5 = crypto.createHash('md5');
    const md5Psw = md5.update(password).digest('hex');
    return md5Psw;
};

module.exports = md5Password;