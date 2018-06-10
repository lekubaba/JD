let {User,Column,Follow,Followed,Article,Main,Sub} = require('../../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../../utils/logger').logger;
let {formatDate} = require('../../utils/DateUtil');


router.get('/chinaAll/:site',function(req,res){
	var site = req.params.site;
	Article.find({$or:[{zone:site},{zone:'全国'}]},{content:0,unionId:0,comment:0,whoZan:0},function(err,result){
		if(err){
			return logger.error(err);
		}else{
			return res.json(result);
		}
	}).sort({timeStamp:-1}).limit(10)
});


router.get('/freshexp/:site/:len',function(req,res){
	var site = req.params.site;
	var len = req.params.len
	len = parseInt(len);
	Article.find({$or:[{zone:site},{zone:'全国'}]},{content:0,unionId:0,comment:0,whoZan:0},function(err,result){
		if(err){
			return logger.error(err);
		}else{
			return res.json(result);
		}
	}).sort({timeStamp:-1}).limit(10).skip(len)
});


module.exports = router;