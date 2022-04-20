const { DataTypes } = require('sequelize')

const { Journey } = require('../model/journey.model')
const seq = require('../db/seq')

// create Model (Model zd_student -> zd_students)
const Student = seq.define('zd_student', {
	student_number: {
		type: DataTypes.CHAR(32),
		allowNull: false,
		unique: true,
		comment: 'student_number'
	},
	student_name: {
		type: DataTypes.STRING,
		allowNull: false,
		comment: 'student_name'
	},
	student_gender: {
		type: DataTypes.STRING,
		allowNull: false,
		comment: 'student_gender, string'
	},
	student_major: {
		type: DataTypes.STRING,
		allowNull: false,
		comment: 'student_major, string'
	},
	student_image: {
		type: DataTypes.BLOB('medium'),
		allowNull: true,
		comment: 'student_image, blob'
	}
})

// Student.sync({
// 	force: true
// })

module.exports = Student