module.exports = (err, ctx) => {
	let status = 500
	switch (err.code) {
	case '10001':
		status = 400
		break
	case '10002':
		status = 409
		break
	case '10003':
		status = 501
		break
	case '10004':
		status = 408
		break
	default:
		status = 500
	}
	ctx.status = status
	ctx.body = err
}