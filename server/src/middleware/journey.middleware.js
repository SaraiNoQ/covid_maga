const { getJourney, updateJourney } = require('../service/journey.service')
const { journeyFormatError } = require('../constants/err.type')

const dayjs = require('dayjs')


const journeyValidator = async (ctx, next) => {
    const {
        student_id,
        journey_category,
        live_zone,
        healthy_status,
        journey_destination,
        journey_reason,
        journey_start_time,
        journey_end_time
    } = ctx.request.body
    if (student_id && journey_category && live_zone && healthy_status && journey_destination && journey_reason && journey_start_time && journey_end_time) {
        return await next()
    }
    console.error('journey info format error')
    ctx.app.emit('error', journeyFormatError, ctx)
}

// 当用户已经打过卡后，再次修改采用覆盖的方式
const journeyVertified = async (ctx, next) => {
    const { student_id, journey_category, journey_destination, journey_info, journey_reason, live_zone, healthy_status, journey_start_time, journey_end_time } = ctx.request.body
    const res = await getJourney({ student_id })
    // console.log('vertify', res)
    try {
        if (res) {
            if (dayjs(res.createAt).format('YYYY-MM-DD') === dayjs(new Date()).format('YYYY-MM-DD')) {
                const res = await updateJourney({ student_id, journey_category, journey_destination, journey_info, journey_reason, live_zone, healthy_status, journey_start_time, journey_end_time })
                if (res) {
                    ctx.body = {
                        code: 0,
                        message: 'update journey success!'
                    }
                }
                return res
            }
        }
    } catch (error) {
        return await next()
    }
    await next()
}

module.exports = {
    journeyValidator,
    journeyVertified
}