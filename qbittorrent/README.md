## qBittorrent Official Edition

### Support arm64
```bash
docker run --rm --privileged multiarch/qemu-user-static:register --reset
```

### Build
```bash
docker build -t xiaokaixuan/qbittorrent:amd64 .
docker build -t xiaokaixuan/qbittorrent:arm64 -f Dockerfile.arm64 .
docker push xiaokaixuan/qbittorrent:amd64
docker push xiaokaixuan/qbittorrent:arm64

docker manifest create xiaokaixuan/qbittorrent xiaokaixuan/qbittorrent:amd64 xiaokaixuan/qbittorrent:arm64 --amend
docker manifest push xiaokaixuan/qbittorrent
```

### Usage

```bash
docker run -d --name qbittorrent \
    -e WEBUI_PORT=8080 --restart always \
    -p 6881:6881 -p 6881:6881/udp -p 8080:8080 \
    -v /path/to/config:/config -v /path/to/downloads:/downloads xiaokaixuan/qbittorrent
```

### Docker Hub
> *https://hub.docker.com/r/xiaokaixuan/qbittorrent*