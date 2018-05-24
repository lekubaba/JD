let {User,Follow,Followed,Article,Main,Sub} = require('../../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../../utils/logger').logger;
let {formatDate} = require('../../utils/DateUtil');

//目标，返回用户要用的数据，判断请求用户是否关注此详情页的用户；

//用户详情页面

router.get('/udetail/:_id/:unionId',function(req,res){
	var _id = req.params._id;//详情页用户的id
	var unionId= req.params.unionId;//请求用户的unionId;
	User.findOne({_id:_id},{_id:1,unionId:1,nickName:1,avatarUrl:1,loanName:1,myColumn:1,city:1,company:1,zone:1},function(err,result){
		if(err){
			return logger.error('详情页查询出错了');
		}else{

		var myColumnId = result.myColumn;
		Article.find({_id:{$in:myColumnId}},{_id:1,title:1,lead:1,zanNum:1,kanNum:1},function(err1,results){
			if(err1){
				return logger.error(err1);
			}else{

				User.find({unionId:unionId,follow:result.unionId},{_id:0,follow:1},function(err,result1){
					if(err){
						return logger.error(err)
					}
					if(!result1[0]){
var data1 = {followStateCode:false,_id:result._id,unionId:result.unionId,zone:result.zone,nickName:result.nickName,avatarUrl:result.avatarUrl,loanName:result.loanName,city:result.city,myColumn:results,company:result.company}
						res.json(data1);
					}
					else if(result1[0]){
var data1 = {followStateCode:true,_id:result._id,unionId:result.unionId,zone:result.zone,nickName:result.nickName,avatarUrl:result.avatarUrl,loanName:result.loanName,city:result.city,myColumn:results,company:result.company}

						res.json(data1);
					}
				})

				
			}

		}) 

			
		}
	})
});



router.get('/uprofile/:unionId',function(req,res){
	var unionId = req.params.unionId;
	User.findOne({unionId:unionId},{nickname:1,_id:0,avatarUrl:1,city:1,introduce:1,unionId:1},function(err,result){
		if(err){
			return logger.error(err);
		}else{
			res.json(result);
		}
	})
})


module.exports = router;