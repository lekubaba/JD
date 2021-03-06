let {User,Column,Follow,Followed,Article,Main,Sub} = require('../../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../../utils/logger').logger;
let {formatDate} = require('../../utils/DateUtil');

//目标，用户请求自己的文章列表，并返回；

//主页显示


router.get('/me/show/:unionId',function(req,res){
	var unionId = req.params.unionId;
	User.findOne({unionId:unionId},{_id:0,myColumnNum:1,collNum:1,followColumnNum:1,followedNum:1},function(err,result){
		if(err){
			logger.error(err);
			return;
		}

		if(!result){
	
			var datas = {myColumnNum:0,collNum:0,followColumnNum:0,followedNum:0}
			return res.json(datas);
				
		}else{

			return res.json(result);	
		}
	})

})



//查自己的经验

router.get('/me/:unionId',function(req,res){
	var unionId = req.params.unionId;
	User.find({unionId:unionId},{_id:0,myColumn:1},function(err,result){
		if(err){
			return logger.error(err)
		}else{
			Article.find({_id:{$in:result[0].myColumn}},{_id:1,unionId:1,title:1,lead:1,zanNum:1,kanNum:1},function(err,result1){
	
				res.json(result1.reverse())
			}).limit(10);

		}
	})
});

router.get('/mes/:unionId/:len',function(req,res){
	var unionId = req.params.unionId;
	var len = req.params.len;
	len = parseInt(len);
	User.find({unionId:unionId},{_id:0,myColumn:1},function(err,result){
		if(err){
			return logger.error(err)
		}else{
			Article.find({_id:{$in:result[0].myColumn}},{_id:1,unionId:1,title:1,lead:1,zanNum:1,kanNum:1},function(err,result1){
	
				res.json(result1.reverse())
			}).limit(10).skip(len);

		}
	})
});


router.get('/other/:unionId',function(req,res){
	var unionId = req.params.unionId;
	User.find({unionId:unionId},{_id:0,coll:1},function(err,result){
		if(err){
			return logger.error(err)
		}else{

			Article.find({_id:{$in:result[0].coll}},{_id:1,unionId:1,nickName:1,avatarUrl:1,time:1,title:1,lead:1,zanNum:1,kanNum:1},function(err,result1){
				if(err){
					return logger.error(err);
				}
				res.json(result1.reverse());
				Article.count({_id:{$in:result[0].coll}},function(err,count){
					User.update({unionId:unionId},{$set:{collNum:count}},function(err){
						if(err){
							return logger.err(err);
						}
					})
				})
			}).limit(10)

		}
	})
});

router.get('/others/:unionId/:len',function(req,res){
	var unionId = req.params.unionId;
	var len = req.params.len;
	len = parseInt(len);

	User.find({unionId:unionId},{_id:0,coll:1},function(err,result){
		if(err){
			return logger.error(err)
		}else{
			Article.find({_id:{$in:result[0].coll}},{_id:1,unionId:1,nickName:1,avatarUrl:1,time:1,title:1,lead:1,zanNum:1,kanNum:1},function(err,result1){
				if(err){
					return logger.error(err);
				}
				res.json(result1.reverse())
			}).limit(10).skip(len)

		}
	})
});

//我关注的

router.get('/ifollowta/:unionId',function(req,res){
	var unionId = req.params.unionId;
	User.findOne({unionId:unionId},{_id:0,followColumn:1},function(err,result){
		if(err){
			return logger.error(err)
		}else{
			Column.find({_id:{$in:result.followColumn}},{_id:1,unionId:1,company:1,loanImg:1,loanName:1},function(err,result1){
				if(err){
					return logger.error(err);
				}
				return res.json(result1.reverse())
			}).limit(30)

		}
	})
});

router.get('/ifollowtas/:unionId/:len',function(req,res){
	var unionId = req.params.unionId;
	var len = req.params.len;
	len = parseInt(len);
	User.findOne({unionId:unionId},{_id:0,followColumn:1},function(err,result){
		if(err){
			return logger.error(err)
		}else{
			Column.find({_id:{$in:result.followColumn}},{_id:1,unionId:1,company:1,loanImg:1,loanName:1},function(err,result1){
				if(err){
					return logger.error(err);
				}
				res.json(result1.reverse())
			}).limit(30).skip(len)

		}
	})
});

//关注我的

router.get('/followme/:unionId',function(req,res){
	var unionId = req.params.unionId;
	User.find({unionId:unionId},{_id:0,followed:1},function(err,result){
		if(err){
			return logger.error(err)
		}else{
			User.find({unionId:{$in:result[0].followed}},{_id:1,unionId:1,nickName:1,avatarUrl:1,loanName:1},function(err,result1){
				if(err){
					return logger.error(err);
				}
				res.json(result1.reverse())
			}).limit(30)

		}
	})
});

router.get('/followmes/:unionId/:len',function(req,res){
	var unionId = req.params.unionId;
	var len = req.params.len;
	len = parseInt(len);
	User.find({unionId:unionId},{_id:0,followed:1},function(err,result){
		if(err){
			return logger.error(err)
		}else{
			User.find({unionId:{$in:result[0].followed}},{_id:1,unionId:1,nickName:1,avatarUrl:1,loanName:1},function(err,result1){
				if(err){
					return logger.error(err);
				}
				res.json(result1.reverse())
			}).limit(30).skip(len)

		}
	})
});




module.exports = router;