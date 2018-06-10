let {User,Column,Follow,Followed,Article,Main,Sub} = require('../../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../../utils/logger').logger;
let {formatDate} = require('../../utils/DateUtil');

//目标，用户收藏，和取消收藏

//收藏

router.get('/collManage/:main/:_id',function(req,res){
	var mainId = req.params.main;//发起点赞人的unionId
	var _id= req.params._id;//收藏的文章id
	User.update({'unionId':mainId},{'$addToSet':{'coll':_id},'$inc':{'collNum':1}},function(err){
		if(err){
			logger.error(err);
			return;
		}else{

			return res.json({collectionStateCode:true})

		}

	})
});

//取消收藏，
router.get('/hCollManage/:main/:_id',function(req,res){
	var mainId = req.params.main;//发起关注人的unionId
	var _id = req.params._id;//收藏的文章id
	User.update({'unionId':mainId},{'$pull':{'coll':_id},'$inc':{'collNum':-1}},function(err){
		if(err){
			logger.error(err);
			return;
		}else{
			return res.json({collectionStateCode:false})
		}

	})
});



module.exports = router;