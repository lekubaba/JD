

//----when the view of navigation is less than 856px, a button that ids name is btn-menu will be appear
//----when we click the button,a hidden side will be appear----
$(document).ready(function(){
	$(".btn-menu").click(function(){
		$(".side").addClass("active");
	});
});

//-----when we click the close-cion, the side will be appear for left side---
$(document).ready(function(){
	$(".btn-side-close").click(function(){
		$(".side").removeClass("active");
	});
});

//---the side of webapp have four item ,when click one by one, that style will be changed--
$(document).ready(function(){
	$(".item").click(function(){
		if($(this).attr("id")=="menu-item-jiekuan"){

			$(this).addClass("active");
			$(this).siblings(".item").removeClass("active");
			$(".side").removeClass("active");
		}else{

			$(this).addClass("active");
			$(this).siblings(".item").removeClass("active");
			$(".side").removeClass("active");
			$("#menu-item-jiekuan").find(".item-subs").remove();

		}
	});

});
//-----------------------------------------------------------
$(document).ready(function(){
	var oNav = $(".item-subs");//导航壳
	var aNav = oNav.find(".sub-item");//导航
	var aDiv = $(".content .section" );//楼层
	$(window).scroll(function(){
		var winH = $(window).height();//可视窗口高度
		var iTop = $(window).scrollTop();//鼠标滚动的距离	 
		if(iTop>=$("#header").height()){
			//鼠标滑动式改变	
			aDiv.each(function(){
			 	if(winH+iTop - $(this).offset().top>winH){
			 		aNav.removeClass('active');
			 		aNav.eq($(this).index()).addClass('active');
			 		var x = $(this).index();
					var y =x*40+"px";
					$("#nonius").css("top",y);
			 	}
			 })
		}
	})
	//点击回到当前楼层
	aNav.click(function(){
		var scroll_offset = aDiv.eq($(this).index()-1).offset();
		$("body,html").animate({scrollTop:scroll_offset.top+1+"px"},500);
	});
});


$(document).ready(function(){
	$(".router-link-exact-active").click(function(){
		$("#positioner").next().addClass("active");
		$("#positioner").next().siblings().removeClass("active");
		$("#nonius").css("top","0px");
		
	})
})


//--------------------share part---------


$(document).ready(function(){
	$(".btn-share .iconfont[data-v-d5bffaf0]").mouseover(function(){
		$(".btn-share .pop-wechat-code[data-v-d5bffaf0]").css("display","");
	});
	$(".btn-share .iconfont[data-v-d5bffaf0]").mouseout(function(){
		$(".btn-share .pop-wechat-code[data-v-d5bffaf0]").css("display","none");
	});
})


//-------------click the button of login,a small page will be appeared------

$(document).ready(function(){


	$(".data-v-account").click(function(){
		$(".mask").css("display","");
		$(".mask").load("/denglu");
		
	})


})



//--------------history handle pushState----------------

$(document).ready(function(){

　function anchorClick(link) {
	switch(link){
		case '/':
		$('.header-title-icon i').removeClass().addClass('iconfont icon-jiekuan');
		$('.header-title-text.zh').text('借款产品');
		break;
		case '/channel-content':
		$('.header-title-icon i').removeClass().addClass('iconfont icon-qudao');
		$('.header-title-text.zh').text('渠道合作');
		break;
		case '/collection':
		$('.header-title-icon i').removeClass().addClass('iconfont icon-shoucang');
		$('.header-title-text.zh').text('我的收藏');
		break;
		case '/experience':
		$('.header-title-icon i').removeClass().addClass('iconfont icon-changshibaike');
		$('.header-title-text.zh').text('最新经验');
		break;

	}


　　　　$.get('/aaaaaaaaaa'+link, function(data) {
　　　　　　 $('#load-content-file').html(data);
			if(link=="/"){
				window.location.reload();
			}
　　　　});
　　}

　$('.data-v-xxxxyyyy').on('click',function(e) {
　　　　window.history.pushState(null, null, $(this).attr('href'));
　　　　anchorClick($(this).attr('href'));
　　　　e.preventDefault();
　　});
	
  window.addEventListener('popstate', function(e) {
　　　　
//-------------click back or forword item style change----------


	switch(location.pathname){
		case '/channel-content':
		$('#menu-item-qudao').addClass('active').siblings(".item").removeClass("active");
		break;
		case '/collection':
		$('#menu-item-shoucang').addClass('active').siblings(".item").removeClass("active");
		break;	
		case '/experience':
		$('#menu-item-changshi').addClass('active').siblings(".item").removeClass("active");
		break;	
		case '/':
		$('#menu-item-jiekuan').addClass('active').siblings(".item").removeClass("active");
		break;	
	}


	anchorClick(location.pathname);	
 　　});


})

