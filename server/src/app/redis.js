const redis = require('redis')
const config = {
	url: '82.157.232.71',
	port: 6379,
	password: 'y0%ez8dnw#UgktByDdL3ctIgSnYZL4g4OedjdZ_Kv7hlWk%l7C2gehREMqBzxUDJ'
}

const client = redis.createClient(config.port, config.url) // 实例redis对象

//连接错误处理
client.on('error', err => {
	console.log('redis connect err', err)
})

client.on('connect', () => {
	console.log('redis connect success')
})

//验证redis
client.auth(config.password)

const redisHelper = {}

/**
 * redisHelper setString function
 * @param key
 * @param value
 * @param expire
 */
redisHelper.setString = (key, value, expire) => {
	return new Promise((resolve, reject) => {
		client.set(key, value, function (err, result) {
			if (err) {
				console.log(err)
				reject(err)
			}

			if (!isNaN(expire) && expire > 0) {
				client.expire(key, parseInt(expire))
			}
			resolve(result)
		})
	})
}

/**
 * redisHelper getString function
 * @param key
 */
redisHelper.getString = (key) => {
	return new Promise((resolve, reject) => {
		client.get(key, function (err, result) {
			if (err) {
				console.log('get redis err: ',err)
				reject(err)
			}
			console.log('get redis result: ', result)
			resolve(result)
		})
	})
}

module.exports = redisHelper