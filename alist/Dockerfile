FROM golang:stretch as builder

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update; apt-get install --no-install-recommends -y git wget; \
    git clone -b main https://github.com/Xhofe/alist.git /alist; \
    wget -qO- https://github.com/Xhofe/alist-web/releases/download/v1.0.5/refs.tags.v1.0.5.tar.gz | tar zx -C /alist; \
    cd /alist; \
    set -x; \
    sed -i 's|dist|/alist/dist|;s|alist.db|/alist/config/alist.db|' bootstrap/config.go; \
    CGO_ENABLED=1 GOOS=linux GOARCH=amd64 go build -a -ldflags "-linkmode external -extldflags '-static' -s -w" -o alist alist.go; \
    set +x; \
    chmod a+x alist
    
FROM alpine:latest

WORKDIR /alist
COPY --from=builder /alist/alist /alist/alist
COPY --from=builder /alist/dist /alist/dist

VOLUME /alist/config

EXPOSE 5244

ENTRYPOINT ["/alist/alist", "-skip-update", "-conf", "/alist/config/conf.yml"]

