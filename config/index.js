var env = process.env.NODE_ENV;

if(env==="development"){
	module.exports = {paths:"http://127.0.0.1:8081/"};
}else if(env==="production"){
	module.exports = {paths:"https://www.xiaohongxian.com/"};
}