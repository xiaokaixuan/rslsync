FROM debian:buster

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install --no-install-recommends -y ca-certificates socat wget gpg 2>/dev/null && \
    wget -qO- https://pkg.cloudflareclient.com/pubkey.gpg | gpg --yes --dearmor --output /usr/share/keyrings/cloudflare-warp-archive-keyring.gpg && \
    apt-get purge -y wget gpg && \
    echo "deb [arch=amd64 signed-by=/usr/share/keyrings/cloudflare-warp-archive-keyring.gpg] https://pkg.cloudflareclient.com/ buster main" | tee /etc/apt/sources.list.d/cloudflare-client.list && \
    apt-get update && \
    apt-get install --no-install-recommends -y cloudflare-warp 2>/dev/null && \
    apt-get autoremove --yes && \
    apt-get autoclean && \
    rm -rf /var/lib/{apt,dpkg,cache,log}
    
EXPOSE 40001/tcp

CMD socat tcp-listen:40001,reuseaddr,fork tcp:127.0.0.1:40000 & exec warp-svc


