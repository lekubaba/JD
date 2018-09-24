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
	Column.find({$or:[{zone:zone},{zone:'全国'}],isCheck:'success',myColumnNum:{$gt:0}},{myColumn:0,isVip:0,timeStamp:0},function(err,result){
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
	Column.find({$or:[{zone:zone},{zone:'全国'}],isCheck:'success',myColumnNum:{$gt:0}},{myColumn:0,isVip:0,timeStamp:0},function(err,result){
		if(err){
			return logger.error(err);
		}else{
			return res.json(result);
		}
	}).sort({isTop:-1,timeStamp:-1}).limit(10).skip(len)
});



//招商代理板块请求路由，

router.get('/zhaoshangdaili',function(req,res){
	Column.find({zone:'全国',isCheck:'success',myColumnNum:{$gt:0}},{myColumn:0,isVip:0,timeStamp:0},function(err,result){
		if(err){
			return logger.error(err)
		}else{
			return res.json(result)
		}
	}).sort({isTop:-1,timeStamp:-1}).limit(10)

});


router.get('/zhaoshangdaili/:len',function(req,res){
	var len = req.params.len
	len = parseInt(len);
	Column.find({zone:'全国',isCheck:'success',myColumnNum:{$gt:0}},{myColumn:0,isVip:0,timeStamp:0},function(err,result){
		if(err){
			return logger.error(err);
		}else{
			return res.json(result);
		}
	}).sort({isTop:-1,timeStamp:-1}).limit(10).skip(len)
});



//网贷相关，

router.get('/loanColumnList',function(req,res){
	Column.find({zone:'网贷',isCheck:'success',myColumnNum:{$gt:0}},{myColumn:0,isVip:0,timeStamp:0},function(err,result){
		if(err){
			return logger.error(err)
		}else{
			return res.json(result)
		}
	}).sort({isTop:-1,timeStamp:-1}).limit(10)

});


router.get('/loanColumnList/:len',function(req,res){
	var len = req.params.len
	len = parseInt(len);
	Column.find({zone:'网贷',isCheck:'success',myColumnNum:{$gt:0}},{myColumn:0,isVip:0,timeStamp:0},function(err,result){
		if(err){
			return logger.error(err);
		}else{
			return res.json(result);
		}
	}).sort({isTop:-1,timeStamp:-1}).limit(10).skip(len)
});


//推广产品列表栏目，

router.get('/extendColumnList',function(req,res){
	Column.find({zone:'推广',isCheck:'success',myColumnNum:{$gt:0}},{myColumn:0,isVip:0,timeStamp:0},function(err,result){
		if(err){
			return logger.error(err)
		}else{
			return res.json(result)
		}
	}).sort({isTop:-1,timeStamp:-1}).limit(10)

});


router.get('/extendColumnList/:len',function(req,res){
	var len = req.params.len
	len = parseInt(len);
	Column.find({zone:'推广',isCheck:'success',myColumnNum:{$gt:0}},{myColumn:0,isVip:0,timeStamp:0},function(err,result){
		if(err){
			return logger.error(err);
		}else{
			return res.json(result);
		}
	}).sort({isTop:-1,timeStamp:-1}).limit(10).skip(len)
});




module.exports = router;