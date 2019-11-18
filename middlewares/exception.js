const { HttpException } = require('../core/http-exception')

// 异常处理 
const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        const isHttpException = error instanceof HttpException
        const isDev = global.config.environment === 'dev'

        // 开发环境 并且 不是自定义的异常处理 HttpException
        if (isDev && !isHttpException) {
            throw error
        }
        
         // 生成环境
        if (isHttpException) {
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
            ctx.status = 500
        }
    }
}

module.exports = catchError
