FROM alpine:3.6

ENV VERSION=app%2Fv2.0.2
ENV PORT=443
ENV PASSWORD=helloworld

RUN apk add --no-cache curl \
  && mkdir /hysteria && cd /hysteria \
  && curl -OsL https://github.com/apernet/hysteria/releases/download/${VERSION}/hysteria-linux-amd64-avx \
  && chmod a+x hysteria-linux-amd64-avx
 
COPY entrypoint.sh cert.pem key.pem /hysteria/
RUN chmod a+x /hysteria/entrypoint.sh

EXPOSE $PORT/udp

CMD exec /hysteria/entrypoint.sh

