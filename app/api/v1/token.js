const Router = require('koa-router')

const {
    TokenValidator,
    NotEmptyValidator
} = require('../../validators/validator')

const { LoginType } = require('../../lib/enum')
const { User } = require('../../models/user')

const { WXManager } = require('../../services/wx')

const { generateToken } = require('../../../core/util')
const { Auth } = require('../../../middlewares/auth')

const router = new Router({
    prefix: '/v1/token'
})

router.post('/', async (ctx) => {
    const v = await new TokenValidator().validate(ctx)
    let token;
    switch (v.get('body.type')) {
        case LoginType.USER_EMAIL:
            if (!v.get('body.secret')) {
                throw new global.errs.ParameterException('密码没有输入')
            }
            token = await emailLogin(v.get('body.account'), v.get('body.secret'))
            break;
        case LoginType.USER_MINI_PROGRAM:
            // v.get('body.account') wx code
            token = await WXManager.codeToToken(v.get('body.account'))
            break;
        case LoginType.ADMIN_EMAIL:
            break;
        default:
            throw new global.errs.ParameterException('没有相应的处理函数')
    }
    ctx.body = { token }
})

router.post('/verify', async (ctx) => {
    // 给前端检测token是否有效
    const v = await new NotEmptyValidator().validate(ctx)
    const relust = Auth.verifyToken(v.get('body.token'))
    ctx.body = { is_valid: relust }
})

async function emailLogin(account, secret) {
    const user = await
        User.verifyEmailPassword(account, secret)
    return generateToken(user.id, Auth.USER)
}

module.exports = router