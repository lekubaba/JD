let {User,Column,Message,Follow,Followed,Article,Main,Sub} = require('../../mongoose/modelSchema')
var qiniu = require('qiniu');
var configs = require('../../config/config.js');
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../../utils/logger').logger;
let {formatDate} = require('../../utils/DateUtil');

var mac = new qiniu.auth.digest.Mac(configs.ACCESS_KEY, configs.SECRET_KEY);
var config = new qiniu.conf.Config();
//config.useHttpsDomain = true;
config.zone = qiniu.zone.Zone_z0;
var bucketManager = new qiniu.rs.BucketManager(mac, config);

router.get('/',function(req,res){
	res.render('arts/home')
})



router.get('/daikuan',function(req,res){
	res.render('front/xiaohonghome')
})


router.get('/wx-login',function(req,res){
	res.render('front/indexPage')
})



router.get('/home',function(req,res){
	if(req.signedCookies.mycookies){
		var unionId = req.signedCookies.mycookies.unionId;
		Article.find({isCheck:'success'},{_id:1,nickName:1,avatarUrl:1,time:1,zanNum:1,kanNum:1,title:1,lead:1},function(err,ret){
			if(err){
				return logger.error(err)
			}else{
				Message.count({unionId:unionId,isRead:false},function(err,count){
					if(err){
						return logger.error(err);
					}else{
						return res.render('front/homePage',{ret:ret,avatarUrl:req.signedCookies.mycookies.avatarUrl,count:count});
						
					}
				})
			}
		}).limit(8)
	}else{
		res.redirect('/');
	}
})

router.get('/homes/:len',function(req,res){
	var len = req.params.len;
	len = parseInt(len);
	if(req.signedCookies.mycookies){
		var unionId = req.signedCookies.mycookies.unionId;
		Article.find({isCheck:'success'},{_id:1,nickName:1,avatarUrl:1,time:1,zanNum:1,kanNum:1,title:1,lead:1},function(err,ret){
			if(err){
				return logger.error(err)
			}else{
				res.render('front/files/loadFile',{values:ret});
			}
		}).limit(4).skip(len)
	}else{
		res.redirect('/');
	}
})




router.get('/write/:columnId/:loanName',function(req,res){

	if(req.signedCookies.mycookies){
		var unionId = req.signedCookies.mycookies.unionId;
		var columnId = req.params.columnId;
		var loanName = req.params.loanName;
		User.findOne({unionId:unionId},{_id:0,isColumn:1,avatarUrl:1},function(err,result){
			if(err){
				return logger.error(err)
			}
			if(result.isColumn===false){
				res.redirect('/column');
			}else if(result.isColumn===true){
				res.render('front/writeArticle',{avatarUrl:result.avatarUrl,unionId:unionId,columnId:columnId,loanName});
			}
		})
	}else{
		res.redirect('/');
	}

})

router.get('/article/manage',function(req,res){

	if(req.signedCookies.mycookies){
		var unionId = req.signedCookies.mycookies.unionId;
		
		User.findOne({unionId:unionId},{_id:0,myColumn:1},function(err,result){
			if(err){
				return logger.error(err)
			}
			if(result.myColumn.length===0){
				return res.render('front/articleManage',{avatarUrl:req.signedCookies.mycookies.avatarUrl,articleList:''})
			}else{
				var _id = result.myColumn;
				Article.find({_id:{$in:_id}},{_id:1,title:1,time:1},function(err,ret){
					return res.render('front/articleManage',{avatarUrl:req.signedCookies.mycookies.avatarUrl,articleList:ret})
				})
			}
		})
	}else{
		res.redirect('/');
	}

})



router.get('/column',function(req,res){
	if(req.signedCookies.mycookies){
		var unionId = req.signedCookies.mycookies.unionId;
		User.findOne({unionId:unionId},{_id:0,isColumn:1,avatarUrl:1,columnListNum:1,isVip:1},function(err,result){
			if(err){
				return logger.error(err)
			}else{
				if(result.isVip===true){

					return res.render('front/createColumn',{avatarUrl:result.avatarUrl})
				}else if(result.columnListNum<1){
					return res.render('front/createColumn',{avatarUrl:result.avatarUrl})
				}else if(result.columnListNum===1){
					return res.render('front/onePage',{avatarUrl:result.avatarUrl})
				}

			}
	
		})
	}else{
		res.redirect('/');
	}
	
})

router.post('/addcolumn',function(req,res){

	var unionId=req.signedCookies.mycookies.unionId;

	var column = new Column({
		unionId:req.signedCookies.mycookies.unionId,
		zone:req.body.zone,
		loanName:req.body.loanName,
		nickName:req.signedCookies.mycookies.nickName,
		loanImg:req.body.loanImg,
		company:req.body.company,
		achievement:'c',
		myColumnNum:0,
		timeStamp:Date.now(),
		isTop:0,
		isCheck:'no'
	})

	column.save(function(err){
		if(err){
			return logger.error(err)
		}else{
			User.update({unionId:unionId},{$set:{isColumn:true},$addToSet:{columnList:column._id},$inc:{columnListNum:1}},function(err){
				if(err){
					return logger.error(err)
				}
				res.clearCookie();
				User.findOne({unionId:unionId},{unionId:1,avatarUrl:1,nickName:1},function(err,result){
					if(err){
						return logger.error(err)
					}else{




						var message = new Message({
								unionId:unionId,
								title:'专栏：" '+column.loanName+'" 审核中...',
								content:'专栏"'+column.loanName+'" 已经进入审核，审核结果将会发布在这里，请留意；',
								time:formatDate('yyyy-MM-dd'),
								timeStamp:Date.now(),
								isRead:false
						})


						message.save(function(err){
							if(err){
								return logger.error(err);
							}else{

								res.cookie('mycookies',{unionId:result.unionId,nickName:result.nickName,avatarUrl:result.avatarUrl},{signed:true,maxAge:6000*1000*1000,path:'/'});

								return res.redirect('/home');

								
							}
						})
					}
				})

			})
		}
	})

})




router.get('/remove/article/:_id',function(req,res){
	var _id = req.params._id;
	var columnId;
	if(req.signedCookies.mycookies){
		var unionId = req.signedCookies.mycookies.unionId;

	//-------------------------------------------------删除文章中的图片

		Article.findOne({_id:_id},{_id:0,imgUrl:1,columnId:1},function(err,ret){
			var imgs = ret.imgUrl;
			columnId = ret.columnId;
			var deleteOperations= [];
			for(var i=0;i<imgs.length;i++){
				deleteOperations.push(qiniu.rs.deleteOp('xiaohongxian', imgs[i]));
			}

			bucketManager.batch(deleteOperations, function(err, respBody, respInfo) {
			  if (err) {
					return logger.error(err)
			    //throw err;
			  } else {
			    // 200 is success, 298 is part success
			    if (parseInt(respInfo.statusCode / 100) == 2) {
			      respBody.forEach(function(item) {
			        if (item.code == 200) {
			          logger.info(item.code + "\tsuccess");
			        } else {
			          logger.info(item.code + "\t" + item.data.error);
			        }
			      });
			    } else {
			      logger.info(respInfo.deleteusCode);
			      logger.info(respBody);
			    }
			  }
			});

		})	


		//----------------------------------------------------------------------		

		Article.count({_id:_id},function(err,count){
			if(err){
				return logger.error(err)
			}else{
				if(count===0){
					return res.send('success');
				}else{

					Article.remove({_id:_id},function(err){
						if(err){
							return logger.error(err)
						}else{

							User.update({unionId:unionId},{$pull:{myColumn:_id},$inc:{myColumnNum:-1}},function(err){
								if(err){
									return logger.error(err)
								}else{
									
									Column.update({_id:columnId},{$pull:{myColumn:_id},$inc:{myColumnNum:-1}},function(err){
										if(err){
											return logger.error(err)
										}else{
											return res.send('success');
										}
									})
									
								}
							});

						}
					})

				}
			}
		})
	}else{
		res.redirect('/');
	}

})



router.get('/chooseColumn',function(req,res){
	if(req.signedCookies.mycookies){
		var unionId = req.signedCookies.mycookies.unionId;
		Column.find({unionId:unionId,isCheck:'success'},{_id:1,loanName:1},function(err,ret){
			if(err){
				return logger.error(err)
			}else{
				if(ret.length===0){
					return res.render('front/files/notColumn');
				}else{

					return res.render('front/files/forWhoWrite',{val:ret});
				}

			}
		})
		
	}else{
		return res.redirect('/');
	}
})





router.get('/miniprogram',function(req,res){
	if(req.signedCookies.mycookies){
		res.render('front/files/miniprogram')
		
	}else{
		return res.redirect('/');
	}
})






router.get('/column/manage',function(req,res){
	if(req.signedCookies.mycookies){
		var unionId = req.signedCookies.mycookies.unionId;
		
		User.findOne({unionId:unionId},{_id:0,columnList:1,myColumn:1,myColumnNum:1},function(err,result){
			if(err){
				return logger.error(err)
			}
			if(result.columnList.length===0){
				return res.render('front/columnManage',{avatarUrl:req.signedCookies.mycookies.avatarUrl,columnList:'',articleList:'',myColumnNum:0})
			}else{

				Article.find({_id:{$in:result.myColumn}},{_id:1,nickName:1,avatarUrl:1,time:1,zanNum:1,kanNum:1,title:1,lead:1},function(err,rets){

					if(err){
						return logger.error(err)
					}else{


						var _id = result.columnList;
						Column.find({_id:{$in:_id}},{_id:1,loanImg:1,company:1,loanName:1,zone:1},function(err,ret){
							return res.render('front/columnManage',{avatarUrl:req.signedCookies.mycookies.avatarUrl,columnList:ret,articleList:rets,myColumnNum:result.myColumnNum})
						})	
					}
				}).limit(6);
			}
		})
	}else{
		res.redirect('/');
	}
})

router.get('/columns/:len',function(req,res){
	var len = req.params.len;
	len = parseInt(len);
	if(req.signedCookies.mycookies){
		var unionId = req.signedCookies.mycookies.unionId;
		User.findOne({unionId:unionId},{myColumn:1},function(err,result){

			Article.find({_id:{$in:result.myColumn}},{_id:1,nickName:1,avatarUrl:1,time:1,zanNum:1,kanNum:1,title:1,lead:1},function(err,ret){
				if(err){
					return logger.error(err)
				}else{
					res.render('front/files/loadFile',{values:ret});
				}
			}).limit(4).skip(len)
			

		})

	}else{
		res.redirect('/');
	}
})

router.get('/columns/articles/:columnId',function(req,res){
	var columnId = req.params.columnId;
	if(req.signedCookies.mycookies){
		var unionId = req.signedCookies.mycookies.unionId;
		Column.findOne({_id:columnId},{myColumn:1,myColumnNum:1},function(err,result){

			Article.find({_id:{$in:result.myColumn}},{_id:1,nickName:1,avatarUrl:1,time:1,zanNum:1,kanNum:1,title:1,lead:1},function(err,ret){
				if(err){
					return logger.error(err)
				}else{
					res.render('front/files/loadFile',{values:ret});
				}
			})
			

		})

	}else{
		res.redirect('/');
	}
})


router.get('/remove/column/:columnId',function(req,res){
	var columnId = req.params.columnId;
	var loanImg;
	if(req.signedCookies.mycookies){
		var unionId = req.signedCookies.mycookies.unionId;
		Column.findOne({_id:columnId},{myColumnNum:1,loanImg:1},function(err,datas){
			if(err){
				return logger.error(err)
			}else{
				var nums = datas.myColumnNum;
				if(nums>0){
					return res.send('no');
				}else{

					User.update({unionId:unionId},{$pull:{columnList:columnId},$inc:{columnListNum:-1}},function(err){
						if(err){
							return logger.error(err)
						}else{

							//删除专栏

							Column.remove({_id:columnId},function(err){
								if(err){
									return logger.error(err)
								}else{

									//删除column loanImg

									var imgs = datas.loanImg;
									imgs = imgs.split('/');
									var deleteOperations= [];
									deleteOperations.push(qiniu.rs.deleteOp('xiaohongxian', imgs[imgs.length-1]));

									bucketManager.batch(deleteOperations, function(err, respBody, respInfo) {
									  if (err) {
											return logger.error(err)
									    //throw err;
									  }else {
									    // 200 is success, 298 is part success
									    if (parseInt(respInfo.statusCode / 100) == 2) {
									      respBody.forEach(function(item) {
									        if (item.code == 200) {
									          logger.info(item.code + "\tsuccess");
											return res.send('success');

									        }else {
									          logger.info(item.code + "\t" + item.data.error);
									          return res.send('success');
									        }
									      });
									    }else {
											logger.info(respInfo.deleteusCode);
											logger.info(respBody);
									    }
									  }
									});

								}
							})

						}

					})

				}	
			}
		})


	}else{
		res.redirect('/');
	}
})


router.get('/notRemoveColumn',function(req,res){
	if(req.signedCookies.mycookies){
		return res.render('front/files/notRemoveColumn')
		
	}else{
		return res.redirect('/');
	}
})


router.get('/removeColumnSuccess',function(req,res){
	if(req.signedCookies.mycookies){
		return res.render('front/files/removeColumnSuccess')
		
	}else{
		return res.redirect('/');
	}
})




router.get('/see/message',function(req,res){
	if(req.signedCookies.mycookies){
		var unionId = req.signedCookies.mycookies.unionId;
		Message.find({unionId:unionId},function(err,ret4){

			return res.render('front/messagePage',{ret:ret4,avatarUrl:req.signedCookies.mycookies.avatarUrl})	

			
		})
		
	}else{
		return res.redirect('/');
	}
})



router.get('/isread/:messageId',function(req,res){

	if(req.signedCookies.mycookies){
		var unionId = req.signedCookies.mycookies.unionId;
		var messageId = req.params.messageId;
		Message.update({_id:messageId},{$set:{isRead:true}},function(err){
			if(err){
				return logger.error(err);
			}else{
				return res.send('readtrue');
			}
		})
		
	}else{
		return res.redirect('/');
	}
})










module.exports = router;