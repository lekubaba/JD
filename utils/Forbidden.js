var Forbidden = {

    forbiddenFun:function(content) {
        for (var i = 0; i < this.forbiddenArr.length; i++) {
            var r = new RegExp(this.forbiddenArr[i], "ig");
            content = content.replace(r, "**");
        }
        return content;
    },

    forbiddenArr : [
        "代孕","从独裁到民主","法L","法轮功","茉莉花革命","茉-莉-花 革命","诺贝尔和平奖","示威","台湾轮盘","游行",
        "77元房客","钓鱼岛事件","反日游行","月租77元","中国太子党","撞船事件","曾庆红","贺!国强","胡锦涛","回!良玉",
        "锦涛","毛泽东","王!岐山","温家宝","温家室","习!近平","17个情妇","乐清上访村长","钱云会案","燃气公司两名高官",
        "中国燃气","办理警察证","办证","办-证","办&证","出售2011年考研答案","代考","考试答案","枪手","身份证复印件生成器",
        "身份证号码生成器","身份证生成器","售考前答案","替考","助考","助◆考","电棍","电击棍","电警棒","防身用品","仿真枪",
        "仿真槍","弓弩","警棒","手拷","手铐","翻（HX）墙","翻墙","火凤凰","凸墙","无界","无界浏览器","逍遥游","自由门",
        "GHB水","K 粉","K粉","阿普唑仑","安定片","安眠药","安眠藥","白冰","苯基丙酮","冰毒","冰 毒","冰糖","春药",
        "催情药","胡椒基丙酮","胡椒醛","化工原料","化学冰","黄冰","甲基苯丙胺","甲醚高锰酸钾","麻古","麻黄碱","麻黄素",
        "迷幻药","迷魂？","迷魂药","迷魂藥","缅古","缅果","曲马多","三唑仑","三唑侖","硝甲西泮","牙签","牙、签",
        "盐酸氯胺酮","盐酸羟亚胺","摇头丸","乙醚","乙烯甲醇","植物冰","左旋麻黄素","AV女优","AV片","III级片",
        "成人电影","成人電影","成人社區","成人网站","成人小说","成人影院","成人用品","黄色电影","黄色小说",
        "激情短片","激情視頻","激情视频","激情图片","寂寞少妇","口交","伦理片","裸照","迷歼药","免费a片",
        "免费电影","人体写真","人体艺术","肉棒","肉棍","色情自拍","上门按摩","偷拍","小姐上门","性爱文学","性交",
        "一夜交友网","一夜情交友","淫蕩少婦","诱惑视频","找小姐","54式手枪","54手枪","54手槍","5.5MM狗粮",
        "64式手枪","77式手枪","AK四柒","电狗","钢珠枪","狗粮4.5mm","火药制作","獵槍","麻醉枪","麻醉/枪","麻醉槍",
        "美国秃鹰","气枪","气槍","汽狗","手木仑","手枪","手槍","销售气@枪","销售气@槍","销售手@枪","销售手@槍",
        "小口径","炸药","真枪","1元硬币","S F传奇","SF 传奇","出售银行卡","代开发票","發票","风云私服","黑车","假币",
        "假钞","假钱","手机卡复制器","私服","套牌车","外挂","一元硬币","指纹膜","走私车","跟踪定位器","监听王",
        "考试作弊器","窃听","窃听器","手机监听定位器","手机切听器","透视镜","隐型耳机","针孔","指纹套","赌博机","赌球",
        "合彩开 奖","老虎机","六合彩","六和彩","小口径枪","境外电视网络设备","三甲医院","公立医院","肿瘤","性病",
        "无痛人流","淋病","梅毒","生物诊疗","生物免疫疗法","fx气皇","gamo竞技之王","秃鹰膛线管","秃鹰狗",
        "工字牌QB19","秃鹰汽长狗","仿真长狗","短狗","特级运动长弹","花山N306","M4A1","柯尔特1911","狗配件",
        "大口径PCP","瓦尔特统治者","L新型火箭","金钟汽枪","金钟气狗","秃鹰图纸","瑞典fx","猎枪弹","秃鹰配件",
        "西德ks316","654K气枪","92式手狗","77式手狗","77式手枪","654k手枪","45MM铅弹","45MM狗粮","三角牌气枪",
        "汽手狗","54式手枪","手拉狙","柯尔特m1911","海豹M9","进口气狗","运动枪","韩国叛逆者","秃鹰枪","气动短狗",
        "pcp屠龙手","雄鹰M008","秃鹰全套","巴雷特","雷鸣顿","铅弹狗","射钉狗","AR6","德国colt","毛瑟c96","CP99",
        "工字牌lqb31","ED50","XM109","工字牌qb34","工字b33","猎狗粮","狙击之王M300","德瓦管","手拉98K",
        "EvanixRainstorm暴雨","EvanixWindyCity风城","雄鹰SVD","工字侧拉折叠式QB","夜莺cp99版","德版cp88",
        "汤普森M1928","瓦尔特cp99","钢珠狗","92式手枪","铅弹枪","左轮手枪","汽短狗","汽长狗","雷明顿猎枪","台秃",
        "土制猎枪","狙击狗","中握秃鹰","上海工字气狗","骚本气枪","国秃","雷鸣七连发","英国B9-10","ar6猎人王",
        "台湾火箭秃","峨眉牌立式12号","健卫步枪","秃鹰汽枪","高压步枪","高压打鸟枪","自制手枪","金属枪模","金属仿真枪",
        "雷鸣登汽枪","雷鸣登猎枪","汽枪消声器","猎枪配件","单管猎枪","上海工字汽狗","锡锋牌气枪","骚本套件","汽枪配件",
        "气狗狗粮","上海工字气枪","气枪枪管","高压鸟枪","气枪瞄准镜","汽狗铅弹","气枪子弹","猎枪铅弹","骚本","气抢",
        "五连发","温切斯特气枪","气枪铅弹","洛克KJ900","fx季候风","5.5母鸡模具","BB狗","锡锋牌b51","CP99夜鹰版",
        "gamo","工字牌XS","汽狗","气皇","短秃","铅弹","CO2狗","消音器","qb78","瓦尔特","花山fk77","气弹枪","火狗",
        "pcp秃鹰","92式手木仓","64式手木仓","64式气木仓","狗管","54式手木仓","汽狗配件","美秃套件","英国b50",
        "gamo枪","b50套件","54木仓","美制勃朗宁","工字QB6","工字管","wg702左轮","温切斯特800x","金钟1911",
        "金钟m92","b50","槽化枪管","俄罗斯mp","枪托","M92FS","狙击步狗","CFX气枪","pcp汽枪","pcp气枪","气狗配件",
        "一比一枪模","手狗配件","三箭气枪","手拉狗","英国骚本","短枪","改装发令枪","发射药","金弓m4","伯莱塔","德版PPK",
        "军用枪支","钢珠弹","秃鹰套件","五四式手枪","汽枪铅弹","枪支配件","气狗","仿真电狗","美秃图纸","手枪","猎枪",
        "警用枪支","汽步枪","平式枪","打鸟枪","打鸟汽枪","电击枪","来复枪","枪械","改装射钉枪","热兵器","双筒猎枪",
        "微型冲锋枪","微声手枪","无声手枪","气gou","步枪","气步枪","仿真枪","军用手枪","麻醉枪","狙击枪","火枪","火药枪",
        "真枪","枪","长枪","双管猎枪","运动步枪","打鸟气枪","仿真气枪","枪模","制式手枪","瓦斯枪","冲锋枪","微冲","气枪",
        "12号猎枪","锡锋牌B8","pcp新贵","12号弹壳","ed50套件","r32","双鹰M50","工字汽枪","温彻斯特1000x",
        "本杰明392","华特霸者","德国夜鹰","无声猫","瓦尔特统治者5.5","金弓电狗","M300狙击","64式","仿真钢弹枪",
        "工字QB","快排打气筒","锦江b58","山猫pcp","左轮手狗","左轮枪","三棱军刺","三箭牌汽枪","高压汽枪","峨眉气枪",
        "汽步狗","气狗子弹","PCP汽狗","猎枪弹壳","韩国AR6猎人王","88式狙击","霰弹枪","工字牌lqb19","金弓hk416",
        "迷彩秃鹰","燕尾套件","秃鹰握把","fx叛逆者","雄鹰m007","广州三箭牌","火药钢珠枪","动力手枪","锡峰b8",
        "钢珠汽枪","MP654K","中握SB-50","m99狙击","gamoCFX","FXtyphoon台风","德国台风汽枪","工字lqb18",
        "瓦尔特夜鹰","工字牌lqb4","工字牌qb51","gamo610","温彻斯特1000","hd50中握","工字牌ss2","m9","花山n306",
        "蟒蛇586六寸","泰瑟枪","fxt12耳语","本杰明掠夺者","五四式手狗","俄版654k","花山fs99","超级雷克","手拉长狗",
        "华山道具","温切斯特1100x","西班牙cfx","PCZ山猪","进口手狗","单管猎狗","77军用手狗","仿真汽枪","底火",
        "西班牙gamo","fx革命者","气皇400","QB89","工字牌qb88","工字牌qb57","gamo640","弹夹","台湾加强版BabyHi",
        "工字牌lar","92F","金钟m700","ak47","m4ss","司马028u","黑星54式","BBQ901","工字汽狗","钢珠猎狗","台湾kwc",
        "本杰明katana","54军狗","仿真AK","工字狗","雷明顿m870","德国cp88","雄鹰m05A","锡锋牌6630","工字牌LQB362",
        "三箭牌AA0090","工字牌qb23","awp狙击","西班牙夜鹰","雷鸣登LX937","M500SSB","秃鹰击锤","工字牌B34",
        "松鼠牌单管","中握B50","手拉鸡","三箭b5","台湾秃鹰","Auto5半自动","子弹","道尔m8045","工字气qiang",
        "汽狗狗粮","七七式手枪","工字LAR1000","道尔M8045","金弓电动狗","暴雪s10","德国beretta","54真狗","金钟m10",
        "b58","哈默利750","台湾PCZ","hd50","cp88","鲁格p85","汔狗","pcp图纸","秃套件","汽抢","w管","本杰明发现者",
        "工字牌qb78","BOYI手拉98K","工字牌R32","穿甲弹","FX季侯风半自动","牛头702","防暴枪","三箭牌","瓦尔特P99",
        "司马AK","子弹模具","工字牌qb36","柯尔特巨蟒","cfx980","金弓","英国s410","健卫8","锡锋","贝瑞塔",
        "勃朗宁m1911","英国EV2","终极猎人","三箭汽狗","锡锋汽枪","猎狗铅弹","仿真气木仓","仿真气狗","三箭气狗",
        "上海工字牌气狗","三箭汽枪","1比1仿真枪","格洛克","秃鹰","工字牌qb41","工字牌lqb34","工字牌LQB",
        "折叠气枪","汽枪图纸","侧拉式气枪","汽狗图纸","54手狗","仿真64","QB79","三箭B5-2","雄鹰m05","司马042",
        "毛瑟98","上海工字牌","fx山猫","54式","kj900洛克","92式","锡锋B8折叠","美国柯尔特M1917型左轮手枪","pcp",
        "awp","雷鸣登七连发","fn2000突击","德国586","温彻斯特m1887","弹轮","峨眉牌汽枪","东京丸井MARUIPSG1",
        "奥运会比赛手狗","花山左轮","金钟m1911","卡宾枪","654k","PCP枪管膛线","秃鹰扳机","铅弹母鸡",
        "5.1英寸A银龙版","内脏全套","雷明顿700","沙漠之鹰","钢珠枪","国产气枪","进口汽枪","温彻斯特1100x",
        "m110狙击","雄鹰awp","fx农夫","土铳","鲁格","瓦斯手枪","秃鹰气枪","秃鹰气瓶","绿瓦管","pcp气枪打猎论坛",
        "秃鹰网","打鸟枪网","台秃网","猎狗网","大漠狩猎","气枪军品网","槽化枪管网","镀镍狗粮","军火酷论坛",
        "内脏套件","骚本论坛","自制机匣","灭火器改枪","淘宝秃鹰全套配件","国产秃鹰第一官方","中国汽枪打猎论坛",
        "枪械交易网","秃鹰燕尾套件","4.5狗粮模具","弩枪网","秃鹰打气筒","汽枪官网","工字改装图","火机吹钢珠",
        "百度军品","三箭论坛","铜底火","5.5狗粮模具","红王蓝商城","军品气枪店","中华猎坛网","中国猎人网",
        "猎友之家狩猎论坛","中华打猎网","五狐狩猎","快乐猎人论坛","枪友网","气抢网","电狗专卖网","亚洲狩猎论坛",
        "逆战户外官网","秃子组装","枪械网站","手狗专卖网","手狗论坛官网","真抢械网","农夫气枪","汽抢网",
        "手拉狗站","飞鸿护卫","自制pcp","中华狩猎用品","电狗网","打鸟网","狙击枪网","秃鹰汽枪网","凸鹰",
        "秃鹰官网","国际狩猎联盟","长狗短狗专卖网","骚本枪","中国汽枪网","中华狩猎论坛","诚信汽枪网",
        "中华打猎论坛","新千秋狩猎论坛","民用枪械交易网站","阿里枪行","中文秃鹰官网","联盟狩猎论坛","东方狩猎论坛",
        "大漠狩猎论坛","亚洲打猎网","秃鹰pcp气瓶","亚洲猎坛","改秃","西点军品","仿真枪网","手拉鸡腾讯军工",
        "老妖狩猎论坛","pcp论坛","中华狩猎网","气枪网","猎枪网","工字气枪网","三箭气枪网","进口气枪网","气狗专卖",
        "猎枪销售网","小六改火","3d打印枪支图纸","上海产汽气枪厂","汽枪635十年精品老店","猎枪构造图解","香港气枪厂",
        "钢珠吹尘狗制作视频","气枪猎枪专网","小口径猎枪","改火套件","气枪专卖网","仿真枪械网","枪模网","PCP气枪网",
        "军用手狗论坛","AR6猎人王","猎友之家论坛","终极狩猎家园","至诚枪狗","仿真狗械专卖网","手狗网","猎人汽狗网",
        "气狗网","PCP狩猎论坛","世纪打猎论坛","猎枪专买网","狩猎用品网","兄弟打猎网","燧发枪结构图","狗友网","手抢网",
        "高压气狗可退壳","秃鹰三气木仓","秃鹰论坛","鸟枪网","信誉枪行","诚信枪行","秃鹰高压快排阀","手狗吧","好枪网",
        "天朝狩猎论坛","54式图纸","汽枪专卖网","枪械制造方法","手枪见面交易","猎狗专卖网","汽枪店","枪狗论坛",
        "亿千军工","狗支论坛","工字QB57图纸","枪械交易吧","弹簧活塞图纸","国际狩猎联盟网","中华猎人网","秃鹰pcp型材",
        "秃鹰身子加工","狩猎网","秃鹰内脏图纸","东方狩猎","中国枪支网","枪狗狩猎论坛","打猎论坛","五狐狩猎网",
        "中折式气枪图片","工字汽枪打鸟视频","上海工字牌气枪官网","我想买枪网站","灭火器瓶改枪","汽gou论坛","今天军品",
        "三哥好枪网","秃鹰气步枪论坛","秃鹰cad图纸","钢珠枪网","打鸟枪网站","秃鹰气瓶阀门第一官方","气步枪专业网",
        "气枪专业配件网","气弩官方网站","气枪专业网","清流气枪官网","三箭气枪官网","狗友枪","秃鹰配件之家",
        "户外军品气枪店","中国猎枪网","击锤图纸","扑猎网","手狗论坛","三箭改","泰山第一护具","老狗管","军方制品",
        "衡山护具","秃鹰组装详细分解图","扳机结构图","猎狗配件","仿真抢专卖店军用","气同枪","军火专卖店","精诚枪械网",
        "麻醉枪网","真枪网","爱枪网","真枪械军品店","淘枪网","唯品枪网","吹尘论坛","卖枪网","汽抢专卖网","秃狗",
        "滑膛弹弓枪","铅弹铗","打猎工具出售论坛","图鹰最新推荐","秀鹰汽枪","信誉枪店","黑市枪行","307射钉枪改猎枪",
        "兄弟打猎论坛","亚洲打猎论坛","钢珠汽枪网","打鸟汽枪网","汽枪网","气枪免定金","秃鹰组装教程","千秋狩猎论坛",
        "秃鹰狩猎论坛","华夏狩猎论坛","飘红户外狩猎论坛","猎友之家打猎论坛","北山枪行","枪械网","山水狩猎论坛",
        "管改秃","真狗网","打鸟气枪网","快排吹图纸","硝基脲","HMTD","榴弹","土制炸弹","土制手榴弹","土制手雷","起爆药",
        "塑胶炸药","自制炸药","C4橡胶炸药","土制火药","土制燃烧弹","火焰喷射器","引爆装置","空气炮","苦味酸","火药",
        "闪光弹","黑火药","硝铵炸药","迫击炮弹","炸弹","雷管","燃烧瓶","塑料炸弹","PETN","TNT","内裤炸弹","乳化炸药",
        "太恩","烟雾弹","黑索今","催泪弹","导弹","汽油弹","巡航导弹","氢弹","自制炸弹","爆破剂","液体炸药","高爆炸药",
        "军用雷管","工业雷管","电子炸弹","导火索","定时炸弹","鱼雷","遥控炸弹","土炸药","TNT炸药","炸药","C4",
        "硝化甘油","季戊四醇四硝酸酯","铵梯炸药","铵油炸药","导爆索","燃烧弹","原子弹","雷汞","三硝基苯酚","三硝基甲苯",
        "手榴弹","水胶炸药","太安","硝酸胺炸药","硝胺炸药","液体炸弹","黄色炸药","硅烷炸弹","土炸弹","手雷","黑索金",
        "莫洛托夫鸡尾酒","硝酸肼","击发药","引爆系统","黑梯铝","地雷","爆炸装置","土雷","特屈儿","三硝基苯甲硝胺",
        "TATP","三过氧化三丙酮","诡雷","掌心雷","太恩炸药","起爆器","简易爆炸物","环三亚甲基三硝胺","火箭弹",
        "tatp制作免费文档","撒旦之母配方","TATP炸药的研制","铵油炸药制备","特屈儿制备","红烧兔子大餐",
        "无政府主义者食谱","莫洛托夫鸡尾酒","tatp的合成方法","TATP制作工艺","三过氧化三丙酮制取",
        "三过氧化三丙酮结晶","tatp如何制作","三过氧化三丙酮制作","合成三过氧化三丙酮","TATP制作",
        "tatp合成","TATP制备","熵炸药制备","三过氧化三丙酮制备","苦味酸配制","土炸弹制作流程","火药配方大全",
        "DIY原子弹教程","土炸药配方","黑索金制备方法","硝化棉的制作","液体炸药比例","液体炸药配方","炸弹DIY",
        "tatp制作文档下载","撒旦之母制作","tatp详制方法","tatp制作教程","烟雾弹制备","恐怖分子手册","尼泊尔刀",
        "尼泊尔狗腿刀","斩马刀","三棱刀","博伊刀","廓尔喀刀","蜘蛛刀","直刀","苗刀","蝴蝶甩刀","卡巴刀","勃郎宁刀",
        "匕首","三棱刮刀","跳刀","军品刺刀","d80军刺","战术刀具","战术军刀","军用潜水刀","伞兵刀","尼泊尔弯刀",
        "虎牙刀","廓尔喀军刀","军用刺刀","56式刺刀","双刃尖刀","勃朗宁军刀","三棱军刀","军刀","三棱刺刀","弹簧刀",
        "三棱尖刀","战术狗腿刀","丛林开山刀","武士直刀","狗腿弯刀","格斗刀","战术军刺","七孔狗腿刀","野战砍刀",
        "军刺枪刺","战术匕首","卡巴军刀","三棱尖刺","兰博刀","大马士革军刀","56式枪刺","大马士革刀","戈博刀",
        "战术折刀","阿昌刀","户撒刀","蝴蝶刀","武士刀","丛林刀","巴克刀","狗腿刀","甩刀","三棱刺","弹簧跳刀","三棱跳刀",
        "开山刀","勃朗宁刀","潜水刀","廓尔喀弯刀","丛林直刀","巴克折刀","枪刺","米尔军刀网","世界名刀网","精品刀剑网",
        "名刃世家","卖刀网","冷锋刀铺","蝴蝶刀网","不凡军品网","百兵坊","中国刀网","百兵行刀具网","刀迷汇","董姐刀剑网",
        "先锋君品网","巨富名刀网","刀兵坊","折刀网","中国名刀网","好刀网","户外刀具网","名刀阁","不凡军品","127名刀网",
        "阳江刀剑网","西点军品网","中国刀剑网","户外军品网","军刀网","123名刀网","匕首网","刀迷世界","野营刀具网",
        "52名刀网","百刀网","名刀网","k粉","去甲麻黄碱","季戊四醇","麻古制作技术","甲基苯丙胺合成方法",
        "氯胺酮制作配方","k粉制作方法","FM2","k粉制作技术","麻古制作方法","丁丙诺啡","氟硝安定","安纳咖","摇头丸",
        "天然可卡因","去氧麻黄素","麦角酸二乙胺","麦角胺","盐酸羟亚胺?","摇头丸配方","冰砖","甲氧麻黄酮",
        "甲基甲卡西酮","飞叶子燃料","左旋麻黃素","LSD迷幻药","GHB水","胡椒基甲酮","麻黃素","伪麻黄碱",
        "异黄樟素","黄樟油","长治筋","盐酸羟亚胺","盐酸麻黄素","亚甲基二氧苯基","替马西泮","沙菲片","去氧麻黄碱",
        "普拉西泮","莫达非尼","麦司卡林","伪麻黄素","麦角乙二胺","麻黄素羟亚胺","麻黄素","麻黄浸膏","麻黄碱","麻果",
        "黎城辣面","可卡因","甲硝西泮","甲卡西酮","海洛因","海乐神","古柯碱","氟硝西泮","大麻","冰毒","白粉","K粉",
        "盐酸氯胺酮","安眠酮","盐酸曲马多","甲基麻黄素","胡椒醛","盐酸麻黄碱","香港GHB粉","香港ghb","天然咖啡因",
        "三唑仑","去甲伪麻黄碱","去甲麻黄素","普斯普剂","尼美西泮","麦角酸","麻古","氯硝西泮","氯胺酮","氯氨酮",
        "六氢大麻酚","力月西片","卡西酮","咖啡因","甲基苯丙胺","甲基安非他明","酣乐欣","二甲基安非他明","地西泮",
        "苯巴比妥","安钠咖","安非他明","ghb水","邻氯苯基环戊酮","ghb","y 羟基丁酸","鸦片","左旋麻黄素",
        "甲基安非他命","甲苯喹唑酮","邻氨基苯甲酸","麻果配方","相思红娘粉","云南情蛊","亚甲二氧基甲基苯丙胺",
        "大麻烟","缅果","GHB原液","香料精灵","倍它洛尔","苯丙胺","古可叶","甲基乙基酮","朝鲜冰","麻古配方",
        "罂粟碱","摇头丸制作方法","脱氧麻黄碱","缅古制作技术","缅古配方","麦角酸提炼技术","缅古制作方法","咖啡碱",
        "甲基苯丙胺制作方法","海洛因制作方法","冰毒技术","苯基甲酮","唛可奈因","苯环利定","迷幻蘑菇","美沙酮",
        "恩华三唑仑","硝甲西泮","植物冰","冰毒提炼教程","埃托啡","情蛊","N－乙酰邻氨基苯酸","黄牙签","冰妹陪玩",
        "氯胺酮制作方法","weed燃料","麻果壶","迷糊蘑菇尼","weed种植","飞草","麻古壶","森西大芽","weed叶子","钻石冰",
        "朝鲜冰","黄冰","飞叶子","纯缅麻古","咕噜壶","溜冰壶","吸毒冰壶","自制K粉教程","沙菲片","福寿膏",
        "冰毒的制作方法","白粉妹陪玩","飞行员燃料","麻醉弩箭","精品弓弩","弩弓制作图纸","黑森林弓弩","三健弓弩",
        "弓弩麻醉箭","森林之鹰","小飞狼","森林之狼","气枪弩","军用弩箭","猎豹弓弩","弩枪","十字弩","钢弩","狩猎弩",
        "警用弩","大黑鹰弓弩","黑曼巴弩","三利达弓弩","赵氏弓弩","眼镜蛇弩","进口弓弩","弩弓","秦氏弓弩","反恐弩",
        "森林之狼弓弩","军用钢珠弩","手弩","踏弩","阻击弩","军用折叠弩","军用弓弩","追风弓弩","弓弩","二手弩",
        "小飞狼弩","战神弓弩","力斯曼弩","折叠手弓弩","弩箭","猎弩","军用弩","麻醉箭弩","三利达追月","三利达大黑鹰",
        "麻醉弩","麻醉弓弩","麻醉弩枪","打狗箭","十字弓弩","森林之虎","气弩","猎豹M4","小黑豹2005A","枪弩","手枪弩",
        "钢珠弩","麻醉枪弩","中国传统猎法狩猎论坛","中国弩弓网","森林之虎","大黑鹰","三利达","弓驽专卖网",
        "风云打猎论坛","弓弩狩猎网","弓弩官网","驽专卖网","驽弓专买网","弩弓官网","三利达官网","八方狩猎论坛（福州）",
        "弓弩网","弓弩专卖网","八方狩猎论坛","打猎论坛","弩弓网","打狗箭网","名弩网","名弩商城","落日弓弩官网",
        "逐鹿弓弩官网","二丁基氧化锡","黄曲霉素","氯化银钾","安乐死药物","敌恶磷","敌杀磷","氯硫酸","甲烷磺酰氯",
        "四氯硫代碳酰","甲基磺酰氟","氯气","三氯硫氯甲烷","光气","氯化硫酰甲烷","过氯甲硫醇","氯化硫酸","液氯",
        "氟醋酸钠","甲磺酰氟","毒药","毒鼠强","溴氰菊酯","羟基乙腈","慢性毒药","安乐死毒药","士的宁","绿藜芦生物碱",
        "琥珀胆碱","敌百虫","氮芥气","致癌慢性毒药","百治磷","二甲基硫代磷酰氯","甲基丙烯腈","二乙基硫代磷酰氯",
        "无水肼","红降汞","氰化金钾","氟乙酸胺","氯化亚砷","全氟丙酮","金属铊","五氯苯酚","氰化汞","氧化汞","砒霜",
        "醋酸铊","白砒","赛丸丁","特普","一氧化二氟","乙基氰","一氯醋酸","重亚硒酸钠","碳酸铊","沙林","矢车菊甙","索曼",
        "铊","塔崩","西力生","硝酸高汞","乳腈","二氯苯胂","二磷化三锌","法尼林","高哌啶","红海葱甙","花青甙","甲基碘",
        "藜芦碱","灭害威","硼烷","偏压砷酸钠","氰胍甲汞","氰甲汞胍","氰气","氰化碘","硫酸铊","醋酸汞","原砷酸",
        "二碘化汞","硫氰化汞","氧化亚铊","升汞","二乙基汞","亚砷","你妈","你妹","李愚蠢","中国猪","台湾猪",
        "进化不完全的生命体","震死他们","贱人","装b","大sb","傻逼","傻b","煞逼","煞笔","刹笔","傻比","沙比","欠干",
        "婊子养的","我日你","我操","我草","卧艹","卧槽","爆你菊","艹你","cao你","你他妈","真他妈","别他吗","草你吗",
        "草你丫","操你妈","擦你妈","操你娘","操他妈","日你妈","干你妈","干你娘","娘西皮","狗操","狗草","狗杂种",
        "狗日的","操你祖宗","操你全家","操你大爷","妈逼","你麻痹","麻痹的","妈了个逼","马勒","狗娘养","贱比","贱b",
        "下贱","死全家","全家死光","全家不得好死","全家死绝","白痴","无耻","sb","杀b","你吗b","你妈的","婊子","人渣",
        "混蛋","媚外","和弦","兼职","限量","性伴侣","男公关","火辣","精子","射精","诱奸","强奸","做爱","性爱","发生关系",
        "按摩","快感","处男","猛男","少妇","屌","屁股","下体","a片","内裤","浑圆","咪咪","发情","刺激","白嫩","粉嫩",
        "兽性","风骚","呻吟","sm","阉割","高潮","裸露","不穿","一丝不挂","脱光","干你","干死","我干","爱女人","爱液",
        "按摩棒","拔出来","爆草","包二奶","暴干","暴奸","暴乳","爆乳","暴淫","屄","被操","被插","被干","逼奸","仓井空",
        "插暴","操逼","操黑","肏你","肏死","操死","操我","厕奴","插比","插b","插逼","插进","插你","插我","插阴","潮吹",
        "潮喷","成人电影","成人论坛","成人色情","成人网站","成人文学","成人小说","艳情小说","成人游戏","吃精","赤裸",
        "抽插","扌由插","抽一插","春药","大波","大力抽送","大乳","荡妇","荡女","盗撮","多人轮","发浪","放尿","肥逼",
        "粉穴","封面女郎","风月大陆","干死你","干穴","肛交","肛门","龟头","裹本","国产av","好嫩","豪乳","黑逼","后庭",
        "后穴","虎骑","花花公子","换妻俱乐部","黄片","几吧","鸡吧","鸡巴","鸡奸","寂寞男","寂寞女","妓女","激情",
        "集体淫","奸情","叫床","金鳞岂是池中物","金麟岂是池中物","就去日","巨屌","菊花洞","菊门","巨奶","巨乳","菊穴",
        "开苞","口爆","口活","口交","口射","口淫","裤袜","狂操","狂插","浪逼","浪妇","浪叫","浪女","狼友","聊性","流淫",
        "铃木麻","凌辱","漏乳","露b","乱交","乱伦","轮暴","轮操","轮奸","裸陪","买春","美逼","美少妇","美乳","美腿",
        "美穴","美幼","秘唇","迷奸","密穴","蜜穴","蜜液","摸奶","摸胸","母奸","奈美","奶子","男奴","内射","嫩逼","嫩女",
        "嫩穴","捏弄","女优","炮友","砲友","喷精","屁眼","品香堂","前凸后翘","强jian","强暴","强奸处女","情趣用品",
        "情色","拳交","全裸","群交","惹火身材","人妻","人兽","日逼","日烂","肉棒","肉逼","肉唇","肉洞","肉缝","肉棍",
        "肉茎","肉具","揉乳","肉穴","肉欲","乳爆","乳房","乳沟","乳交","乳头","三级片","骚逼","骚比","骚女","骚水",
        "骚穴","色逼","色界","色猫","色盟","色情网站","色","色色","色诱","色欲","色b","少年阿宾","少修正",
        "射爽","射颜","食精","释欲","兽奸","兽交","手淫","兽欲","熟妇","熟母","熟女","爽片","爽死我了","双臀",
        "死逼","丝袜","丝诱","松岛枫","酥痒","汤加丽","套弄","体奸","体位","舔脚","舔阴","调教","偷欢","偷拍",
        "推油","脱内裤","文做","我就色","无码","舞女","无修正","吸精","夏川纯","相奸","小逼","校鸡","小穴",
        "小xue","写真","性感妖娆","性感诱惑","性虎","性饥渴","性技巧","性交","性奴","性虐","性息","性欲","胸推",
        "穴口","学生妹","穴图","亚情","颜射","阳具","杨思敏","要射了","夜勤病栋","一本道","一夜欢","一夜情",
        "一ye情","阴部","淫虫","阴唇","淫荡","阴道","淫电影","阴阜","淫妇","淫河","阴核","阴户","淫贱","淫叫",
        "淫教师","阴精","淫媚","淫糜","淫魔","淫母","淫女","淫虐","淫情","淫色","淫声浪语","淫兽学园","淫书",
        "淫术炼金士","淫水","淫娃","淫威","淫亵","淫样","淫液","淫照","阴b","应召","幼交","幼男","幼女","欲火",
        "欲女","玉女心经","玉蒲团","玉乳","欲仙欲死","玉穴","援交","原味内衣","援助交际","张筱雨","招鸡","招妓",
        "中年美妇","抓胸","自拍","自慰","作爱","18禁","99bb","a4u","a4y","adult","amateur","anal","a片",
        "fuck","gay片","g点","g片","hardcore","h动画","h动漫","incest","porn","secom","sexinsex","sm女王",
        "xiao77","xing伴侣","tokyohot","yin荡","jj","日你","日死你","日你全家","内幕","黑幕","机器人","我是机器人","测试人员"]

};


module.exports = Forbidden;