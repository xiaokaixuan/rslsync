FROM alpine:3.6

ENV VERSION=app%2Fv2.6.0
ENV PORT=443
ENV PASSWORD=helloworld

RUN apk add --no-cache curl \
  && mkdir /hysteria && cd /hysteria \
  && curl -sL -o hysteria-linux-amd64 https://github.com/apernet/hysteria/releases/download/${VERSION}/hysteria-linux-amd64 \
  && chmod a+x hysteria-linux-amd64
 
COPY entrypoint.sh cert.pem key.pem /hysteria/
RUN chmod a+x /hysteria/entrypoint.sh

EXPOSE $PORT/udp

ENTRYPOINT ["/hysteria/entrypoint.sh"]

