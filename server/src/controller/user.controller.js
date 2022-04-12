// 获取请求，调用service操作model层方法
const { createUser, getUser, updateById } = require('../service/user.service')
const { userRegisterError, userNotExited } = require('../constants/err.type')
const jwt = require('jsonwebtoken')
// eslint-disable-next-line no-undef
const { JWT_SECRET } = require('../config/config.default')
const redisHelper = require('../app/redis')
const nodemailer = require('../app/nodemailer')

class UserController {
	async getCaptcha(ctx) {
		const { user_name } = ctx.request.body
		console.log('captcha', user_name)
		const code = parseInt(Math.random(0, 1) * 1000000) // 生成随机验证码
		const result = await redisHelper.setString(user_name, code, 60 * 5)
		if (result === 'OK') {
			const result1 = await redisHelper.getString(user_name)
			console.log('send email success!', result1)
			nodemailer(ctx.request.body, code)
			ctx.body = {
				'status': 0,
				'message': 'captcha successly send!'
			}
		} else {
			console.error('send captcha error!')
			ctx.app.emit('error', userRegisterError, ctx)
		}
	}
	
	async register(ctx) {
		// 1. get request
		const { user_name, password, nick_name, captcha } = ctx.request.body
		console.log('user_name', user_name)
		const result = await redisHelper.getString(user_name)
		console.log('send: ', captcha, 'true captcha is: ', result, result !== captcha)
		if (result !== captcha) {
			console.error('captcha error!')
			ctx.app.emit('error', userRegisterError, ctx)
			return
		}
		try {
			// 2. crud database
			const res = await createUser(user_name, password, nick_name)
			// 3. send email
			if (res) {
				// 4. return response
				ctx.body = {
					'status': 0,
					'message': 'Create User Success!',
					'result': {
						'id': res.id,
						'user_name': res.user_name
					}
				}
			}
		} catch (error) {
			console.error('注册用户信息错误', error)
			ctx.app.emit('error', userRegisterError, ctx)
		}
	}
	
	async login (ctx) {
		const {user_name} = ctx.request.body

		// 获取用户信息（在token的payload中，记录id，user_name，is_admin）
		try {
			// 获取到除了password之外的属性
			const {password, ...res} = await getUser({user_name})

			ctx.body = {
				code: 0,
				message: 'login success!',
				result: {
					token: jwt.sign(res, JWT_SECRET, { expiresIn: '2h' })
				}
			}
		} catch (error) {
			console.error('login error!', error)
		}
	}

	async passwd(ctx) {
		const { user_name, new_password } = ctx.request.body
		try {
			const res = await getUser({user_name})
			if (!res) {
				ctx.app.emit('error', userNotExited, ctx)
				return
			}

			const password = new_password
			const id = res.id
			const changeObj = { id, password }
			await updateById(changeObj)
			ctx.body = {
				code: 0,
				message: 'change password success!',
				result: {
					res
				}
			}
		} catch (error) {
			console.error('change password error!', error)
		}
	}

	async verify(ctx) {
		const { user_name } = ctx.state.user
		try {
			await getUser({ user_name })
			console.log('verified')
			ctx.body = {
				code: 0,
				message: 'verified!'
			}
		} catch (error) {
			console.error('verify user error')
		}
	}
}

module.exports = new UserController()