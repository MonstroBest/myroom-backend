/**
 * 检查是否是合法json
 * @param {*} json 要检查的变量
 * @returns 是否是json
 */
function jsonValidate(json) {
    if (typeof json === 'string') {
        try {
            var obj = JSON.parse(json);
            // parse后的值是对象且不为null
            if (typeof obj === 'object' && obj) {
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    }
    return false;
}

module.exports = {
    jsonValidate
}