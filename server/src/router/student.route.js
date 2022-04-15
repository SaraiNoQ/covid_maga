const Router = require('@koa/router')

const { create } = require('../controller/student.controller')
const { studentValidator, studentVertifier } = require('../middleware/student.middleware')

const router = new Router({prefix: '/student'})

router.post('/create', studentValidator, studentVertifier, create)

module.exports = router