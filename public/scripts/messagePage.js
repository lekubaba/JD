$(document).ready(function(){

	$('.content-message-list').click(function(e){
		var that =this;

		var messageId = $(this).attr('id');
		$.get('/isread/'+messageId,function(data,status){

			$(that).find('.content-message-list-b').css({'display':''})
			
		})


	})





})