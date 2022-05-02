// const where = {}

// Object.assign(where, { name: 'aaa' })
// Object.assign(where, { id: 22 })

// console.log(where)

// // console.log(where)
// const dayjs = require('dayjs')
// const createAt = dayjs(new Date()).format('YYYY-MM-DD')
// console.log(createAt)

// CREATE TABLE `zd_students` (
//   `id` int(11) NOT NULL AUTO_INCREMENT,
//   `student_number` char(32) CHARACTER SET latin1 NOT NULL COMMENT 'student_number',
//   `student_name` varchar(255) CHARACTER SET latin1 NOT NULL COMMENT 'student_name',
//   `student_gender` varchar(255) CHARACTER SET latin1 NOT NULL COMMENT 'student_gender, string',
//   `student_major` varchar(255) CHARACTER SET latin1 NOT NULL COMMENT 'student_major, string',
//   `student_image` mediumblob COMMENT 'student_image, blob',
//   `createdAt` datetime NOT NULL,
//   `updatedAt` datetime NOT NULL,
//   PRIMARY KEY (`id`),
//   UNIQUE KEY `student_number` (`student_number`)
// ) ENGINE = InnoDB AUTO_INCREMENT = 24 DEFAULT CHARSET = utf8

// CREATE TABLE `zd_journeys` (
//   `id` int(11) NOT NULL AUTO_INCREMENT,
//   `journey_id` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL COMMENT 'main key',
//   `journey_category` char(16) NOT NULL COMMENT 'journey_category, student / teacher',
//   `live_zone` char(16) NOT NULL COMMENT 'live_zone, konggang / longquan / else',
//   `healthy_status` char(16) NOT NULL COMMENT 'healthy_status, green / yellow / red',
//   `journey_destination` varchar(255) NOT NULL COMMENT 'journey_destination, string',
//   `journey_reason` varchar(255) NOT NULL COMMENT 'journey_reason, string',
//   `journey_start_time` datetime NOT NULL COMMENT 'journey_start_time, date',
//   `journey_end_time` datetime NOT NULL COMMENT 'journey_end_time, date',
//   `journey_info` varchar(255) DEFAULT NULL COMMENT 'journey_info, string',
//   `createAt` datetime NOT NULL COMMENT 'create time YY-MM-DD 00:00:00',
//   `record_status` char(8) NOT NULL DEFAULT '0' COMMENT 'record_status, 0: waiting / 1: completed',
//   `createdAt` datetime NOT NULL,
//   `updatedAt` datetime NOT NULL,
//   `student_id` char(32) DEFAULT NULL,
//   PRIMARY KEY (`id`),
//   UNIQUE KEY `journey_id` (`journey_id`),
//   KEY `student_id` (`student_id`),
//   CONSTRAINT `zd_journeys_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `zd_students` (`student_number`) ON DELETE SET NULL ON UPDATE CASCADE
// ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1

// CREATE TABLE `zd_users` (
//   `id` int(11) NOT NULL AUTO_INCREMENT,
//   `user_name` varchar(255) NOT NULL COMMENT 'nickname, unique',
//   `password` char(64) NOT NULL COMMENT 'password',
//   `is_admin` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'is admin ? 1 : 0',
//   `nick_name` varchar(255) NOT NULL COMMENT 'nick_name of user',
//   `createdAt` datetime NOT NULL,
//   `updatedAt` datetime NOT NULL,
//   PRIMARY KEY (`id`),
//   UNIQUE KEY `user_name` (`user_name`)
// ) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1

// const dayjs = require('dayjs')
// console.log(dayjs(new Date()).format('YYYY-MM-DD'), dayjs('Fri Apr 01 2022 00:00:00 GMT+0800 (中国标准时间)').format('YYYY-MM-DD'))
// console.log(dayjs('2022-04-27').diff(dayjs('2022-04-01'), 'day'))
// const startTime: string = dayjs(new Date()).format('YYYY-MM-DD')
// const endTime: string = dayjs().format('YYYY-MM-DD')

const path = require('path')

console.log(path.join(__dirname, '../static'))