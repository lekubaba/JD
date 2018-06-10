let {User,Column,Follow,Followed,Article,Main,Sub} = require('../../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../../utils/logger').logger;
let {formatDate} = require('../../utils/DateUtil');

//目标，用户点击关注和取消关注的处理；

//关注

router.get('/followManage/:main/:sub/:columnId',function(req,res){
	var mainId = req.params.main;//发起关注人的unionId
	var subId = req.params.sub;//被关注人的unionId
	var columnId = req.params.columnId;//被关注的专栏Id
	User.update({'unionId':mainId},{'$addToSet':{'followColumn':columnId,'follow':subId},'$inc':{'followColumnNum':1,'followNum':1}},function(err){
		if(err){
			logger.error(err);
			return;
		}else{

			User.findOne({'followed':mainId},function(err,ret){
				if(err){
					return logger.error(err)
				}else if(!ret){

					User.update({'unionId':subId},{'$addToSet':{'followed':mainId},'$inc':{'followedNum':1}},function(err){
						if(err){
							logger.error(err);
							return;
						}else{
							return res.json({followStateCode:true});
						}

					})

				}else{
					return res.json({followStateCode:true});
				}
			})



			
		}

	})

});

//取消关注

router.get('/followedManage/:main/:sub/:columnId',function(req,res){
	var mainId = req.params.main;//发起关注人的unionId
	var subId = req.params.sub;//被关注人的unionId
	var columnId = req.params.columnId;//被关注的专栏Id
	User.update({'unionId':mainId},{'$pull':{'followColumn':columnId},'$inc':{'followColumnNum':-1}},function(err){
		if(err){
			logger.error(err);
			return;
		}else{

			// User.update({'unionId':subId},{'$pull':{'followed':mainId},'$inc':{'followedNum':-1}},function(err){
			// 	if(err){
			// 		logger.error(err);
			// 		return;
			// 	}else{
					return res.json({followStateCode:false})
			// 	}

			// })			
			
		}

	})

});



module.exports = router;