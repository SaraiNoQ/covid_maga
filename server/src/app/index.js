const path = require('path')

const koa = require('koa')
const body = require('koa-body')
const parameter = require('koa-parameter')
const static = require('koa-static')

const userRouter = require('../router')
const errHandler = require('./errHandler')

const app = new koa()

app
	.use(body({
		multipart: true,
		formidable: {
			uploadDir: path.join(__dirname, '../uploads'),
			keepExtensions: true
		}
	}))
	.use(static(path.join(__dirname, '../../../dist')))
	.use(parameter(app))
	.use(userRouter.routes())
	// 没有写的请求类型返回405错误
	.use(userRouter.allowedMethods())
    
app.on('error', errHandler)

module.exports = app