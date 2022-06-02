const service = require('../service/fileService');
class FileController {
    /**
     * 上传单个文件
     * @param {*} ctx 
     * @param {*} next 
     */
    async uploadFile(ctx, next) {
        const file = ctx.req.file;
        ctx.body = {
            filePath: `http://180.184.74.142/${file.filename}`
        }
    }
}

module.exports = new FileController();