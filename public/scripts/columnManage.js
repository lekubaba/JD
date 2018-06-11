$(document).ready(function(){

	$('.nav-user-lists')
		.mouseover(function(e){
			$(this).find('.column-remove').css({'display':''});
		})
		.mouseout(function(e){
			$(this).find('.column-remove').css({'display':'none'});
		})


	$('.nav-user-list-s').click(function(e){
		var loanName = $(this).find('.nav-user-fontsize').text();
		var _id = $(this).parent().attr('id');
		$(".content-list").remove();

		$("#not-enough").remove();

		$.get('/columns/articles/'+_id,function(da,status){
			$('.content-content').last().append(da)
			var index = $('.content-list').last().index();
			if(index>0){
				$('.nav-sub-itemss').eq(0).text(loanName)
				$('.nav-sub-itemss').eq(1).text('（'+index+'）')
			}else{
				$('.nav-sub-itemss').eq(0).text(loanName)
				$('.nav-sub-itemss').eq(1).text('（0）')
			}
		})	

	})

	$('.nav-user-lists .nav-sub-changes').click(function(e){
		var _id = $(this).parent().attr('id');
		$.get('/remove/column/'+_id,function(datas,status){
			if(datas==='no'){
				$('.mask').css({'display':''})
				$(".mask").load("/notRemoveColumn");
			}else{
				$('.mask').css({'display':''})
				$(".mask").load("/removeColumnSuccess");
			}
		})

	})



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
				$.get('/columns/'+index,function(da,status){
					return $('.content-content').last().append(da)
				})		
			}else{
				return ;
			}

				
		} 

	}




















})