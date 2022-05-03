const Router = require('@koa/router')

const { createStu, deleteStu, updateStu, getStu } = require('../controller/student.controller')
const { studentValidator, studentVertifier, deleteValidator } = require('../middleware/student.middleware')

const router = new Router({prefix: '/student'})

router.post('/create', studentValidator, studentVertifier, createStu)

router.post('/delete', deleteValidator, deleteStu)

router.post('/update', updateStu)

router.get('/numbers', getStu)

module.exports = router