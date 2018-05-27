let {User,Follow,Followed,Article,Main,Sub} = require('../../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../../utils/logger').logger;
let {formatDate} = require('../../utils/DateUtil');



router.get('/',function(req,res){
	res.render('./home')
})


router.get('/column',function(req,res){
	if(req.signedCookies.mycookies){
		var unionId = req.signedCookies.mycookies.unionId;
		User.findOne({unionId:unionId},{_id:0,isColumn:1,avatarUrl:1},function(err,result){
			if(result.isColumn===false){
				res.render('./column',{avatarUrl:result.avatarUrl})
			}else if(result.isColumn===true){
				res.redirect('/write');
			}
		})
	}else{
		res.redirect('/');
	}
	
})

router.post('/writetool',function(req,res){
	var unionId = req.signedCookies.mycookies.unionId;
	var company = req.body.company;
	var loanName = req.body.loanName;
	var zone = req.body.zone;
	var introduce = req.body.introduce;
	var timeStamp = Date.now();
	User.update({unionId:unionId},{$set:{timeStamp:timeStamp,company:company,loanName:loanName,zone:zone,introduce:introduce,isColumn:true}},function(err){
		if(err){
			return logger.error(err);
		}
		res.clearCookie();

		User.findOne({unionId:unionId},{unionId:1,avatarUrl:1,nickName:1,zone:1},function(err,result){
			if(err){
				return logger.error(err)
			}else{

				res.cookie('mycookies',{unionId:result.unionId,nickName:result.nickName,avatarUrl:result.avatarUrl,zone:result.zone},{signed:true,maxAge:6000*1000*1000,path:'/'});

				return res.redirect('/success')


			}
		})



		

	})

})

router.get('/success',function(req,res){

	if(req.signedCookies.mycookies){
		var unionId = req.signedCookies.mycookies.unionId;
		User.findOne({unionId:unionId},{_id:0,isColumn:1,avatarUrl:1},function(err,result){
			if(result.isColumn===false){
				res.render('./column',{avatarUrl:result.avatarUrl})
			}else if(result.isColumn===true){
				res.render('./success',{avatarUrl:result.avatarUrl})
			}
		})
	}else{
		res.redirect('/');
	}



})

router.get('/write',function(req,res){

	if(req.signedCookies.mycookies){
		var unionId = req.signedCookies.mycookies.unionId;
		User.findOne({unionId:unionId},{_id:0,isColumn:1,avatarUrl:1},function(err,result){
			if(result.isColumn===false){
				res.redirect('/column');
			}else if(result.isColumn===true){
				res.render('./write',{avatarUrl:result.avatarUrl});
			}
		})
	}else{
		res.redirect('/');
	}

})


module.exports = router;