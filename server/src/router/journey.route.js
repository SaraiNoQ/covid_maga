const Router = require('@koa/router')

const { journeyValidator, journeyVertified } = require('../middleware/journey.middleware')
const { createJourney, getJourney } = require('../controller/journey.controller')

const router = new Router({
    prefix: '/journey'
})

router.post('/create', journeyValidator, journeyVertified, createJourney)

router.get('/info', getJourney)

module.exports = router