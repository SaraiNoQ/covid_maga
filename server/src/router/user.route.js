const Router = require('@koa/router')

const { userValidator, vertifyLogin, userVertifier, cryptPassword } = require('../middleware/user.middleware')
const { login, register } = require('../controller/user.controller')

const router = new Router()

router.post('/register', userValidator, userVertifier, cryptPassword, register)

router.post('/login', userValidator, vertifyLogin, login)

module.exports = router