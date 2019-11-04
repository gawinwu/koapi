

const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

// 点赞业务表
class Favor extends Model {
    // 点赞业务逻辑处理
    static async like(art_id, type, uid) {

    }

    // 取消点赞业务逻辑处理
    static async dislike(art_id, type, uid) {

    }
}

Favor.init({
    uid: Squelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
})