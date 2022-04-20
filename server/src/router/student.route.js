const Router = require('@koa/router')

const { createStu, deleteStu, updateStu } = require('../controller/student.controller')
const { studentValidator, studentVertifier, deleteValidator } = require('../middleware/student.middleware')

const router = new Router({prefix: '/student'})

router.post('/create', studentValidator, studentVertifier, createStu)

router.post('/delete', deleteValidator, deleteStu)

router.post('/update', updateStu)
module.exports = router