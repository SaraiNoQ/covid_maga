const { DataTypes } = require('sequelize')

const seq = require('../db/seq')
const Student = require('../model/student.model')

const Journey = seq.define('zd_journey', {
    journey_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        comment: 'main key'
    },
	journey_category: {
		type: DataTypes.CHAR(16),
		allowNull: false,
		comment: 'journey_category, student / teacher'
	},
	live_zone: {
		type: DataTypes.CHAR(16),
		allowNull: false,
		comment: 'live_zone, konggang / longquan / else'
	},
	healthy_status: {
		type: DataTypes.CHAR(16),
		allowNull: false,
		comment: 'healthy_status, green / yellow / red'
	},
	journey_destination: {
		type: DataTypes.STRING,
		allowNull: false,
		comment: 'journey_destination, string'
	},
	journey_reason: {
		type: DataTypes.STRING,
		allowNull: false,
		comment: 'journey_reason, string'
    },
    journey_start_time: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'journey_start_time, date'
	},
	journey_end_time: {
		type: DataTypes.DATE,
		allowNull: false,
		comment: 'journey_end_time, date'
	},
    journey_info: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'journey_info, string'
	},
	createAt: {
		type: DataTypes.DATE,
		allowNull: false,
		comment: 'create time YY-MM-DD 00:00:00'
	},
	record_status: {
		type: DataTypes.CHAR(8),
		allowNull: false,
		comment: 'record_status, 0: created / 1: completed / 2: denied',
		defaultValue: '0'
	}
})

Journey.belongsTo(Student, {
	foreignKey: 'student_id',
	targetKey: 'student_number'
})
Student.hasMany(Journey, {
	foreignKey: 'student_id',
	sourceKey: 'student_number'
})

// Journey.sync({
// 	force: true
// })

module.exports = Journey