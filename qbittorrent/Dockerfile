FROM alpine:latest as builder

ENV VERSION=4.3.3

ADD qbittorrent /qbittorrent

RUN find /qbittorrent -type f -name run -exec chmod a+x {} \;; \
    apk --update add wget && \
    wget -q https://github.com/PX-Lab/qBittorrent-static/releases/download/release-${VERSION}/qbittorrent-nox_x86_64-linux-musl_static.zip && \
    unzip qbittorrent-nox_x86_64-linux-musl_static.zip -d / && \
    chmod a+x /qbittorrent-nox
    
FROM alpine:latest

RUN apk add --no-cache --update runit

COPY --from=builder /qbittorrent /qbittorrent
COPY --from=builder /qbittorrent-nox /qbittorrent-nox

EXPOSE 6881 6881/udp 8080

VOLUME /config /downloads

ENTRYPOINT ["runsv", "/qbittorrent"]
