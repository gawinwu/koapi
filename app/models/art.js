const { Op } = require('sequelize')
const { flatten } = require('lodash')

const { Movie, Sentence, Music } = require('../models/classic')

// 抽象表 ， 用于查询不同类别 内容的具体数据
class Art {

    constructor(art_id, type) {
        this.art_id = art_id
        this.type = type
    }

    //获取明细
    async getDetail(uid) {
        const { Favor } = require('./favor')
        const art = await Art.getData(this.art_id, this.type)
        if (!art) {
            throw new global.errs.NotFound()
        }
        const like = await Favor.userLikeIt(this.art_id, this.type, uid)
        return { 
            art, 
            like_status: like }
    }

    /** 获取用户的点赞列表 下的 具体内容*/
    static async getList(artInfoList) {
        const artInfoObj = {
            // app\lib\enum.js ArtType
            100: [],
            200: [],
            300: []
        }
        for (let artInfo of artInfoList) {
            artInfoObj[artInfo.type].push(artInfo.art_id)
        }
        const arts = []
        for (let key in artInfoObj) {
            const ids = artInfoObj[key]
            if (ids.length === 0) {
                continue
            }
            key = parseInt(key)
            arts.push(await Art._getListByType(ids, key))
        }
        return flatten(arts) // flatten 数组扁平化
    }
    static async _getListByType(ids, type) {
        let arts = []
        const finder = {
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        }
        const scope = 'bh'
        switch (type) {
            case 100:
                arts = await Movie.scope(scope).findAll(finder)
                break;
            case 200:
                arts = await Music.scope(scope).findAll(finder)
                break;
            case 300:
                arts = await Sentence.scope(scope).findAll(finder)
                break;
            case 400:
                // art = await Moive.findOne(finder)
                break;
            default:
                break;
        }
        return arts
    }

    static async getData(art_id, type, useScope = true) {
        let art = null
        const finder = {
            where: {
                id: art_id
            }
        }
        const scope = useScope ? 'bh' : null
        switch (type) {
            case 100:
                art = await Movie.scope(scope).findOne(finder)
                break;
            case 200:
                art = await Music.scope(scope).findOne(finder)
                break;
            case 300:
                art = await Sentence.scope(scope).findOne(finder)
                break;
            case 400:
                // art = await Moive.findOne(finder)
                break;
            default:
                break;
        }
        return art
    }

}

module.exports = {
    Art
}