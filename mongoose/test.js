var mongoose = require('./connect');

var Schema = mongoose.Schema;

var mainSchema = new Schema({
	'name':String,
	'age':Number,
	'tall':Number,
})

// var cSchema = new Schema({
// 	'unionId':String,
// 	'container':[String]
// })

var Main = mongoose.model('main',mainSchema);

// var C = mongoose.model('c',cSchema);

// var r = Math.random();

// var c = new C({
// 	'unionId':'abckd',
// 	'container':[]
// })

// c.save(function(err){
// 	if(err){console.log(err)};
// })

var main = new Main({
	'name':'yjx',
	'age':222,
	'tall':2302,
});



main.save(function(err){
	console.log(main._id)
})


// C.find({'unionId':'abckd'},{'container':1,'_id':0},function(err,result){
// 	var res1 = result[0].container;
// 	Main.find({'_id':{'$in':res1}},function(err,result1){
// 		console.log(result1)
// 	})
// })
