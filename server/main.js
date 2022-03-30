const app = require('./src/app/index')
const { APP_PORT } = require('./src/config/config.default')

app.listen(APP_PORT, () => {
	console.log(`server is running on http://localhost:${APP_PORT}`)
})