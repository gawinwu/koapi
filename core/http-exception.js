
/**
 * 全局异常处理
 * @class HttpException
 * errorCode : 自定义错误码
 * code : 返回http状态码，用于 ctx.status
 * @extends {Error}  继承 node Error interface
 */
class HttpException extends Error {
    constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
        super()
        this.errorCode = errorCode
        this.code = code
        this.msg = msg
    }
}

/**
 * 参数错误处理类
 * @class ParameterException
 * @extends {ParameterException}
 */
class ParameterException extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 400
        this.msg = msg || '参数错误'
        this.errorCode = errorCode || 10000
    }
}


class Success extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 201
        this.msg = msg || 'ok'
        this.errorCode = errorCode || 0
    }
}

class NotFound extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '资源未找到'
        this.errorCode = errorCode || 10000
        this.code = 404
    }
}
class AuthFailed extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '授权失败'
        this.errorCode = errorCode || 10004
        this.code = 401
    }
}

class Forbbiden extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '禁止访问'
        this.errorCode = errorCode || 10006
        this.code = 403
    }
}

class LikeError extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || "你已经点赞过了"
        this.errorCode = errorCode || 60001
        this.code = 400
    }
}

class DislikeError extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || "你已取消点赞了"
        this.errorCode = errorCode || 60002
        this.code = 400
    }
}


module.exports = {
    HttpException,
    ParameterException,
    Success,
    NotFound,
    AuthFailed,
    Forbbiden,
    LikeError,
    DislikeError
}