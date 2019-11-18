/* eslint-disable no-unused-vars */
const Router = require('koa-router')
const { HotBook } = require('../../models/hot-book')
const { Book } = require('../../models/book')

const {
    PositiveIntegerValidator,
    SearchValidator,
    AddShortCommentValidator
} = require('@validator')

const router = new Router({
    prefix: '/v1/book'
})

/**
 * 获取热门书籍
 */
router.get('/hot_list', async ctx => {
    const books = await HotBook.getAll()
    ctx.body = books
})

router.get('/:id/detail', async ctx => {
    const v = await new PositiveIntegerValidator().validate(ctx)
    const book = new Book(v.get('path.id'))
    ctx.body = await book.detail()
})

router.get('/search', async ctx => {
    const v = await new SearchValidator().validate(ctx)
    const result = await Book.searchFromYuShu(
        v.get('query.q'), v.get('query.start'), v.get('query.count'))
    ctx.body = result
})

module.exports = router