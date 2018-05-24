let {User,Follow,Followed,Article,Main,Sub} = require('../../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../../utils/logger').logger;
let {formatDate} = require('../../utils/DateUtil');


router.get('/chinaAll/:site',function(req,res){
	var site = req.params.site;
	if(site==='全国'){
		Article.find({zone:'全国'},{content:0,unionId:0,comment:0,whoZan:0},function(err,results){
			if(err){
				return logger.error(err);
			}else{
				return res.json(results);
			}
		});
	}else{
		Article.find({$or:[{zone:site},{zone:'全国'}]},{content:0,unionId:0,comment:0,whoZan:0},function(err,result){
			if(err){
				return logger.error(err);
			}else{
				return res.json(result);
			}
		});
	}

});


module.exports = router;