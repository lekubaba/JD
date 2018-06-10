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
	columnList:[String],
	columnListNum:Number,
	achievement:String,
	zanArticle:[String],
	follow:[String],
	followNum:Number,
	followed:[String],
	followedNum:Number,
	followColumn:[String],
	followColumnNum:Number,
	myColumn:[String],
	myColumnNum:Number,
	coll:[String],
	collNum:Number,
	timeStamp:Number,
	isTop:Number,
	isBlackList:Boolean
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

// 添加的专栏数据模型

var columnSchema = new Schema({
	unionId:String,
	zone:String,
	loanName:String,
	nickName:String,
	loanImg:String,
	company:String,
	achievement:String,
	myColumn:[String],
	myColumnNum:Number,
	timeStamp:Number,
	isTop:Number,
	isCheck:Boolean
})



// 文章数据模型
var articleSchema = new Schema({
	unionId:String,
	columnId:String,
	nickName:String,
	avatarUrl:String,
	zone:String,
	title:String,
	lead:String,
	content:String,
	imgUrl:[String],
	time:String,
	zanNum:Number,
	kanNum:Number,
	whoZan:[String],
	commentNum:Number,
	comment:[String],
	timeStamp:Number,
	isTop:Number,
	isCheck:Boolean
});

//主评论

var mainSchema = new Schema({
	unionId:String,
	avatarUrl:String,
	nickName:String,
	content:String,
	time:String,
	zanNum:Number,
	comment:[{_id:String,unionId:String,nickName:String,content:String}],
	isTop:Number
})
//副评论

var subSchema = new Schema({
	unionId:String,
	nickName:String,
	content:String,
})


var User = mongoose.model('user',userSchema);
var Column = mongoose.model('column',columnSchema);
var Follow = mongoose.model('follow',follewSchema);
var Followed = mongoose.model('followed',follewedSchema);
var Article = mongoose.model('article',articleSchema);
var Main = mongoose.model('main',mainSchema);
var Sub = mongoose.model('sub',subSchema);


module.exports.User = User;
module.exports.Column = Column;
module.exports.Follow = Follow;
module.exports.Followed = Followed;
module.exports.Article = Article;
module.exports.Main = Main;
module.exports.Sub = Sub;