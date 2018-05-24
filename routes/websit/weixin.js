let {User,Follow,Followed,Article,Main,Sub} = require('../../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../../utils/logger').logger;
let {formatDate} = require('../../utils/DateUtil');
var appid = 'wxf4754d57d42fee70';
var AppSecret ='7ee0d9ca73ec7fef8ff38858b4bf3c2b';



router.get('/code/:code',function(req,res){
	var code = req.params.code;
	var url='https://api.weixin.qq.com/sns/oauth2/access_token?appid='+appid+'&secret='+AppSecret+'&code='+code+'&grant_type=authorization_code'
	var method = req.method.toUpperCase();
	var options = {
	    	headers: {"Connection": "close"},
			url: url,
			method: method,
			json: true
	};

	function callback(error, response, data) {
		if (!error && response.statusCode == 200) {			
			var access_token=data.access_token;
			var openid = data.openid;
			var unionId =data.unionid;
			var uris = 'https://api.weixin.qq.com/sns/userinfo?access_token='+access_token+'&openid='+openid;
			if(unionId){
				User.findOne({unionId:unionId},{_id:0,isColumn:1,nickName:1,avatarUrl:1,zone:1},function(err,result){
					if(err){
						return logger.error(err);
					}else{

						
						res.cookie('mycookies',{unionId:unionId,nickName:result.nickName,avatarUrl:result.avatarUrl,zone:result.zone},{signed:true,maxAge:6000*1000*1000,path:'/'});

						return res.json(result);
						
					}					
					
				})
			}else{

				var optionss = {
				    	headers: {"Connection": "close"},
						url: uris,
						method: method,
						json: true
				};			
				function callbacks(error, response, datas) {
					if (!error && response.statusCode == 200) {

						var user = new User({
								unionId:datas.unionid,
								nickName:datas.nickname,
								avatarUrl:datas.headimgurl,
								gender:datas.sex,
								city:datas.city,
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

						user.save(function(err){
							if(err){
								return logger.error(err)
							}else{
								var result={isColumn:user.isColumn}
								res.cookie('mycookies',{unionId:unionId,nickName:user.nickName,avatarUrl:user.avatarUrl,zone:user.zone},{signed:true,maxAge:6000*1000*1000,path:'/'});
								return res.json(result)
							}
						})

					}else{
						return logger.error('网页登陆失败');
					}
				}

				request(optionss, callbacks);
			}

		}else{
			return logger.error('请求腾讯code出现异常');
			
	  	}
	}

	request(options, callback);
})


module.exports = router;