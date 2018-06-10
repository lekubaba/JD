let {User,Column,Follow,Followed,Article,Main,Sub} = require('../../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../../utils/logger').logger;
let {formatDate} = require('../../utils/DateUtil');
var Forbidden = require('../../utils/Forbidden');


//目标，将用户的评论添加到评论列表，再将这条评论的Id插入到父评论列表；

router.post('/mainComment/:_id',function(req,res){
	var _id = req.params._id;
	var main = new Main({
		unionId:req.body.unionId,
		avatarUrl:req.body.avatarUrl,
		nickName:req.body.nickName,
		content:Forbidden.forbiddenFun(req.body.content),
		time:formatDate('MM-dd hh:mm:ss'),
		zanNum:0,
		comment:[]
	})
	main.save(function(err){
		if(err){
			return logger.info(err);
		}else{
			Article.update({_id:_id},{$addToSet:{'comment':main._id}},function(err){
				if(err){
					return logger.info(err);
				}else{
					res.json(main)
				}
			})
		}
	})

})

//二级评论

router.post('/subComment/:_id',function(req,res){
	var _id = req.params._id;
	var sub = new Sub({
		unionId:req.body.unionId,
		nickName:req.body.nickName,
		content:Forbidden.forbiddenFun(req.body.content),
	})

	var _idSub = sub._id;

	var subComment = {_id:_idSub,unionId:req.body.unionId,nickName:req.body.nickName,content:req.body.content};

	Main.update({_id:_id},{$push:{comment:subComment}},function(err){
		if(err){
			return logger.error(err);
		}else{
			res.send('保存富评论成功啦')
		}
	})

})






module.exports = router;