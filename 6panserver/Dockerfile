FROM alpine:latest as builder

ENV VERSION=2.2.3

RUN apk --update add wget && \
    wget -qO- https://github.com/xiaokaixuan/rslsync/releases/download/v${VERSION}/6panserver_linux_amd64.tar.gz | tar zx -C / && \
    chmod a+x /6panserver /aria2c
    
FROM alpine:latest

COPY www.db /AppData/www.db
COPY --from=builder /6panserver /aria2c /aria2.conf /

VOLUME /downloads

EXPOSE 29375

ENTRYPOINT ["/6panserver", "--isremote=true", "--password=0123456789012345"]
