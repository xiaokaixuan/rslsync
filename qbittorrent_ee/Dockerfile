FROM alpine:latest as builder

ENV VERSION=4.3.2.10

ADD service /service

RUN find /service -type f -name run -exec chmod a+x {} \;; \
    apk --update add wget && \
    wget -q https://github.com/c0re100/qBittorrent-Enhanced-Edition/releases/download/release-${VERSION}/qbittorrent-nox_x86_64-linux-musl_static.zip && \
    unzip qbittorrent-nox_x86_64-linux-musl_static.zip -d / && \
    chmod a+x /qbittorrent-nox
    
FROM alpine:latest

RUN apk add --no-cache --update runit

COPY --from=builder /service /service
COPY --from=builder /qbittorrent-nox /qbittorrent-nox

EXPOSE 6881 6881/udp 8080

VOLUME /config /downloads

ENTRYPOINT ["runsvdir", "/service"]
