// 操作数据库model
const Journey = require('../model/journey.model')
const { v4: uuidv4 } = require('uuid')
const dayjs = require('dayjs')

class JourneyService {
    async createJourney(student_id,journey_category, live_zone, healthy_status, journey_destination, journey_reason, journey_start_time,journey_end_time,journey_info) {
        const journey_id = uuidv4().replace(/-/g, '')
        // console.log('uuidv4', journey_id)
        const createAt = dayjs(new Date()).format('YYYY-MM-DD')
        const res = await Journey.create({
            student_id,
            journey_id,
            journey_category,
            live_zone,
            healthy_status,
            journey_destination,
            journey_reason,
            journey_start_time,
            journey_end_time,
            journey_info,
            createAt
        })

        return res
    }

    async getJourney({ student_id, journey_id, id, createAt }) { 
        const whereOpt = {}
        student_id && Object.assign(whereOpt, { student_id })
        journey_id && Object.assign(whereOpt, { journey_id })
        id && Object.assign(whereOpt, { id })
        createAt && Object.assign(whereOpt, { createAt })
        // console.log('student_id', whereOpt)

        try {
            const res = await Journey.findOne({
                attributes: [
                    'journey_id',
                    'student_id',
                    'journey_category',
                    'live_zone',
                    'record_status',
                    'healthy_status',
                    'journey_destination',
                    'journey_reason',
                    'journey_start_time',
                    'journey_end_time',
                    'journey_info',
                    'createdAt'
                ],
                where: whereOpt,
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            return res ? res.dataValues : null
        } catch (error) {
            console.log('query error')
            // return error
        }
    }

    async updateJourney({ student_id, journey_category, journey_destination, journey_info, journey_reason, live_zone, healthy_status, journey_start_time, journey_end_time }) {
        const updateOpt = {}
        student_id && Object.assign(updateOpt, { student_id })
        journey_category && Object.assign(updateOpt, { journey_category })
        journey_destination && Object.assign(updateOpt, { journey_destination })
        journey_info && Object.assign(updateOpt, { journey_info })
        journey_reason && Object.assign(updateOpt, { journey_reason })
        live_zone && Object.assign(updateOpt, { live_zone })
        healthy_status && Object.assign(updateOpt, { healthy_status })
        journey_start_time && Object.assign(updateOpt, { journey_start_time })
        journey_end_time && Object.assign(updateOpt, { journey_end_time })
        const createAt = dayjs(new Date()).format('YYYY-MM-DD')

        try {
            const res = Journey.update({
                journey_category,
                journey_destination,
                journey_info,
                journey_reason,
                live_zone,
                healthy_status,
                journey_start_time,
                journey_end_time,
                createAt,
                record_status: 0
            }, {
                where: { student_id }
            })
            return res
        } catch (error) {
            console.error(error)
            // return error
        }
    }

    async updateById({ journey_id, record_status }) {
        try {
            const res = await Journey.update({ record_status }, {
                where: { journey_id }
            })
            return res
        } catch (error) {
            console.error(error)
        }
    }
}


module.exports = new JourneyService()