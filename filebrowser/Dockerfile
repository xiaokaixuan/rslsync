FROM alpine:latest as builder

ARG VERSION=2.24.2

RUN apk --update add wget; \
    wget -qO- https://github.com/filebrowser/filebrowser/releases/download/v${VERSION}/linux-amd64-filebrowser.tar.gz | tar zx -C / filebrowser
    
FROM alpine:latest

RUN apk --update add ca-certificates mailcap

VOLUME /srv
EXPOSE 80

COPY .docker.json /.filebrowser.json
COPY --from=builder /filebrowser /filebrowser

ENTRYPOINT ["/filebrowser"]

