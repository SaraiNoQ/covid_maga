const { createStudent } = require('../service/student.service')

const { createStudentError } = require('../constants/err.type')

class StudentController {
	async create(ctx) {
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
}

module.exports = new StudentController()