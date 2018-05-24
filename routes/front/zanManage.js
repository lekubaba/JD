let {User,Follow,Followed,Article,Main,Sub} = require('../../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../../utils/logger').logger;
let {formatDate} = require('../../utils/DateUtil');

//目标，用户点赞增一，取消减去一

//点赞

router.get('/zanManage/:main/:_id',function(req,res){
	var mainId = req.params.main;//发起点赞人的unionId
	var _id= req.params._id;//点赞的文章id
	User.update({'unionId':mainId},{'$addToSet':{'zanArticle':_id}},function(err){
		if(err){
			logger.error(err);
			return;
		}else{

			Article.update({_id:_id},{$inc:{'zanNum':1}},function(err){
				if(err) logger.info(err);
				return res.json({mPraiseStateCode:true})
			})
		}

	})
});

//取消点赞，但是没有为点赞减去一
router.get('/hZanManage/:main/:_id',function(req,res){
	var mainId = req.params.main;//发起关注人的unionId
	var _id = req.params._id;//点赞的文章id

	User.update({'unionId':mainId},{'$pull':{'zanArticle':_id}},function(err){
		if(err){
			logger.error(err);
			return;
		}else{
			return res.json({mPraiseStateCode:false})
		}

	})
});









module.exports = router;