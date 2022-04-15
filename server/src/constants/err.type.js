// constant error info
module.exports = {
	userFormatError: {
		code: '10001',
		message: 'account or password is null!',
		result: ''
	},
	userAlreadyExited: {
		code: '10002',
		message: 'account duplicate (has exited) !',
		result: ''
	},
	userRegisterError: {
		code: '10003',
		message: 'register error!',
		result: ''
	},
	userNotExited: {
		code: '10004',
		message: 'account is not exsit!',
		result: ''
	},
	userLoginError: {
		code: '10005',
		message: 'login error!',
		result: ''
	},
	invalidPassword: {
		code: '10006',
		message: 'password is wrong!',
		result: ''
	},
	updatePswError: {
		code: '10007',
		message: 'update password error!',
		result: ''
	},
	TokenExpiredError: {
		code: '10101',
		message: 'token is pasttime!',
		result: ''
	},
	invalidToken: {
		code: '10102',
		message: 'token is invalid!',
		result: ''
	},
	noPermission: {
		code: '10103',
		message: 'no permission!',
		result: ''
	},
	fileUploadError: {
		code: '10201',
		message: 'file upload failed!',
		result: ''
	},
	fileTypeError: {
		code: '10202',
		message: 'file type wrong!',
		result: ''
	},
	goodsFormatError: {
		code: '10203',
		message: 'goods info format wrong!',
		result: ''
	},
	createGoodsError: {
		code: '10204',
		message: 'create goods info error!',
		result: ''
	},
	updateGoodsError: {
		code: '10205',
		message: 'update goods info error!',
		result: ''
	},
	removeGoodsError: {
		code: '10206',
		message: 'remove goods info error!',
		result: ''
	},
	studentFormatError: {
		code: '20101', // 中间件层面错误
		message: 'student regist info format error',
		result: ''
	},
	studentAlreadyExited: {
		code: '20102',
		message: 'student already exist',
		result: ''
	},
	studentRegisterError: {
		code: '20103',
		message: 'student regist error',
		result: ''
	},
	createStudentError: {
		code: '20201', // 数据库层面报错
		message: 'create student error',
		result: ''
	}
}