let {User,Follow,Followed,Article,Main,Sub} = require('../../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../../utils/logger').logger;
let {formatDate} = require('../../utils/DateUtil');
var Promise = require('promise');

//目标，将请求的文章发送给用户，同时判断用户是否已经点赞文章，收藏文章，关注用户并把响应的信号发送给客户；



router.post('/requestArticle/:id',function(req,res){
	var _id = req.params.id;//需要请求的文章id
	var unionId = req.body.unionId;//请求用户自己的unionId;

	Article.update({_id:_id},{$inc:{'kanNum':1}},function(err){
		if(err) return logger.error(err);
	})

	Article.findOne({_id:_id},function(err,result){
		var authorId = result.unionId;
		var followStateCode;
		var mPraiseStateCode;
		var collectionStateCode;
		var content = result.content;

		var a = new Promise(function(resolve,reject){
			User.find({unionId:unionId,follow:authorId},{_id:0,follow:1},function(err,result1){
				if(err){
					reject(err)
				}
				if(!result1[0]){
					var code={followStateCode:false}
					resolve(code)
				}
				else if(result1[0]){
					var code={followStateCode:true}
					resolve(code)
				}
			})
		});
		var b = new Promise(function(resolve,reject){
			User.find({unionId:unionId,zanArticle:_id},{_id:0,zanArticle:1},function(err,result1){
				if(err){
					reject(err)
				}
				if(!result1[0]){
					var code={mPraiseStateCode:false}
					resolve(code)
				}
				else if(result1[0]){
					var code={mPraiseStateCode:true}
					resolve(code)
				}
			})
		});
		var c = new Promise(function(resolve,reject){
			User.find({unionId:unionId,coll:_id},{_id:0,coll:1},function(err,result1){
				if(err){
					reject(err)
				}
				if(!result1[0]){
					var code={collectionStateCode:false}
					resolve(code)
				}
				else if(result1[0]){
					var code={collectionStateCode:true}
					resolve(code)
				}
			})
		});

		var d = new Promise(function(resolve,reject){

			Article.find({_id:_id},{comment:1,_id:0},function(err,result){
				if(err){
					reject(err)
				}else{
	
					Main.find({_id:{$in:result[0].comment}},function(err,results){
						if(err){
							reject(err)
						}else{

							var mainComment = {comment:results}
							resolve(results.reverse())
						}
					})


				}
			})
		})

		var p = Promise.all([a,b,c,d]);

		p.then(function(value){
			var articleAndCode = {articles:result,article:content,stateCode:[value[0],value[1],value[2]],comment:value[3]}
			return res.json(articleAndCode)
		})


	})
});


module.exports = router;