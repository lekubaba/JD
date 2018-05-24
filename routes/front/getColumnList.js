let {User,Follow,Followed,Article,Main,Sub} = require('../../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../../utils/logger').logger;
let {formatDate} = require('../../utils/DateUtil');

//目标，拿到地点，所有地区专栏返回给客户

router.get('/getColumnList/:site',function(req,res){
	var zone = req.params.site;//发起点赞人的unionId
	User.find({zone:zone},{follow:0,followed:0,coll:0,number:0,isVip:0,isColumn:0,zanArticle:0},function(err,result){
		if(err){
			return logger.error('查询本地列表出错了')
		}else{
			res.json(result)
		}
	})

});





module.exports = router;