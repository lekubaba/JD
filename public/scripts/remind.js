$(document).ready(function(){
    $('.success-b').click(function(e){
        $.get('/write',function(result,status){
            window.location.href='write';
        })
    })
})