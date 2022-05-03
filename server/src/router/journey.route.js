const Router = require('@koa/router')

const { journeyValidator, journeyVertified, idValidate } = require('../middleware/journey.middleware')
const { createJourney, getJourney, changeAuth } = require('../controller/journey.controller')

const router = new Router({
    prefix: '/journey'
})

router.post('/create', journeyValidator, journeyVertified, createJourney)

// router.get('/info', getJourney)

router.post('/info', getJourney)

router.patch('/authority', idValidate, changeAuth)

module.exports = router