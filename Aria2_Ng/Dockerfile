FROM alpine:3.22 AS builder

ARG TARGETARCH
ADD service /service

RUN find /service -type f -name run -exec chmod a+x {} \;; \
    apk --update add wget && \
    wget -qO- https://github.com/P3TERX/Aria2-Pro-Core/releases/download/1.36.0_2021.08.22/aria2-1.36.0-static-linux-${TARGETARCH}.tar.gz | tar zx -C / aria2c && \
    wget -qO- https://github.com/caddyserver/caddy/releases/download/v2.11.4/caddy_2.11.4_linux_${TARGETARCH}.tar.gz | tar zx -C / caddy && \
    wget -qO AriaNg.zip https://github.com/mayswind/AriaNg/releases/download/1.3.14/AriaNg-1.3.14.zip && unzip AriaNg.zip -d /AriaNg; \
    chmod a+x /aria2c /caddy
    
FROM alpine:3.22

RUN apk add --no-cache runit

COPY --from=builder /service /service
COPY --from=builder /AriaNg /AriaNg
COPY --from=builder /aria2c /caddy /
COPY aria2.conf aria2.session Caddyfile /

EXPOSE 6800 80

VOLUME /downloads

ENTRYPOINT ["runsvdir", "/service"]
