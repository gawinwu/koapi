
const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

// 主题表, 关联具体的内容表
class Flow extends Model {

}
Flow.init({
    index: Sequelize.INTEGER, //期号
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
}, {
    sequelize,
    tableName: 'flow'
})

module.exports = {
    Flow
}