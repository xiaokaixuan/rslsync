FROM golang:stretch as builder

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update; apt-get install --no-install-recommends -y git; \
    git clone -b main https://github.com/Xhofe/alist.git /alist; \
    cd /alist; \
    set -x; \
    GOOS=linux GOARCH=amd64 go build -a -ldflags "-linkmode external -extldflags '-static' -s -w" -o alist alist.go; \
    set +x; \
    chmod a+x alist
    
FROM alpine:latest

WORKDIR /alist
COPY --from=builder /alist/alist /alist/alist

VOLUME /alist/config

EXPOSE 5244

ENTRYPOINT ["/alist/alist", "-conf", "/alist/config/conf.yml"]

