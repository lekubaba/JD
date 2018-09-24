let {User,Column,Follow,Followed,Article,Main,Sub} = require('../../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../../utils/logger').logger;
let {formatDate} = require('../../utils/DateUtil');

//本地信贷栏

router.get('/chinaAll/:site',function(req,res){
	var site = req.params.site;
	Article.find({$or:[{zone:site},{zone:'全国'}],isCheck:'success'},{content:0,unionId:0,comment:0,whoZan:0},function(err,result){
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
	Article.find({$or:[{zone:site},{zone:'全国'}],isCheck:'success'},{content:0,unionId:0,comment:0,whoZan:0},function(err,result){
		if(err){
			return logger.error(err);
		}else{
			return res.json(result);
		}
	}).sort({timeStamp:-1}).limit(10).skip(len)
});


//招商代理内容栏


router.get('/dailixinxi',function(req,res){
	var site = req.params.site;
	Article.find({zone:'全国',isCheck:'success'},{content:0,unionId:0,comment:0,whoZan:0},function(err,result){
		if(err){
			return logger.error(err);
		}else{
			return res.json(result);
		}
	}).sort({timeStamp:-1}).limit(10)
});


router.get('/dailixinxi/:len',function(req,res){
	var len = req.params.len
	len = parseInt(len);
	Article.find({zone:'全国',isCheck:'success'},{content:0,unionId:0,comment:0,whoZan:0},function(err,result){
		if(err){
			return logger.error(err);
		}else{
			return res.json(result);
		}
	}).sort({timeStamp:-1}).limit(10).skip(len)
});


//网贷相关文章栏


router.get('/loanDocument',function(req,res){
	Article.find({zone:'网贷',isCheck:'success'},{content:0,unionId:0,comment:0,whoZan:0},function(err,result){
		if(err){
			return logger.error(err);
		}else{
			return res.json(result);
		}
	}).sort({timeStamp:-1}).limit(10)
});


router.get('/loanDocument/:len',function(req,res){
	var len = req.params.len
	len = parseInt(len);
	Article.find({zone:'网贷',isCheck:'success'},{content:0,unionId:0,comment:0,whoZan:0},function(err,result){
		if(err){
			return logger.error(err);
		}else{
			return res.json(result);
		}
	}).sort({timeStamp:-1}).limit(10).skip(len)
});



//推广产品栏目


router.get('/extendDocument',function(req,res){
	Article.find({zone:'推广',isCheck:'success'},{content:0,unionId:0,comment:0,whoZan:0},function(err,result){
		if(err){
			return logger.error(err);
		}else{
			return res.json(result);
		}
	}).sort({timeStamp:-1}).limit(10)
});


router.get('/extendDocument/:len',function(req,res){
	var len = req.params.len
	len = parseInt(len);
	Article.find({zone:'推广',isCheck:'success'},{content:0,unionId:0,comment:0,whoZan:0},function(err,result){
		if(err){
			return logger.error(err);
		}else{
			return res.json(result);
		}
	}).sort({timeStamp:-1}).limit(10).skip(len)
});




module.exports = router;