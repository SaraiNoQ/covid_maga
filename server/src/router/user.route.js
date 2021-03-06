const Router = require('@koa/router')

const {
    vertifyCaptcha,
    userValidator,
    vertifyLogin,
    userVertifier,
    cryptPassword,
    authToken,
    userNameValidate,
    infoValidate,
    newAccountValidate
} = require('../middleware/user.middleware')
const { login,
    register,
    passwd,
    verify,
    getCaptcha,
    uploadImage,
    saveToDB,
    uploadInfo,
    getInformation,
    changeAccount,
    getNewCaptcha,
    getAccount,
    removeDuplicate,
    registStu,
    delAccount,
    normallyLogin
} = require('../controller/user.controller')

const router = new Router()

router.post('/register', vertifyCaptcha, userValidator, userVertifier, cryptPassword, register)

router.post('/student/register', userValidator, userVertifier, cryptPassword, registStu)

router.post('/student/passwd', cryptPassword, passwd)

router.post('/captcha', userValidator, userVertifier, getCaptcha)

router.post('/login', userValidator, vertifyLogin, login)

router.post('/normal/login', userValidator, vertifyLogin, normallyLogin)

router.post('/passwd', userValidator, vertifyLogin, cryptPassword, passwd)

router.post('/token', authToken, verify)


router.post('/image', userNameValidate, uploadImage, removeDuplicate, saveToDB)

router.patch('/information', userNameValidate, infoValidate, uploadInfo)

router.get('/information', getInformation)

router.patch('/passwd', authToken, userNameValidate, cryptPassword, passwd)

router.patch('/account', authToken, userNameValidate, newAccountValidate, vertifyCaptcha, changeAccount)

router.get('/account', getAccount)

router.post('/new/captcha', newAccountValidate, getNewCaptcha)

router.post('/account/delete', userNameValidate, delAccount)

module.exports = router