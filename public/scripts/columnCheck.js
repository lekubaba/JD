$(document).ready(function(){

	$('.xhx-list-d-a.a').click(function(e){
		var columnId = $(this).parents('.xhx-c-c-list').attr('id');
		var r=confirm('确定不通过吗？');
		if(r===true){
			$.get('/xiaohong/checkcolumn/'+columnId,function(data,status){
				window.location.reload();
			})
			
		}else{
			return;
		}
	})

	$('.xhx-list-d-a.b').click(function(e){
		var columnId = $(this).parents('.xhx-c-c-list').attr('id');
		var r=confirm('确定通过审核？');
		if(r===true){
			$.get('/xiaohong/checkcolumnS/'+columnId,function(data,status){
				window.location.reload();
			})
			
		}else{
			return;
		}
	})






})