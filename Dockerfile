FROM debian:stable-slim as builder

ENV DEBIAN_FRONTEND=noninteractive VERSION=2.7.2

RUN apt-get update; \
    apt-get install -y wget 2>/dev/null && \
    wget -qO- https://github.com/xiaokaixuan/rslsync/releases/download/v${VERSION}/rslsync_linux_amd64.tar.gz | tar zx -C / && \
    chmod a+x /rslsync /run_sync
    
FROM debian:stable-slim

COPY --from=builder /rslsync /run_sync /usr/bin/
COPY --from=builder /sync.conf.default /etc/

EXPOSE 8888/tcp 55555/tcp 55555/udp

VOLUME [/sync_data]

ENTRYPOINT ["run_sync"]

CMD ["--config", "/sync_data/sync.conf"]
