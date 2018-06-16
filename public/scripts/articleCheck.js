$(document).ready(function(){

	$('.content-list-d-a.a').click(function(e){
		var articleId = $(this).parents('.content-list').attr('href').split('/')[3]
		var r=confirm('确定不通过吗？');
		if(r===true){
			$.get('/xiaohong/checkarticle/'+articleId,function(data,status){
				window.location.reload();
				
			})

			return e.preventDefault();
			
		}else{
			return e.preventDefault();
		}		
	})

	$('.content-list-d-a.b').click(function(e){
		var articleId = $(this).parents('.content-list').attr('href').split('/')[3]
		var r=confirm('确定通过审核吗？');
		if(r===true){
			$.get('/xiaohong/checkarticleS/'+articleId,function(data,status){
				window.location.reload();

			})
			return e.preventDefault();
			
		}else{
			return e.preventDefault();
		}	
		
	})	





})