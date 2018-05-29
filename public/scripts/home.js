$(document).ready(function(){
	var appId='wxf4754d57d42fee70';
	var AppSecret ='7ee0d9ca73ec7fef8ff38858b4bf3c2b';
	var REDIRECT_URI= 'http%3a%2f%2fwww.xiaohongxian.com';
	var ran = Math.random()*1000000000000000000;
	var obj = new WxLogin({
		self_redirect:false,
		id:"login_container", 
		appid: appId, 
		scope: "snsapi_login", 
		redirect_uri:REDIRECT_URI,
		state: ran,
		style: "black",
		href: ""
	});

	function getSearchString(key) {
		// 获取URL中?之后的字符
		var str = location.search;
		str = str.substring(1,str.length);

		// 以&分隔字符串，获得类似name=xiaoli这样的元素数组
		var arr = str.split("&");
		var obj = new Object();

		// 将每一个数组元素以=分隔并赋给obj对象    
		for(var i = 0; i < arr.length; i++) {
		var tmp_arr = arr[i].split("=");
		obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
		}
		return obj[key];
	}

	var code =getSearchString('code');
	if(!code){
		return
	}
	if(code){
		console.log(code)
		var url = '/code/'+code;
		$.get(url,function(data,status){
			if(data.isColumn===false){
				return window.location.href='column'
			}
			if(data.isColumn===true){
				return window.location.href='write'
			}
		})
	}

	
})