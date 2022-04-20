const { createJourney, getJourney } = require('../service/journey.service')

const { createJourneyError, noQueryStudent } = require('../constants/err.type')

class JourneyController {
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

    async getJourney(ctx) {
        console.log('getJourney')
        const { student_id } = ctx.request.query
        console.log('get', student_id)
        try {
            const res = await getJourney({ student_id })
            if (res) {
                console.log(res)
                ctx.body = {
                    code: 0,
                    message: 'get journey success!',
                    data: res
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
}

module.exports = new JourneyController()