FROM alpine:3.10

RUN apk add --no-cache --update lighttpd dnsmasq


VOLUME /etc/dnsmasq.d

EXPOSE 80/tcp 53/tcp 53/udp


CMD dnsmasq && exec lighttpd -f /etc/lighttpd/lighttpd.conf -D

