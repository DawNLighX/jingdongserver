/**
 * @description 返回失败的数据模型
 * @author DawNLighX
 */

class ErrorModel {
    constructor(errno = -1, message = 'error') {
        this.errno = errno
        this.message = message
    }
}

module.exports = ErrorModel