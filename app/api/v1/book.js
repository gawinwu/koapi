const Router = require('koa-router')

const router = new Router({
    prefix: '/v1/book'
})

router.get('/latest', (ctx, next) => {
    ctx.body = { key: "books" }
})

module.exports = router