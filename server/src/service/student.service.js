// 操作数据库model
const Student = require('../model/student.model')

class StudentService {
    // create student
    async createStudent(student_name, student_number, student_gender, student_major, student_image) {
		const res = await Student.create({
			student_name,
			student_number,
			student_gender,
            student_major,
            student_image
		})
        
		return res.dataValues
    }

    // retrive student
    async getStudent({ student_number, student_name, student_gender, student_major }) {
        // console.log('retrieve',  { student_number })
        const whereOpt = {}
        student_number && Object.assign(whereOpt, { student_number })
        student_name && Object.assign(whereOpt, { student_name })
        student_major && Object.assign(whereOpt, { student_major })
        student_gender && Object.assign(whereOpt, { student_gender })

        const res = await Student.findOne({
            attributes: ['student_name', 'student_number', 'student_gender', 'student_major', 'student_image'],
            where: whereOpt
        })
        console.log('get Stu', whereOpt)
        return res ? res.dataValues : null
    }

    // update student info
    async updateStudent({ student_number, student_name, student_gender, student_major, student_image }) {
        const updateInfo = {}
        student_gender && Object.assign(updateInfo, { student_gender })
        student_major && Object.assign(updateInfo, { student_major })
        student_name && Object.assign(updateInfo, { student_name })
        student_image && Object.assign(updateInfo, { student_image })

        const res = await Student.update(updateInfo, {
            where: { student_number }
        })
        console.log('update', res)
        return res
    }

    // delete student
    async deleteStudent({ student_number }) {
        const res = await Student.destroy({
            where: { student_number }
        })
        console.log('destroy', res)
        return res
    }

    async retrieveStudent() {
        const res = await Student.findAll({
            attributes: ['student_name', 'student_number']
        })
        console.log('retrieve', res)
        return res
    }

    async getStudentAll() {
        const res = await Student.findAll({
            attributes: ['student_number', 'student_name', 'student_gender', 'student_major', 'student_image']
        })

        return res
    }
}

module.exports = new StudentService()