//nodemailer.js
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
	//node_modules/nodemailer/lib/well-known/services.json  查看相关的配置，如果使用qq邮箱，就查看qq邮箱的相关配置
	host: 'smtp.163.com',
	// service: 'qq', //类型qq邮箱
	port: 465,
	secure: true, // true for 465, false for other ports
	auth: {
		user: '', //注册的邮箱账号
		pass: '' //邮箱的授权码，不是注册时的密码,等你开启的stmp服务自然就会知道了
	}
})
//pass 不是邮箱账户的密码而是stmp的授权码（必须是相应邮箱的stmp授权码）
//邮箱---设置--账户--POP3/SMTP服务---开启---获取stmp授权码
const create = (user, code) => {
	/**
	 * @user ctx.request.body
	 * @code 验证码
	 * @nick_name 用户名
	 * @password 密码
	 * @user_name 邮箱号
	 */
	const { nick_name, password, user_name } = user
	let mailOptions = {
		from: '', // 发送方
		to: user_name, //接收者邮箱，多个邮箱用逗号间隔
		subject: `欢迎来到"疫情管理系统",你的验证码（${code}）`, // 标题
		html:`<head><base target="_blank" /><style type="text/css">::-webkit-scrollbar{ display: none; }</style><style id="cloudAttachStyle" type="text/css">#divNeteaseBigAttach, #divNeteaseBigAttach_bak{display:none;}</style><style id="blockquoteStyle" type="text/css">blockquote{display:none;}</style><style type="text/css">     body{font-size:14px;font-family:arial,verdana,sans-serif;line-height:1.666;padding:0;margin:0;overflow:auto;white-space:normal;word-wrap:break-word;min-height:100px}  td, input, button, select, body{font-family:Helvetica, \'Microsoft Yahei\', verdana}  pre {white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word;width:95%}  th,td{font-family:arial,verdana,sans-serif;line-height:1.666} img{ border:0}  header,footer,section,aside,article,nav,hgroup,figure,figcaption{display:block}  blockquote{margin-right:0px}</style></head><body tabindex="0" role="listitem"><table width="700" border="0" align="center" cellspacing="0" style="width:700px;"><tbody><tr><td><div style="width:700px;margin:0 auto;border-bottom:1px solid #ccc;margin-bottom:30px;"><table border="0" cellpadding="0" cellspacing="0" width="700" height="39" style="font:12px Tahoma, Arial, 宋体;"><tbody><tr><td width="210"></td></tr></tbody></table></div><div style="width:680px;padding:0 10px;margin:0 auto;"><div style="line-height:1.5;font-size:14px;margin-bottom:25px;color:#4d4d4d;"><strong style="display:block;margin-bottom:15px;">尊敬的用户：${nick_name}<span style="color:#f60;font-size: 16px;"></span>您好！</strong><strong style="display:block;margin-bottom:15px;">您正在进行<span style="color: red">注册账号</span>操作，请在验证码输入框中输入：<span style="color:#f60;font-size: 24px">${code}</span>，以完成操作。</strong></div>     <div style="margin-bottom:30px;"><small style="display:block;margin-bottom:20px;font-size:12px;"><p style="color:#747474;">     注意：此操作可能会修改您的密码、登录邮箱或绑定手机。如非本人操作，请及时登录并修改密码以保证帐户安全<br>（工作人员不会向你索取此验证码，请勿泄漏！)</p></small></div></div><div style="width:700px;margin:0 auto;"><div style="padding:10px 10px 0;border-top:1px solid #ccc;color:#747474;margin-bottom:20px;line-height:1.3em;font-size:12px;"><p>此为系统邮件，请勿回复<br>请保管好您的邮箱，避免账号被他人盗用</p><p>工程实践项目团队</p></div></div></td></tr></tbody></table></body>`
	}

	transporter.sendMail(mailOptions, (error, info) => {
		if(error) {
			return console.log(error)
		}
		console.log('mail sent:', info.response)
	})
}

const update = (user, code) => {
	/**
	 * @user ctx.request.body
	 * @code 验证码
	 * @nick_name 用户名
	 * @password 密码
	 * @user_name 邮箱号
	 */
	const { user_name, new_account } = user
	let mailOptions = {
		from: 'zenpinyou5016@163.com', // 发送方
		to: new_account, //接收者邮箱，多个邮箱用逗号间隔
		subject: `欢迎来到"疫情管理系统",你的验证码（${code}）`, // 标题
		html:`<head><base target="_blank" /><style type="text/css">::-webkit-scrollbar{ display: none; }</style><style id="cloudAttachStyle" type="text/css">#divNeteaseBigAttach, #divNeteaseBigAttach_bak{display:none;}</style><style id="blockquoteStyle" type="text/css">blockquote{display:none;}</style><style type="text/css">     body{font-size:14px;font-family:arial,verdana,sans-serif;line-height:1.666;padding:0;margin:0;overflow:auto;white-space:normal;word-wrap:break-word;min-height:100px}  td, input, button, select, body{font-family:Helvetica, \'Microsoft Yahei\', verdana}  pre {white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word;width:95%}  th,td{font-family:arial,verdana,sans-serif;line-height:1.666} img{ border:0}  header,footer,section,aside,article,nav,hgroup,figure,figcaption{display:block}  blockquote{margin-right:0px}</style></head><body tabindex="0" role="listitem"><table width="700" border="0" align="center" cellspacing="0" style="width:700px;"><tbody><tr><td><div style="width:700px;margin:0 auto;border-bottom:1px solid #ccc;margin-bottom:30px;"><table border="0" cellpadding="0" cellspacing="0" width="700" height="39" style="font:12px Tahoma, Arial, 宋体;"><tbody><tr><td width="210"></td></tr></tbody></table></div><div style="width:680px;padding:0 10px;margin:0 auto;"><div style="line-height:1.5;font-size:14px;margin-bottom:25px;color:#4d4d4d;"><strong style="display:block;margin-bottom:15px;">尊敬的用户<span style="color:#f60;font-size: 16px;"></span>您好！</strong><strong style="display:block;margin-bottom:15px;">您正在对${user_name}账号进行<span style="color: red">绑定邮箱</span>操作，请在验证码输入框中输入：<span style="color:#f60;font-size: 24px">${code}</span>，以完成操作。</strong></div>     <div style="margin-bottom:30px;"><small style="display:block;margin-bottom:20px;font-size:12px;"><p style="color:#747474;">     注意：此操作可能会修改您的密码、登录邮箱或绑定手机。如非本人操作，请及时登录并修改密码以保证帐户安全<br>（工作人员不会向你索取此验证码，请勿泄漏！)</p></small></div></div><div style="width:700px;margin:0 auto;"><div style="padding:10px 10px 0;border-top:1px solid #ccc;color:#747474;margin-bottom:20px;line-height:1.3em;font-size:12px;"><p>此为系统邮件，请勿回复<br>请保管好您的邮箱，避免账号被他人盗用</p><p>工程实践项目团队</p></div></div></td></tr></tbody></table></body>`
	}

	transporter.sendMail(mailOptions, (error, info) => {
		if(error) {
			return console.log(error)
		}
		console.log('mail sent:', info.response)
	})
}

module.exports = {
	create,
	update
}