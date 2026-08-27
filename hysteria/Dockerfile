FROM alpine:3.6

ARG TARGETARCH

ENV VERSION=app%2Fv2.12.2
ENV PORT=443
ENV PASSWORD=helloworld

RUN apk add --no-cache curl ca-certificates \
  && mkdir /hysteria && cd /hysteria \
  && curl -sL -o hysteria-linux https://github.com/apernet/hysteria/releases/download/${VERSION}/hysteria-linux-${TARGETARCH} \
  && chmod a+x hysteria-linux
 
COPY entrypoint.sh cert.pem key.pem /hysteria/
RUN chmod a+x /hysteria/entrypoint.sh

EXPOSE $PORT/udp

ENTRYPOINT ["/hysteria/entrypoint.sh"]

