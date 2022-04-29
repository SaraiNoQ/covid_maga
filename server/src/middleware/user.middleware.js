const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config/config.default')
const { getUser, updateById } = require('../service/user.service')
const { userAlreadyExited,
	userFormatError,
	userRegisterError,
	userNotExited,
	userLoginError,
	invalidPassword,
	invalidToken
} = require('../constants/err.type')
const redisHelper = require('../app/redis')
const { emit } = require('process')

// 验证注册信息是否合法
const userValidator = async (ctx, next) => {
	console.log('enter validate!', ctx.request)
	// get request data
	const { user_name, password } = ctx.request.body
		
	// 判断数据合法
	if (!user_name || !password) {
		// emit error info, use app.on method to accept it.
		console.error('register info is illegal!')
		ctx.app.emit('error', userFormatError, ctx)
		return
	}
	console.log('enter NEXT!')

	// 如果数据合法，正常进入下一个middleware
	await next()
}

// 验证user_name不为空
const userNameValidate = async (ctx, next) => {
	const { user_name } = ctx.request.body
	if (!user_name) {
		console.error('user_name is null!')
		ctx.app.emit('error', userFormatError, ctx)
		return
	}
	await next()
}

// 验证注册用户是否已经存在
const userVertifier = async (ctx, next) => {
	const {user_name} = ctx.request.body
	// 数据合理
	const res = await getUser({ user_name })
	console.log('GET USER:')
	try {
		if (res) {
			console.error('register info is already exited!')
			ctx.app.emit('error', userAlreadyExited, ctx)
			return
		}
	} catch (error) {
		console.error('retrieve user info failed!')
		ctx.app.emit('error', userRegisterError, ctx)
		return
	}
	console.log('enter REGISTER!')
	// 如果遇到错误就要return，防止进入下一个中间件
	await next()
}

const vertifyLogin = async (ctx, next) => {
	console.log('enter get!')
	const { user_name, password } = ctx.request.body
	// 1. user exited?
	const res = await getUser({ user_name })

	try {
		if (!res) {
			console.error(`user:${user_name} is not exist!`)
			ctx.app.emit('error', userNotExited, ctx)
			return
		}
	} catch (error) {
		console.error('retrieve user info failed!')
		ctx.app.emit('error', userLoginError, ctx)
		return
	}
	// 2. password is right?
	if (!bcrypt.compareSync(password, res.password)) {
		ctx.app.emit('error', invalidPassword, ctx)
		ctx.body = {
			result: invalidPassword
		}
		return
	}

	await next()
}

// 加密密码
const cryptPassword = async (ctx, next) => {
	console.log('enter Res!')
	const { new_password } = ctx.request.body
	if (!new_password) {
		const { password } = ctx.request.body
		//生成密钥
		const salt = bcrypt.genSaltSync(10)
		// 生成密文
		const hash = bcrypt.hashSync(password, salt)
		ctx.request.body.password = hash
		return await next()
	}
	console.log('enter new-pass!', new_password)
	//生成密钥
	const salt = bcrypt.genSaltSync(10)
	// 生成密文
	const hash = bcrypt.hashSync(new_password, salt)
	ctx.request.body.new_password = hash
	await next()
}

const authToken = async (ctx, next) => {
	const { token } = ctx.request.body
	try {
		const user = jwt.verify(token, JWT_SECRET)
		ctx.state.user = user
	} catch (error) {
		ctx.app.emit('error', invalidToken, ctx)
		ctx.body = {
			result: 'Please Login!'
		}
		return
	}

	await next()
}

const vertifyCaptcha = async (ctx, next) => {
	const { captcha } = ctx.request.body
	if (!captcha) {
		console.error('captcha is illegal!')
		ctx.app.emit('error', userFormatError, ctx)
		return
	}
	await next()
}

// 验证用户详细信息
const infoValidate = async (ctx, next) => {
	const { nick_name, user_info } = ctx.request.body
	if (nick_name || user_info) {
		await next()
	} else {
		console.error('nick_name and user_info are all null!')
		ctx.app.emit('error', userFormatError, ctx)
	}
}

module.exports = {
	userValidator,
	vertifyLogin,
	userVertifier,
	cryptPassword,
	authToken,
	vertifyCaptcha,
	userNameValidate,
	infoValidate
}