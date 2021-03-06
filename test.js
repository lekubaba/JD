server {
    listen 443 ssl;
    server_name multable.xiaohongxian.com;
    ssl_certificate   cert/214572188770669.pem;
    ssl_certificate_key  cert/214572188770669.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    location / {
        proxy_pass   http://wangchunze.top:8085/
        proxy_redirect off;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}


upstream  multable.xiaohongxian.com {
    # Nodejs app upstream
    server 127.0.0.1:8081;
    keepalive 64;
}

server {
    listen 80;
    server_name  multable.xiaohongxian.com;
    location / {
        proxy_pass      http://127.0.0.1:8081:;
        }
    }