const Router = require('koa-router')
const router = new Router()

const { PositiveIntegerValidator } = require('../../validators/validator')

router.post('/v1/:id/classic/latest', (ctx, next) => {
    const path = ctx.params
    const query = ctx.request.query
    const header = ctx.request.header
    const body = ctx.request.body

    const v = new PositiveIntegerValidator().validate(ctx)
    const id = v.get('path.id')
    // const id = v.get('path.id',parsed=false) //parsed=false 路过校验

    // if (true) {
    //     // const error = new HttpException('??', 10001, 400)
    //     const error = new global.errs.ParameterException()
    //     throw error
    // }

    ctx.body = { key: "classic" }
    // throw new Error('API Exeption')

})

module.exports = router