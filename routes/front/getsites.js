let {User,Follow,Followed,Article,Main,Sub} = require('../../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../../utils/logger').logger;
let {formatDate} = require('../../utils/DateUtil');
let CommonUtil = require('../../utils/CommonUtil');


router.get('/loaction/sites',function(req,res){
	User.find({isColumn:true},{_id:0,zone:1},function(err,data){
		if(err){
			return logger.error(err);
		}else{
			var zones =CommonUtil.arrUnique(data);
			return res.json(zones);
		}
	})

})


module.exports = router;