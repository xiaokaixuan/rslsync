FROM alpine:latest as builder

ADD service /service

RUN find /service -type f -name run -exec chmod a+x {} \;; \
    apk --update add wget && \
    wget -qO- https://github.com/P3TERX/Aria2-Pro-Core/releases/download/1.35.0_2020.12.29/aria2-1.35.0-static-linux-amd64.tar.gz | tar zx -C / && \
    wget -qO- https://github.com/caddyserver/caddy/releases/download/v2.3.0/caddy_2.3.0_linux_amd64.tar.gz | tar zx -C / && \
    wget -q https://github.com/mayswind/AriaNg/releases/download/1.1.7/AriaNg-1.1.7.zip && unzip AriaNg-1.1.7.zip -d /AriaNg; \
    chmod a+x /aria2c /caddy
    
FROM alpine:latest

RUN apk add --no-cache --update runit

COPY --from=builder /service /service
COPY --from=builder /AriaNg /AriaNg
COPY --from=builder /aria2c /caddy /
COPY aria2.conf aria2.session Caddyfile /

EXPOSE 6800 80

VOLUME /downloads

ENTRYPOINT ["runsvdir", "/service"]
