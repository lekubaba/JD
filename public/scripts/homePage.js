$(document).ready(function(){

	var color = ['#43d480','#ffcf00','#0f88eb','#5478f0']
	$('.nav-main-list')
	.mouseover(function(){
		var i=$(this).index();
		$(this).find('.nav-fontsize').css('color',color[i]);
	})
	.mouseout(function(){
		$(this).find('.nav-fontsize').css('color','#8590a6');
	})

	$(".nav-main-list").eq(0).click(function(){
		$(".mask").css("display","");
		$(".mask").load("/chooseColumn");
		
	});




//获取滚动条当前的位置 
function getScrollTop() { 
	var scrollTop = 0; 
	if (document.documentElement && document.documentElement.scrollTop) { 
		scrollTop = document.documentElement.scrollTop; 
	} else if (document.body) { 
		scrollTop = document.body.scrollTop; 
	} 
	return scrollTop; 
} 

//获取当前可是范围的高度 
function getClientHeight() { 
	var clientHeight = 0; 
	if (document.body.clientHeight && document.documentElement.clientHeight) { 
		clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight); 
	} else { 
		clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight); 
	} 
	return clientHeight; 
} 

//获取文档完整的高度 
function getScrollHeight() { 
	return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight); 
} 

window.onscroll = function () { 

	if (getScrollTop() + getClientHeight() === getScrollHeight()) { 

		var index = $('.content-list').last().index();

		var d =document.getElementById('not-enough')


		if(!d){
			$.get('/homes/'+index,function(da,status){
				return $('.content-content').last().append(da)
			})		
		}else{
			return ;
		}

			
	} 

}









})