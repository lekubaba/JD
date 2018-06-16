let {User,Column,Message,Follow,Followed,Article,Main,Sub} = require('../../mongoose/modelSchema');
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../../utils/logger').logger;
let {formatDate} = require('../../utils/DateUtil');
var Forbidden = require('../../utils/Forbidden');
var message = require('../../message');



//登陆小红线后端

router.get('/xiaohong/backend/admin',function(req,res){
	res.render('admin/admin');
})



// 登陆后台 post 请求重定向到后台首页；

router.post('/xiaohong/home',function(req,res){

	if(req.signedCookies.mycookies){

		if(req.body.username=='chengfabiao'&&req.body.password=='cfb@123456'){

			if(req.signedCookies.managerCookies){
				res.redirect('/xiaohong/home');
			}else{
				res.cookie('managerCookies',{name:req.body.username},{signed:true,maxAge:60000*1000,path:'/'});
				res.redirect('/xiaohong/home');
			}

		}else{
			res.render('admin/admin',{errors:'账号或者密码不正确'});
		}		

	}else{
		return res.redirect('/');
	}

})

// 发出get请求；


router.get('/xiaohong/home',function(req,res){
	if(req.signedCookies.mycookies){
		if(req.signedCookies.managerCookies){
			res.render('admin/xiaohong',{avatarUrl:req.signedCookies.mycookies.avatarUrl});

		}else{
			return res.redirect('/');		
		}

	}else{
		res.redirect('/');
	}
})






router.get('/xiaohong/content/:listId',function(req,res){

	if(req.signedCookies.mycookies){

		var listId = req.params.listId;

		if(listId==='articlecheck'){

			Article.find({isCheck:'no'},{_id:1,nickName:1,avatarUrl:1,time:1,title:1,lead:1,zanNum:1,kanNum:1},function(err,ret){
				res.render('admin/checkA',{ret:ret,avatarUrl:req.signedCookies.mycookies.avatarUrl});
			})
		}else if(listId==='columncheck'){

			Column.find({isCheck:'no'},{_id:1,loanName:1,company:1,loanImg:1,zone:1},function(err,ret){
				res.render('admin/checkC',{ret:ret,avatarUrl:req.signedCookies.mycookies.avatarUrl});
			})
		}else{
			res.send('功能正在开发中...')
		}

	}else{
		res.redirect('/');
	}



})



router.get('/aaaaaa/xiaohong/content/:listId',function(req,res){

	if(req.signedCookies.mycookies){
		var listId = req.params.listId;

		if(listId==='articlecheck'){

			Article.find({isCheck:'no'},{_id:1,nickName:1,avatarUrl:1,time:1,title:1,lead:1,zanNum:1,kanNum:1},function(err,ret){
				res.render('admin/files/articleCheck',{ret:ret});
			})
		}else if(listId==='columncheck'){

			Column.find({isCheck:'no'},{_id:1,loanName:1,company:1,loanImg:1,zone:1},function(err,ret){
				res.render('admin/files/columnCheck',{ret:ret});
			})
		}else{
			res.send('功能正在开发中...')
		}

	}else{
		res.redirect('/');
	}	

})




router.get('/article/check/:_id',function(req,res){
	if(req.signedCookies.mycookies){
		var _id = req.params._id;
		Article.findOne({_id:_id},{nickName:1,avatarUrl:1,title:1,content:1,time:1},function(err,ret){
			if(err){
				return logger.error(err);
			}else{
				return res.render('admin/seeArticle',{ret:ret});
			}
		})

	}else{
		res.redirect('/');
	}		
})

router.get('/xiaohong/seeColumn/:_id',function(req,res){
	if(req.signedCookies.mycookies){
		var _id = req.params._id;
		Column.findOne({_id:_id},{unionId:1},function(err,ret){
			if(err){
				return logger.error(err);
			}else{
				User.findOne({unionId:ret.unionId},{columnList:1},function(err,ret1){
					if(err){
						return logger.error(err);
					}else{
						Column.find({_id:{$in:ret1.columnList}},{_id:1,loanName:1,company:1,loanImg:1,zone:1},function(err,ret2){
							if(err){
								return logger.error(err);
							}else{
								return res.render('admin/seeColumn',{ret:ret2,avatarUrl:req.signedCookies.mycookies.avatarUrl});
							}
						})
					}
				})


			}
		})

	}else{
		res.redirect('/');
	}		
})


router.get('/xiaohong/checkcolumn/:_id',function(req,res){
	if(req.signedCookies.mycookies){
		var _id = req.params._id;
		Column.update({_id:_id},{$set:{isCheck:'fail'}},function(err){
			if(err){
				return logger.error(err);
			}else{

				Column.findOne({_id:_id},{unionId:1,loanName:1,company:1},function(err,ret3){
					if(err){
						return logger.error(err);
					}else{

						var message = new Message({
								unionId:ret3.unionId,
								title:'专栏：" '+ret3.loanName+'" 审核结果通知：',
								content:'专栏"'+ret3.loanName+'" 审核失败，请仔细浏览专栏申请条件，删除后重新申请；',
								time:formatDate('yyyy-MM-dd'),
								timeStamp:Date.now(),
								isRead:false
						})

						message.save(function(err){
							if(err){
								return logger.error(err);
							}else{
								return res.send('fail');
							}
						})


					}
				})
				
			}
		})

	}else{
		res.redirect('/');
	}		
})

router.get('/xiaohong/checkcolumnS/:_id',function(req,res){
	if(req.signedCookies.mycookies){
		var _id = req.params._id;
		Column.update({_id:_id},{$set:{isCheck:'success'}},function(err){
			if(err){
				return logger.error(err);
			}else{


				Column.findOne({_id:_id},{unionId:1,loanName:1,company:1},function(err,ret3){
					if(err){
						return logger.error(err);
					}else{

						var message = new Message({
								unionId:ret3.unionId,
								title:'专栏：" '+ret3.loanName+'" 审核结果通知：',
								content:'专栏"'+ret3.loanName+'" 审核通过，可以为专栏创建文章啦；',
								time:formatDate('yyyy-MM-dd'),
								timeStamp:Date.now(),
								isRead:false
						})

						message.save(function(err){
							if(err){
								return logger.error(err);
							}else{
								return res.send('success');
							}
						})


					}
				})
				
			}
		})

	}else{
		res.redirect('/');
	}		
})





router.get('/xiaohong/checkarticle/:_id',function(req,res){
	if(req.signedCookies.mycookies){
		var _id = req.params._id;
		Article.update({_id:_id},{$set:{isCheck:'fail'}},function(err){
			if(err){
				return logger.error(err);
			}else{
				res.send('fail');
			}
		})

	}else{
		res.redirect('/');
	}		
})

router.get('/xiaohong/checkarticleS/:_id',function(req,res){
	if(req.signedCookies.mycookies){
		var _id = req.params._id;
		Article.update({_id:_id},{$set:{isCheck:'success'}},function(err){
			if(err){
				return logger.error(err);
			}else{
				res.send('success');
			}
		})

	}else{
		res.redirect('/');
	}		
})










module.exports =  router;