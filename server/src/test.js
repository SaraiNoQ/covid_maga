// const where = {}

// Object.assign(where, { name: 'aaa' })
// Object.assign(where, { id: 22 })

// console.log(where)
const dayjs = require('dayjs')
const createAt = dayjs(new Date()).format('YYYY-MM-DD')
console.log(createAt)