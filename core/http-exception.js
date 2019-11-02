
/**
 * 异常基类
 * @class HttpException
 * errorCode : 自定义错误码
 * code : 返回http状态码，用于 ctx.status
 * @extends {Error}
 */
class HttpException extends Error {
    constructor(msg = '你在干嘛呢？', errorCode = 10000, code = 400) {
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
class ParameterException extends HttpException{
    constructor(msg,errorCode){
        super()
        this.code = 400
        this.msg = msg || '参数错误'
        this.errorCode = errorCode || 10000
    }
}

module.exports = {
    HttpException,
    ParameterException
}