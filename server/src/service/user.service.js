// 操作数据库model
const User = require('../model/user.model')

class UserService {
	// create in database
	async createUser(user_name, password, nick_name) {
		// 对象解构
		const res = await User.create({
			user_name,
			password,
			nick_name
		})
		
		return res.dataValues
	}

	// retrieve in database
	async getUserInfo({id, user_name, password, is_admin, nick_name}) {
		const whereOpt = {}

		id && Object.assign(whereOpt, {id})
		user_name && Object.assign(whereOpt, {user_name})
		password && Object.assign(whereOpt, {password})
		is_admin && Object.assign(whereOpt, { is_admin })
		nick_name && Object.assign(whereOpt, {nick_name})

		// 如果找到目标属性的目标值，返回一个promise对象的值（第一个元素）
		const res = await User.findOne({
			attributes: ['id', 'user_name', 'password', 'is_admin'],
			where: whereOpt
		})
		return res ? res.dataValues : null
	}

	// retrieve in database
	async getUser({user_name}) {
		const res = await User.findOne({
			attributes: ['user_name', 'password', 'is_admin', 'id', 'nick_name'],
			where: {user_name}
		})
		console.log('res', res ? res.dataValues : null)
		return res ? res.dataValues : null
	}

	// update in database
	async updateById({ id, password, user_name, is_admin, nick_name }) {
		const change = {}
		const whereOpt = {id}

		// 增加update复用性
		password && Object.assign(change, { password })
		user_name && Object.assign(change, { user_name })
		is_admin && Object.assign(change, { is_admin })
		nick_name && Object.assign(change, { nick_name })
		
		const res = await User.update(change, {where: whereOpt})
		return res
	}

	async updateImage({ user_image }) {
		
	}
}

module.exports = new UserService()