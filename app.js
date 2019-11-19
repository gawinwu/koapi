require('module-alias/register')

const Koa = require('koa')
const parser = require('koa-bodyparser')
const path = require('path')
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')
const staticFiles = require('koa-static')

// require('./app/models/user')

const app = new Koa()

app.use(catchError)
app.use(parser())
app.use(staticFiles(path.join(__dirname, '/static')))


InitManager.initCore(app)

app.listen(3000)
