

const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')
const { Art } = require('./art')

// 点赞业务表
class Favor extends Model {
    // 点赞业务逻辑处理
    static async like(art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {
                art_id, type, uid
            }
        })
        if (favor) {
            throw new global.errs.LikeError()
        }
        // sequelize事务处理
        return sequelize.transaction(async t => {
            await Favor.create({
                art_id, type, uid
            }, { transation: t })
            const art = await Art.getData(art_id, type, false)
            await art.increment('fav_nums', { by: 1, transaction: t })
            // increment + 
        })
    }

    // 取消点赞业务逻辑处理
    static async disLike(art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {
                art_id, type, uid
            }
        })
        if (!favor) {
            throw new global.errs.DislikeError()
        }
        // sequelize事务处理, sequelize的坑： 注意删除事务用法与 create 异同
        return sequelize.transaction(async t => {
            await favor.destroy({ // 使用查询出来的记录对象进行删除操作 
                force: false,  // force:true = 物理删除， false标记删除
                transation: t
            })
            const art = await Art.getData(art_id, type, false)
            await art.decrement('fav_nums', { by: 1, transaction: t })
            // decrement - 
        })
    }

    // 是否点赞过
    static async userLikeIt(art_id, type, uid) {
        const favor = await Favor.findOne({
            art_id, type, uid
        })
        return favor ? true : false
    }
}

Favor.init({
    uid: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
}, {
    sequelize,
    tableName: 'favor'
})

module.exports = {
    Favor
}
