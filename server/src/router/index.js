const fs = require('fs')

const Router = require('@koa/router')
const router = new Router()

fs.readdirSync(__dirname).forEach(e => {
	if (e !== 'index.js') {
		let i = require('./' + e)
		router.use(i.routes())
	}
})

module.exports = router