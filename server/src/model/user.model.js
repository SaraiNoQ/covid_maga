const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// create Model (Model zd_user -> zd_users)
const User = seq.define('zd_user', {
	user_name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		comment: 'nickname, unique'
	},
	password: {
		type: DataTypes.CHAR(64),
		allowNull: false,
		comment: 'password'
	},
	is_admin: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: 0,
		comment: 'is admin ? 1 : 0'
	},
	nick_name: {
		type: DataTypes.STRING,
		allowNull: false,
		comment: 'nick_name of user'
	}
})

// 强制同步数据库（创建数据表）
// User.sync({
// 	force: true
// })

module.exports = User