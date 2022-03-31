const bcrypt = require('bcryptjs')

const { getUser, updateById } = require('../service/user.service')
const { userAlreadyExited,
	userFormatError,
	userRegisterError,
	userNotExited,
	userLoginError,
	invalidPassword,
	updatePswError 
} = require('../constants/err.type') 

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

	// 如果数据合法，正常进入下一个middleware
	await next()
}

// 验证注册用户是否已经存在
const userVertifier = async (ctx, next) => {
	const {user_name} = ctx.request.body
	// 数据合理
	const res = await getUser({user_name})
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

	// 如果遇到错误就要return，防止进入下一个中间件
	await next()
}

const vertifyLogin = async (ctx, next) => {
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
		return
	}

	await next()
}

// 加密密码
const cryptPassword = async (ctx, next) => {
	const { new_password } = ctx.request.body
	//生成密钥
	const salt = bcrypt.genSaltSync(10)
	// 生成密文
	const hash = bcrypt.hashSync(new_password, salt)
	ctx.request.body.new_password = hash

	await next()
}

module.exports = {
	userValidator,
	vertifyLogin,
	userVertifier,
	cryptPassword
}