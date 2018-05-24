let {User,Follow,Followed,Article,Main,Sub} = require('../../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../../utils/logger').logger;
let {formatDate} = require('../../utils/DateUtil');

//目标，用户请求自己的文章列表，并返回；

//主页显示


router.get('/me/show/:unionId',function(req,res){
	var unionId = req.params.unionId;
	User.findOne({unionId:unionId},{_id:0,followNum:1,myColumnNum:1,collNum:1},function(err,result){
		if(err){
			logger.error(err);
			return;
		}

		if(!result){
	
			var datas = {followNum:0,myColumnNum:0,collNum:0}
			return res.json(datas);
				
		}else{

			return res.json(result);	
		}
	})

})



//查自己的经验

router.get('/me/:unionId',function(req,res){
	var unionId = req.params.unionId;
	User.find({unionId:unionId},{_id:0,myColumn:1},function(err,result){
		if(err){
			return logger.error(err)
		}else{
			Article.find({_id:{$in:result[0].myColumn}},{_id:1,unionId:1,title:1,lead:1,zanNum:1,kanNum:1},function(err,result1){
	
				res.json(result1)
			})

		}
	})
});


router.get('/other/:unionId',function(req,res){
	var unionId = req.params.unionId;
	User.find({unionId:unionId},{_id:0,coll:1},function(err,result){
		if(err){
			return logger.error(err)
		}else{
			Article.find({_id:{$in:result[0].coll}},{_id:1,unionId:1,nickName:1,avatarUrl:1,time:1,title:1,lead:1,zanNum:1,kanNum:1},function(err,result1){
				res.json(result1)
			})

		}
	})
});


router.get('/follower/:unionId',function(req,res){
	var unionId = req.params.unionId;
	User.find({unionId:unionId},{_id:0,follow:1},function(err,result){
		if(err){
			return logger.error(err)
		}else{
			User.find({unionId:{$in:result[0].follow}},{_id:1,unionId:1,nickName:1,avatarUrl:1,loanName:1},function(err,result1){
				res.json(result1)
			})

		}
	})
});





module.exports = router;