#!/bin/sh

cd /hysteria

cat<<-EOF>config.yaml
listen: :${PORT}

tls:
  cert: cert.pem
  key: key.pem

auth:
  type: password
  password: ${PASSWORD}

masquerade: 
  type: proxy
  proxy:
    url: https://www.bing.com 
    rewriteHost: true
    
speedTest: true
EOF

exec /hysteria/hysteria-linux-amd64 server

