const Router = require('@koa/router')

const { vertifyCaptcha, userValidator, vertifyLogin, userVertifier, cryptPassword, authToken, userNameValidate, infoValidate } = require('../middleware/user.middleware')
const { login, register, passwd, verify, getCaptcha, uploadImage, saveToDB, uploadInfo } = require('../controller/user.controller')

const router = new Router()

router.post('/register', vertifyCaptcha, userValidator, userVertifier, cryptPassword, register)

router.post('/captcha', userValidator, userVertifier, getCaptcha)

router.post('/login', userValidator, vertifyLogin, login)

router.post('/passwd', userValidator, vertifyLogin, cryptPassword, passwd)

router.post('/token', authToken, verify)


router.post('/image', userNameValidate, uploadImage, saveToDB)

router.patch('/information', userNameValidate, infoValidate, uploadInfo)

module.exports = router