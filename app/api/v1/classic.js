const Router = require('koa-router')

const { Auth } = require('../../../middlewares/auth')

const { Flow } = require('../../models/flow')
const { Art } = require('../../models/art')
const { Favor } = require('../../models/favor')

const { PositiveIntegerValidator, ClassicValidator } = require('../../validators/validator')

const router = new Router({
    prefix: '/v1/classic'
})

// 最新
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

// 下一期
router.get('/:index/next', new Auth().m, async (ctx) => {
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'index'
    })
    const index = v.get('path.index')
    const art = await getNextOrPrevious(index, 'next', ctx.auth.uid)
    ctx.body = art
})

// 上一期
router.get('/:index/previous', new Auth().m, async (ctx) => {
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'index'
    })
    const index = v.get('path.index')
    const art = await getNextOrPrevious(index, 'previous', ctx.auth.uid)
    ctx.body = art
})

// 点赞详情
router.get('/:type/:id', new Auth().m, async ctx => {
    const v = await new ClassicValidator().validate(ctx)
    const id = v.get('path.id')
    const type = parseInt(v.get('path.type'))

    const artDetail =await  new Art(id, type).getDetail(ctx.auth.uid)
    artDetail.art.setDataValue('like_status', artDetail.like_status)
    ctx.body = artDetail.art
})

// 点赞情况
router.get('/:type/:id/favor', new Auth().m, async ctx => {
    const v = await new ClassicValidator().validate(ctx)
    const id = v.get('path.id')
    const type = parseInt(v.get('path.type'))

    // const art = await Art.getData(id, type)
    // if (!art) {
    //     throw new global.errs.NotFound()
    // }
    // const isLike = await Favor.userLikeIt(id, type, ctx.auth.uid)
    // 使用 Art.getDetail 简化上面代码 
    const artDetail = await new Art(id, type).getDetail(ctx.auth.uid)
    artDetail.art.setDataValue('like_status', artDetail.like_status)
    // ctx.body = artDetail.art 
    ctx.body = {
        fav_nums: artDetail.art.fav_nums,
        like_status: artDetail.like_status
    }
})

// 用户的点赞列表
router.get('/favor', new Auth().m, async ctx => {
    const uid = ctx.auth.uid
    ctx.body = await Favor.getMyClassicFavors(uid)
})

const getNextOrPrevious = async (index, way = 'next', uid) => {
    const number = way === 'next' ? index + 1 : index - 1
    const flow = await Flow.findOne({
        where: {
            index: number
        }
    })
    if (!flow) {
        throw new global.errs.NotFound()
    }
    const art = await Art.getData(flow.art_id, flow.type)
    const like = await Favor.userLikeIt(flow.art_id, flow.type, uid)
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', like)
    // art.exclude = ['index','like_status']
    return art
}

module.exports = router