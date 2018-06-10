let {User,Column,Follow,Followed,Article,Main,Sub} = require('../../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../../utils/logger').logger;
let {formatDate} = require('../../utils/DateUtil');

//目标，拿到地点，所有地区专栏返回给客户

router.get('/getColumnList/:site',function(req,res){
	var zone = req.params.site;
	Column.find({$or:[{zone:zone},{zone:'全国'}]},{myColumn:0,isVip:0,timeStamp:0},function(err,result){
		if(err){
			return logger.error(err)
		}else{
			return res.json(result)
		}
	}).sort({isTop:-1,timeStamp:-1}).limit(10)

});


router.get('/freshcolumn/:site/:len',function(req,res){
	var zone = req.params.site;
	var len = req.params.len
	len = parseInt(len);
	Column.find({$or:[{zone:zone},{zone:'全国'}]},{myColumn:0,isVip:0,timeStamp:0},function(err,result){
		if(err){
			return logger.error(err);
		}else{
			return res.json(result);
		}
	}).sort({isTop:-1,timeStamp:-1}).limit(10).skip(len)
});




module.exports = router;