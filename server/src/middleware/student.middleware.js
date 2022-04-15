const { getStudent } = require('../service/student.service')

const { studentAlreadyExited,
    studentFormatError,
    studentRegisterError
} = require('../constants/err.type')


const studentValidator = async (ctx, next) => {
    const { student_name, student_number, student_gender, student_major } = ctx.request.body
    console.log('validator', student_name && student_number && student_gender && student_major)
    if (student_name && student_number && student_gender && student_major) {
        return await next()
    }
    console.error('student info format error')
    ctx.app.emit('error', studentFormatError, ctx)
}

const studentVertifier = async (ctx, next) => {
    const { student_number } = ctx.request.body
    const res = await getStudent({ student_number })
    try {
        if (res) {
            console.error('register student is already exited!')
			ctx.app.emit('error', studentAlreadyExited, ctx)
			return
        }
    } catch (error) {
        console.error('retrieve student info failed!')
		ctx.app.emit('error', studentRegisterError, ctx)
		// return await next()
    }
    await next()
}

module.exports = {
    studentValidator,
    studentVertifier
}