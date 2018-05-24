$(document).ready(function(){
    
    (function(){  
        var pHtmlStr = '';  
        for(var name in pc){  
            pHtmlStr = pHtmlStr + '<option>'+name+'</option>';  
        }  
        $("#province").html(pHtmlStr);  
        $("#province").change(function(){  
            var pname = $("#province option:selected").text();           
            var pHtmlStr = '';  
            var cityList = pc[pname];  
            for(var index in cityList){  
                pHtmlStr = pHtmlStr + '<option>'+cityList[index]+'</option>';  
            }  
            $("#city").html(pHtmlStr);
            
        });  
        $("#province").change()
    })();


	$('.column-buttons').click(function(e){
		var company = $('#company').val().replace(/\s/ig,'');
		var loanName= $('#loanName').val().replace(/\s/ig,'');
		var zone = $("#city option:selected").text().split('市')[0];
		var introduce = $('#introduce').val().replace(/\s/ig,'');
        var data = {company:company,loanName:loanName,zone:zone,introduce:introduce}
        if(company.length<3){
            return $('#company').val('名称不全').css({'color':'#ff5545'})
        }else if(loanName.length<2){
            return $('#loanName').val('名称不全').css({'color':'#ff5545'})
        }else if(zone==='城'){
            return $('#zone').text('请选择城市').css({'color':'#ff5545'})
        }else if(introduce.length<10){
            return $('#introduce').val('需要超过20个字符').css({'color':'#ff5545'})
        }else{
            $.post('/writetool',data,function(result,status){
                return window.location.href='success';
            });
        }
    })

});