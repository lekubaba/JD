var str = '体项目的特别方案</p><p>&nbsp;</p><p><htmlxmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns:dt="uuid:C2F41010-65B3-11d1-A29F-00AA00C14882" xmlns="http://www.w3.org/TR/REC-html40"><!--[if gte mso 9]><xml></xml><![endif]--><style>@font-face{font-family:"Times New Roman";}@font-face{font-family:"宋体";}@font-face{font-family:"Calibri";}@font-face{font-family:"新宋体";}p.MsoNormal{mso-style-name:正文;mso-style-parent:"";margin-top:0.0000pt;margin-right:0.0000pt;margin-bottom:0.0000pt;margin-left:0.0000pt;text-autospace:none;mso-pagination:none;text-align:left;font-family:新宋体;font-size:11.0000pt;}span.msoIns{mso-style-type:export-only;mso-style-name:"";text-decoration:underline;text-underline:single;color:blue;}span.msoDel{mso-style-type:export-only;mso-style-name:"";text-decoration:line-through;color:red;}@page{mso-page-border-surround-header:no;	mso-page-border-surround-footer:no;}@page Section0{margin-top:0.0000pt;margin-bottom:0.0000pt;margin-left:84.0000pt;margin-right:84.0000pt;size:595.5000pt 528.0000pt;mso-page-orientation:landscape;}div.Section0{page:Section0;}</style></htmlxmlns:o="urn:schemas-microsoft-com:office:office"></p><p><font face="新宋体">高效性</font>:<font face="新宋体">福州小红线信息咨询服务有限公司</font><font face="新宋体">具有工作高效性</font>,受理客户咨询后,始终把客户的服务<font face="新宋体">置于</font><font face="新宋体">公司的高效流程之中。</font></p>'


str=str.replace(/<\/?html[^>]*>/gi, "")
str=str.replace(/<\/?style>[^>]*>/gi, "")

console.log(str)