//用户登录注册
var WXBizDataCrypt = require('../../utils/WXBizDataCrypt')
let {User,Follow,Followed,Article,Main,Sub} = require('../../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../../utils/logger').logger;
var appId = 'wx5e0c842d07a1621f';

router.get('/wx/login', function (req, res, next) {
	var code =req.query.code;
	var encryptedData =req.query.encryptedData;
	var iv =req.query.iv;
	var api='https://api.weixin.qq.com/sns/jscode2session?appid=wx5e0c842d07a16'+
			'21f&secret=ea1ced972ff4c04fbfd863157253892b&js_code='+code+'&grant'+
			'_type=authorization_code';
	var method = req.method.toUpperCase();

	var options = {
	    	headers: {"Connection": "close"},
			url: api,
			method: method,
			json: true
	};

	function callback(error, response, data) {
		if (!error && response.statusCode == 200) {			
			var pc = new WXBizDataCrypt(appId, data.session_key)
			var userInfo = pc.decryptData(encryptedData , iv);
			var userId = userInfo.unionId;

			var user = new User({
					unionId:userInfo.unionId,
					nickName:userInfo.nickName,
					avatarUrl:userInfo.avatarUrl,
					gender:userInfo.gender,
					city:userInfo.city,
					introduce:'',
					zone:'',
					company:'',
					loanName:'',
					isVip:false,
					isColumn:false,
					achievement:'c',
					followNum:0,
					followedNum:0,
					myColumnNum:0,
					collNum:0
			});
			User.findOne({unionId:userInfo.unionId},{_id:1,unionId:1,followNum:1,myColumnNum:1,collNum:1},function(err,result){
				if(err){
					logger.error(err);
					return;
				}

				if(!result){
					user.save(function(err){
						if(err){
							logger.error(err);
							return;
						}else{
							var datas = {_id:user._id,unionId:userId,followNum:0,myColumnNum:0,collNum:0}
							return res.json(datas);
						}
						
					})
				}else{

					return res.json(result);	
				}
			})
			
		}else{
			logger.error(error);
			return;
	  	}
	}

	request(options, callback);

});

module.exports = router;