/**
 * 对各种错误返回相应的响应状态码和响应信息
 */
const errorTypes = require('../constants/error-types');

const errorHandler = (err, ctx) => {
    console.log(err.message);

    let status, message;

    switch (err.message) {
        case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400; //Bad request
            message = '用户名和密码不能为空';
            break;
        case errorTypes.NAME_ALREADY_EXISTS:
            status = 409; //conflict
            message = '用户名已被注册';
            break;
        case errorTypes.USER_IS_NOT_EXIST:
            status = 400; //Bad request
            message = '用户名或密码错误';
            break;
        case errorTypes.NAME_OR_PASSWORD_IS_INCORRECT:
            status = 400; //Bad request
            message = '用户名或密码错误';
            break;
        case errorTypes.UNAUTHORIZATION:
            status = 401; //Unauthorized
            message = '无效token，需要重新登录';
            break;
        case errorTypes.NOT_A_JSON:
            status = 400; //Bad request
            message = '数据不是json格式';
            break;
        case errorTypes.JSON_ALREADY_EXISTS:
            status = 409; //conflict
            message = '该author下存在重名的json';
            break;
        case errorTypes.JSON_NOT_EXISTS:
            status = 409; //conflict
            message = '该author下不存在该json';
            break;
        default:
            status = 408;
            message = 'Unknown error.';
            break;
    }

    ctx.status = status;
    ctx.body = message;
}

module.exports = errorHandler;