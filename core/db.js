/* eslint-disable no-undef */
const { Sequelize, Model } = require('sequelize')
const { unset, clone, isArray } = require('lodash')

const {
    dbName,
    host,
    port,
    user,
    password
} = require('../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging: true, // 是否打印sql语句
    timezone: '+08:00',
    define: {
        charset: 'utf8',
        timestamps: true, // 是否自动添加 createdAt 、 updatedAt 字段
        paranoid: true, // 软删除， 是否添加 deletedAt 字段        
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true, // 将默认的驼峰命名修改为下划线
        freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
        scopes: {
            bh: {
                attributes: {
                    exclude: ['updated_at', 'deleted_at', 'created_at']
                }
            }
        }
    }
})

sequelize.sync({
    force: false // true 将删除表重新建立
})

// 在 Model原型上定义toJSON 全局过滤字段
Model.prototype.toJSON = function () {
    let data = clone(this.dataValues)
    unset(data, 'updated_at')
    unset(data, 'created_at')
    unset(data, 'deleted_at')

    // 替换静态文件相对路径为绝对路径
    for (key in data) {
        if (key === 'image') {
            if (!data[key].startsWith('http'))
                data[key] = global.config.host + data[key]
        }
    }

    // 给应用开发者指定排除字段
    if (isArray(this.exclude)) {
        this.exclude.forEach(
            (value) => {
                unset(data, value)
            }
        )
    }
    return data
}

module.exports = {
    sequelize
}