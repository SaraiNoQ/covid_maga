const Router = require('@koa/router')

const { vertifyCaptcha, userValidator, vertifyLogin, userVertifier, cryptPassword, authToken } = require('../middleware/user.middleware')
const { login, register, passwd, verify, getCaptcha } = require('../controller/user.controller')

const router = new Router()

router.post('/register', vertifyCaptcha, userValidator, userVertifier, cryptPassword, register)

router.post('/captcha', userValidator, userVertifier, getCaptcha)

router.post('/login', userValidator, vertifyLogin, login)

router.post('/passwd', userValidator, vertifyLogin, cryptPassword, passwd)

router.post('/token', authToken, verify)

module.exports = router