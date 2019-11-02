const requireDirectory = require('require-directory')
const Router = require('koa-router')

// 初始化管理器
class InitManager {
    static initCore(app) {
        // 入口
        InitManager.app = app
        InitManager.initLoadRouters()
        InitManager.loadHttpException()
        InitManager.loadConfig()
    }
    static loadConfig(path = '') {
        // 全局配置
        const configPath = path || process.cwd() + '/config/config.js'
        const config = require(configPath)
        global.config = config
    }

    static initLoadRouters() {
        // requireDirectory路由自动加载
        const apiDirectory = `${process.cwd()}/app/api`
        requireDirectory(module, apiDirectory, {
            visit: whenLoadModule
        })

        function whenLoadModule(object) {
            if (object instanceof Router) {
                InitManager.app.use(object.routes())
            }
        }

    }

    static loadHttpException() {
        // 全局异常处理
        const errors = require('./http-exception')
        global.errs = errors
    }
}

module.exports = InitManager