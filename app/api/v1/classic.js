const Router = require('koa-router')

const { Auth } = require('../../../middlewares/auth')

const { Flow } = require('../../models/flow')
const { Art } = require('../../models/art')
const { Favor } = require('../../models/favor')

const router = new Router({
    prefix: '/v1/classic'
})

// 
router.get('/latest', new Auth().m, async (ctx, next) => {
    // ctx.body = ctx.auth.uid + ' scpoe:' + ctx.auth.scope
    const flow = await Flow.findOne({
        order: [
            ['index', 'DESC']
        ]
    })
    const art = await Art.getData(flow.art_id, flow.type)
    const LikeLatest = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid)
    // art.dataValues.index = flow.index
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', LikeLatest)
    ctx.body = art
})

module.exports = router