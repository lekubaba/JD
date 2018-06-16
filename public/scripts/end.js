$(document).ready(function(){



　$('.xiaohong-list').on('click',function(e) {

		$(this).siblings().removeClass('active');
		$(this).addClass('active');
　　　　window.history.pushState(null, null, $(this).attr('href'));
　　　　anchorClick($(this).attr('href'));
　　　　e.preventDefault();
　　});

　function anchorClick(link) {
　　　　$.get('/aaaaaa'+link, function(data) {
　　　　　　 $('.xhx-c-c').html(data);
　　　　});
　　}

	window.addEventListener('popstate', function(e) {
　　　　
		//-------------click back or forword item style change----------


		switch(location.pathname){
			case '/xiaohong/content/articlecheck':
			$('#articlecheck').siblings().removeClass('active');
			$('#articlecheck').addClass('active');
			break;
			case '/xiaohong/content/columncheck':
			$('#columncheck').siblings().removeClass('active');
			$('#columncheck').addClass('active');
			break;	
		}


		anchorClick(location.pathname);	
	});

if(window.location.pathname==='/xiaohong/content/articlecheck'){
	$('#articlecheck').addClass('active');
}else if(window.location.pathname==='/xiaohong/content/columncheck'){
	$('#columncheck').addClass('active');
}






})