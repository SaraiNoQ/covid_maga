const { createStudent, deleteStudent } = require('../service/student.service')

const { createStudentError, deleteStudentError, deleteStudentNull } = require('../constants/err.type')

class StudentController {
	async createStu(ctx) {
		console.log('create Stu')
        const { student_name, student_number, student_gender, student_major } = ctx.request.body
        const { student_image } = ctx.request.files
        console.log({ student_image })
        try {
            const res = await createStudent(student_name, student_number, student_gender, student_major, student_image)
            if (res) {
                ctx.body = {
                    code: 0,
                    message: 'create student success!'
                }
            }
        } catch (error) {
            console.error('create student error!')
            ctx.app.emit('error', createStudentError, ctx)
        }
    }
    
    async deleteStu(ctx) {
        console.log('Del Stu')
        const { student_number } = ctx.request.body
        try {
            const res = await deleteStudent({ student_number })
            if (res !== 0) {
                ctx.body = {
                    code: 0,
                    message: 'delete student success!'
                }
            } else {
                ctx.app.emit('error', deleteStudentNull, ctx)
            }
        } catch (error) {
            console.error('delete student error!')
            ctx.app.emit('error', deleteStudentError, ctx)
        }
    }

    async updateStu(ctx) {}
}

module.exports = new StudentController()