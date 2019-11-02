const Router = require('koa-router')
const router = new Router()

router.post('/v1/:id/classic/latest', (ctx, next) => {
    const path = ctx.params
    const query = ctx.request.query
    const headers = ctx.request.header
    const body = ctx.request.body
    if (true) {
        // const error = new HttpException('??', 10001, 400)
        const error = new global.errs.ParameterException()
        throw error
    }

    ctx.body = { key: "classic" }
    // throw new Error('API Exeption')

})

module.exports = router