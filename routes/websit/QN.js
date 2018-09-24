var qiniu = require('qiniu');
var express = require('express');
var router = express.Router();
var config = require('../../config/config.js');

var accessKey = config.ACCESS_KEY;
var secretKey = config.SECRET_KEY;
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

//飞贷用户上传文件路由控制
router.get('/uptoken', function(req, res, next) {

    var options = {
      scope: config.Bucket_Name,
      expires:7200
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uptoken=putPolicy.uploadToken(mac);
    res.header("Cache-Control", "max-age=0, private, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 5000);
    res.json({
        uptoken: uptoken
    });
});

router.post('/downtoken', function(req, res) {

    var key = req.body.key,
        domain = req.body.domain;

    //trim 'http://'
    if (domain.indexOf('http://') != -1) {
        domain = domain.substr(7);
    }
    //trim 'https://'
    if (domain.indexOf('https://') != -1) {
        domain = domain.substr(8);
    }
    //trim '/' if the domain's last char is '/'
    if (domain.lastIndexOf('/') === domain.length - 1) {
        domain = domain.substr(0, domain.length - 1);
    }

    var baseUrl = qiniu.rs.makeBaseUrl(domain, key);
    var deadline = 3600 + Math.floor(Date.now() / 1000);

    baseUrl += '?e=' + deadline;
    var signature = qiniu.util.hmacSha1(baseUrl, config.SECRET_KEY);
    var encodedSign = qiniu.util.base64ToUrlSafe(signature);
    var downloadToken = config.ACCESS_KEY + ':' + encodedSign;

    if (downloadToken) {
        res.json({
            downtoken: downloadToken,
            url: baseUrl + '&token=' + downloadToken
        })
    }
});



module.exports = router;