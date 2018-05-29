$(document).ready(function(){
	$('.remove-article').click(function(e){
		var _id =e.currentTarget.id;
		var url = '/remove/article/'+_id;

		var r = confirm('确认删除？')

		if(r===true){
			$.get(url,function(data,status){
			return window.location.reload();
			})
		}else{
			return 
		}		
	})

})