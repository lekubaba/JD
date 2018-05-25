var mongoose = require('mongoose');
var logger = require('../utils/logger.js').logger;

var DB_URL   = 'mongodb://lekubaba:yjx123456@www.xiaohongxian.com/xiaohong';

mongoose.Promise = require('bluebird');

mongoose.connect(DB_URL,{useMongoClient: true});

mongoose.connection.on('connected',function(){
	logger.info('数据库连接成功');
});
mongoose.connection.on('error',function(){
	logger.error('连接异常');

});
mongoose.connection.on('disconnected',function(){
	logger.info('连接已经断开');

});


module.exports = mongoose;