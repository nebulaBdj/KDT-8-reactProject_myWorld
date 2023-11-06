'use strict';

const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
// 지정된 환경변수가 없다면 'development'로 지정한다.

const config = require(__dirname + '/../config/config.json')[env];
// config/config.json 파일에 있는 설정값들을 불러온다.
// config객체의 env변수(development)키 의 객체값들을 불러온다.
// 즉, 데이터베이스 설정을 불러오는 것이다.

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = require('./myStory')(sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
