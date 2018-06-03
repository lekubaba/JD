var mongoose = require('./connect.js');

var Schema = mongoose.Schema;

//用户数据模型

var userSchema = new Schema({
	unionId:String,
	nickName:String,
	avatarUrl:String,
	gender:Number,
	zone:String,
	number:String,
	city:String,
	loanName:String,
	company:String,
	isVip:Boolean,
	introduce:String,
	isColumn:Boolean,
	achievement:String,
	zanArticle:[String],
	follow:[String],
	followNum:Number,
	followed:[String],
	followedNum:Number,
	myColumn:[String],
	myColumnNum:Number,
	coll:[String],
	collNum:Number,
	timeStamp:Number,
	isTop:Number
});


//我关注的人数据模型

var follewSchema = new Schema({
	unionId:String,
	nickName:String,
	avatarUrl:String,
	loanName:String	
})


//关注我的人数据模型

var follewedSchema = new Schema({
	unionId:String,
	nickName:String,
	avatarUrl:String,
	loanName:String	
})



// 文章数据模型
var articleSchema = new Schema({
	unionId:String,
	nickName:String,
	avatarUrl:String,
	zone:String,
	title:String,
	lead:String,
	content:String,
	time:String,
	zanNum:Number,
	kanNum:Number,
	whoZan:[String],
	commentNum:Number,
	comment:[String],
	timeStamp:Number,
	isTop:Number
});

//主评论

var mainSchema = new Schema({
	unionId:String,
	avatarUrl:String,
	nickName:String,
	content:String,
	time:String,
	zanNum:Number,
	comment:[{_id:String,unionId:String,nickName:String,content:String}]	
})
//副评论

var subSchema = new Schema({
	unionId:String,
	nickName:String,
	content:String,
})


var User = mongoose.model('user',userSchema);
var Follow = mongoose.model('follow',follewSchema);
var Followed = mongoose.model('followed',follewedSchema);
var Article = mongoose.model('article',articleSchema);
var Main = mongoose.model('main',mainSchema);
var Sub = mongoose.model('sub',subSchema);


module.exports.User = User;
module.exports.Follow = Follow;
module.exports.Followed = Followed;
module.exports.Article = Article;
module.exports.Main = Main;
module.exports.Sub = Sub;