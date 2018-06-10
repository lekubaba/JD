let {User,Column,Follow,Followed,Article,Main,Sub} = require('../../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../../utils/logger').logger;
let {formatDate} = require('../../utils/DateUtil');
var Forbidden = require('../../utils/Forbidden');
var message = require('../../message');


router.post('/article',function(req,res){
	
	var unionId=req.signedCookies.mycookies.unionId;
	var nickName = req.signedCookies.mycookies.nickName;
	var avatarUrl = req.signedCookies.mycookies.avatarUrl;
	var zone;
	var title = Forbidden.forbiddenFun(req.body.titles);
	var lead = Forbidden.forbiddenFun(req.body.lead);
	var content = Forbidden.forbiddenFun(req.body.contents);
	var imgUrl = req.body.imgUrl;
	var columnId =req.body.columnId;
	Column.findOne({_id:columnId},{zone:1},function(err,ret1){
		if(err){
			logger.error(err)
		}else{

			zone = ret1.zone;

			var article= new Article({
				unionId:unionId,
				columnId:columnId,
				nickName:nickName,
				avatarUrl:avatarUrl,
				zone:zone,
				title:title,
				lead:lead,
				content:content,
				imgUrl:imgUrl,
				time:formatDate('yyyy-MM-dd hh:mm:ss'),
				zanNum:0,
				kanNum:0,
				timeStamp:Date.now(),
				isTop:0,
				isCheck:false
			})

			article.save(function(err){
				if(err){
					logger.error(err);
					return res.send(message.common.SYSTEM_EXCEPTION);
				}

				User.update({unionId:unionId},{$push:{myColumn:article._id},'$inc':{'myColumnNum':1}},function(err){
					if(err){
						logger.error(err);
						return res.send(message.common.SYSTEM_EXCEPTION);
					}else{
						Column.update({_id:columnId},{$push:{myColumn:article._id},'$inc':{'myColumnNum':1}},function(err){
							if(err){
								return logger.error(err)
							}else{
								return res.send(message.common.SUCCESS);
							}

						})

					}
					
				})
			})

		}


	})



})


module.exports = router;