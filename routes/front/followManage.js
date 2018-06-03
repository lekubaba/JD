let {User,Follow,Followed,Article,Main,Sub} = require('../../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../../utils/logger').logger;
let {formatDate} = require('../../utils/DateUtil');

//目标，用户点击关注和取消关注的处理；

//关注

router.get('/followManage/:main/:sub',function(req,res){
	var mainId = req.params.main;//发起关注人的unionId
	var subId = req.params.sub;//被关注人的unionId
	User.update({'unionId':mainId},{'$addToSet':{'follow':subId},'$inc':{'followNum':1}},function(err){
		if(err){
			logger.error(err);
			return;
		}else{
			return res.json({followStateCode:true})
		}

	})
	User.update({'unionId':subId},{'$addToSet':{'followed':mainId},'$inc':{'followedNum':1}},function(err){
		if(err){
			logger.error(err);
			return;
		}else{
			return
		}

	})


});

//取消关注

router.get('/followedManage/:main/:sub',function(req,res){
	var mainId = req.params.main;//发起关注人的unionId
	var subId = req.params.sub;//被关注人的unionId
	User.update({'unionId':mainId},{'$pull':{'follow':subId},'$inc':{'followNum':-1}},function(err){
		if(err){
			logger.error(err);
			return;
		}else{
			return res.json({followStateCode:false})
		}

	})
	User.update({'unionId':subId},{'$pull':{'follow':mainId},'$inc':{'followedNum':-1}},function(err){
		if(err){
			logger.error(err);
			return;
		}else{
			return
		}

	})
});



module.exports = router;