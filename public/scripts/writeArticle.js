    //实例化编辑器
$(document).ready(function(){
    var imgUrl =[];

    var E = window.wangEditor;
    var editor = new E('#editor');
    // 允许上传到七牛云存储
    editor.customConfig.qiniu = true;
    editor.customConfig.pasteFilterStyle = true;
    editor.customConfig.pasteIgnoreImg=true;
    editor.customConfig.colors = ['#000000','#2c90e0','#ff5545','#c9c1bb','#0052ff'];
    editor.customConfig.pasteTextHandle=function(content){
        return cleanAndPaste(content)
    }
    editor.customConfig.menus =[
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        // 'backColor',  // 背景颜色
        // 'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        // 'emoticon',  // 表情
        'image',  // 插入图片
        // 'table',  // 表格
        'undo',  // 撤销
        'redo'  // 重复
    ];
    editor.create();

    uploadInit()

    function uploadInit(){
        // 获取相关 DOM 节点的 ID
        var btnId = editor.imgMenuId;
        var containerId = editor.toolbarElemId;
        var textElemId = editor.textElemId;
        // 创建上传对象
        var uploader = Qiniu.uploader({
            runtimes: 'html5,flash,html4',    //上传模式,依次退化
            browse_button: btnId,       //上传选择的点选按钮，**必需**
            uptoken_url: '/uptoken',
            domain:'http://up.xiaohongxian.com/',
            container: containerId,           //上传区域DOM ID，默认是browser_button的父元素，
            flash_swf_url: './Moxie.swf',  //引入flash,相对路径
            filters: {
                mime_types: [
                  //只允许上传图片文件 （注意，extensions中，逗号后面不要加空格）
                  { title: "图片文件", extensions: "jpg,gif,png,bmp" }
                ],
                max_file_size: '2048kb',           //最大文件体积限制
                prevent_duplicates:true  //不允许选区重复的图片
            },
            max_retries: 3,                   //上传失败最大重试次数
            dragdrop: true,                   //开启可拖曳上传
            drop_element: textElemId,        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
            multi_selection:false,
            chunk_size: '4mb',                //分块上传时，每片的体积
            resize:{crop:false,quality: 60,preserve_headers:false},
            auto_start: true,             //选择文件后自动上传，若关闭需要自己绑定事件触发上传
            unique_names:true,
 
            init: {
                'FilesAdded': function(up, files) {
                    plupload.each(files, function(file) {
                        // 文件添加进队列后,处理相关的事情
                        printLog('on FilesAdded');
                    });
                },
                'BeforeUpload': function(up, file) {
                    // 每个文件上传前,处理相关的事情
                    printLog('on BeforeUpload');
                },
                'UploadProgress': function(up, file) {
                    // 显示进度
                    $('#progress-bar').css({'width':file.percent+'vw'}).text('上传进度'+file.percent+'%')
                    if(file.percent===100){
                        $('#progress-bar').text('上传完成')
                    }
                },
                'FileUploaded': function(up, file, info) {
                    // 每个文件上传成功后,处理相关的事情
                    // 其中 info 是文件上传成功后，服务端返回的json，形式如
                    // {
                    //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                    //    "key": "gogopher.jpg"
                    //  }
                    printLog(info);
                    // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
                    
                    var domain = up.getOption('domain');
                    var res = $.parseJSON(info);
                    var sourceLink = domain + res.key; //获取上传成功后的文件的Url
                    imgUrl.push(res.key);

                    printLog(sourceLink);

                    // 插入图片到editor
                    editor.cmd.do('insertHtml', '<img src="' + sourceLink + '" style="max-width:100%;"/>')
                },
                'Error': function(up, err, errTip) {
                    //上传出错时,处理相关的事情
                    if(err.file.size>2097152){
                        $('.remind-kit').text('图片过大，不超过2MB');
                    }else{
                        $('.remind-kit').text('图片上传出错啦');
                    }
                    // console.log(err)
                    
                    printLog('on Error');
                },
                'UploadComplete': function() {
                    $('.remind-kit').text('');
                    setTimeout(function(){
                        $('#progress-bar').animate({'width':'0vw'},'slow')
                    },2000);
                    
                    //队列文件处理完毕后,处理相关的事情
                    printLog('on UploadComplete');
                }
                // Key 函数如果有需要自行配置，无特殊需要请注释
                // ,
                // 'Key': function(up, file) {
                //     // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                //     // 该配置必须要在 unique_names: false , save_key: false 时才生效
                //     var key = "";
                //     // do something with key here
                //     return key
                // }
            }
            // domain 为七牛空间（bucket)对应的域名，选择某个空间后，可通过"空间设置->基本设置->域名设置"查看获取
            // uploader 为一个plupload对象，继承了所有plupload的方法，参考http://plupload.com/docs


        })
    }
    // 封装 console.log 函数
    function printLog(title, info) {
        window.console && console.log(title, info);
    }

    $('.w-e-text-container').attr('style','min-height:400px;');
    $('.w-e-toolbar').css({'background-color':'rgba(255,255,255,0.9)','border':'none'});
    $('.w-e-toolbar').css({
        'display':'flex',
        'flex-direction':'row',
        'justify-content':'space-between'

    });
    $('.w-e-toolbar').css({'border-top':'1px solid #eee','border-bottom':'1px solid #eee'});
    $(window).scroll(function(e){
        var d = $(window).scrollTop();
        if(d>206){
            $('.w-e-toolbar').css({'position':'fixed','top':'52px','z-index':20000,'width':630})
            $('.w-e-panel-container').css({'position':'fixed','top':'85px'})
        }else{
            $('.w-e-toolbar').css({'position':'relative','top':'0'})
            $('.w-e-panel-container').css({'position':'relative','top':'0'})
        }
    })

    $('.w-e-icon-image').click(function(e){
        $('.w-e-panel-container').css({'position':'fixed','top':'248px',})
    })
    $('#editor-button').click(function(e){
        var titles = $('#editor-input').val().replace(/\s/ig,'');
        var lead = $('#pre').val().replace(/\s/ig,'');
        var contents = editor.txt.html();
        var columnId=$('#editor-button span').attr('id');
        var data = {titles:titles,lead:lead,contents:contents,imgUrl:imgUrl,columnId:columnId};


        if(titles.length<5){
            $('.remind-kit').text('标题太短');
            return ;
        }else if(lead.length<20){
            $('.remind-kit').text('引导语太短');
            return;
        }else if(contents.length<100){
            $('.remind-kit').text('正文内容太少');
            return;
        }else{
            $.post('/article',data,function(result,status){
                $('.remind-kit').text(result.message);
                $('#editor-input').val('');
                $('#pre').val('');
                return editor.txt.clear();
            })   
        }
    })

});

