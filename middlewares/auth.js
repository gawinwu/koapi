const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
    constructor(level) {
        this.level = level || 1
        Auth.USER = 8
        Auth.ADMIN = 16
        Auth.SUPER_ADMIN = 32
    }
    get m() {

        // token检测
        return async (ctx, next) => {
            const userToken = basicAuth(ctx.req)
            // ctx.req = Node原生的request对象
            // ctx.request = koa 对原生的封装

            let errMsg = 'token不合法'
            if (!userToken || !userToken.name) {
                throw new global.errs.Forbbiden(errMsg)
            }
            try {
                var decode = jwt.verify(userToken.name, global.config.security.secretKey)
            } catch (error) {
                if (error.name == 'TokenExpiredError') {
                    errMsg = 'token已过期'
                }
                throw new global.errs.Forbbiden(errMsg)
            }

            if (decode.scope < this.level) {
                errMsg = '权限不足'
                throw new global.errs.Forbbiden(errMsg)
            }

            // uid,scope
            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            }
            await next()
        }
    }

    // 验证token
    static verifyToken(token) {
        try {
            jwt.verify(token, global.config.security.secretKey)
            return true
        }
        catch (error) {
            return false
        }

    }
}

module.exports = {
    Auth
}