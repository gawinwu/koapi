const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')
const axios = require('axios')
const util = require('util')

const { Favor } = require('./favor')

class Book extends Model {
    
    async detail(id) {
        const url = util.format(global.config.yushu.detailUrl, id)
        const detail = await axios.get(url)
        return detail.data
    }

    static async getMyFavorBookCount(uid) {
        const count = await Favor.count({
            where: {
                type: 400,
                uid
            }
        })
        return count
    }

    // summary 是否获取简要信息
    static async searchFromYuShu(q, start, count, summary = 1) {
        const url = util.format(
            global.config.yushu.keywordUrl, encodeURI(q), count, start, summary)
        const result = await axios.get(url)
        return result.data
    }
}

Book.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    fav_nums: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    tableName: 'book'
})

module.exports = { Book }