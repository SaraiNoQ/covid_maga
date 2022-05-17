const { createJourney, getJourney, updateById } = require('../service/journey.service')

const { createJourneyError, noQueryStudent, updateJourneyError } = require('../constants/err.type')

class JourneyController {
    // 创建行程
    async createJourney(ctx) {
        console.log('createJourney')
        const {
            student_id,
            journey_category,
            live_zone,
            healthy_status,
            journey_destination,
            journey_reason,
            journey_start_time,
            journey_end_time,
            journey_info
        } = ctx.request.body
        console.log({
            student_id,
            journey_category,
            live_zone,
            healthy_status,
            journey_destination,
            journey_reason,
            journey_start_time,
            journey_end_time,
            journey_info
        })
        try {
            const res = await createJourney(student_id,journey_category,live_zone,healthy_status,journey_destination,journey_reason,journey_start_time,journey_end_time,journey_info)
            if (res) {
                ctx.body = {
                    code: 0,
                    message: 'create journey success!'
                }
            }
        } catch (error) {
            console.error(error)
            // 外键约束错误
            ctx.app.emit('error', createJourneyError, ctx)
        }

    }

    // 获取行程
    async getJourney(ctx) {
        // student_id 为一个数组
        const { student_id } = ctx.request.body
        // console.log('get', student_id)
        const response = []
        try {
            for (let i = 0; i < student_id.length; i++) {
                const res = await getJourney({ student_id: student_id[i] })
                response.push(res)
            }
            // console.log('getJourney', res)
            if (response) {
                ctx.body = {
                    code: 0,
                    message: 'get journey success!',
                    data: response
                }
            } else {
                console.error('error')
                ctx.app.emit('error', noQueryStudent, ctx)
            }
        } catch (error) {
            console.error(error)
            ctx.app.emit('error', createJourneyError, ctx)
        }
    }

    // 管理员批改
    async changeAuth(ctx) {
        const { journey_id, record_status } = ctx.request.body
        try {
            const res = await updateById({ journey_id, record_status })
            if (res) {
                ctx.body = {
                    code: 0,
                    result: res
                }
            }
        } catch (error) {
            console.error(error)
            ctx.app.emit('error', updateJourneyError, ctx)
        }
    }
}

module.exports = new JourneyController()