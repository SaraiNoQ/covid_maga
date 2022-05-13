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
	getUserInfoError: {
		code: '10207',
		message: 'get user information error!',
		result: ''
	},
	updateAccountError: {
		code: '10208',
		message: 'update email error',
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
	},
	deleteStudentError: {
		code: '20202',
		message: 'delete student error',
		result: ''
	},
	deleteStudentNull: {
		code: '20203',
		message: 'delete student is not exist',
		result: ''
	},
	deleteConditionNull: {
		code: '20104',
		message: 'delete condition is null',
		result: ''
	},
	journeyFormatError: {
		code: '30101',
		message: 'journey info format error',
		result: ''
	},
	createJourneyError: {
		code: '30201',
		message: 'create journey error',
		result: ''
	},
	noQueryStudent: {
		code: '30202',
		message: 'no query student',
		result: ''
	},
	infoUpdateError: {
		code: '30203',
		message: 'update user info error',
		result: ''
	},
	updateJourneyError: {
		code: '30204',
		message: 'update journey error',
		result: ''
	},
	updateStudentError: {
		code: '30205',
		message: 'update student error',
		result: ''
	}
}