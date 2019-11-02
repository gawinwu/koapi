const { HttpException } = require('../core/http-exception')

// 异常处理 
const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        if (global.config.environment === 'dev') {
            throw error
        }

        if (error instanceof HttpException) {
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        } else {
            // global.config.environment != 'dev'
            ctx.body = {
                msg: '服务器这会打盹了!',
                error_code: 999,
                request: `${ctx.method} ${ctx.path}`
            }
        }
    }
}

module.exports = catchError