## Xbox Speeder

### Support arm64
```bash
docker run --rm --privileged multiarch/qemu-user-static:register --reset
```

### Build
```bash
docker build -t xiaokaixuan/xbox_speeder:amd64 .
docker build -t xiaokaixuan/xbox_speeder:arm64 -f Dockerfile.arm64 .
docker push xiaokaixuan/xbox_speeder:amd64
docker push xiaokaixuan/xbox_speeder:arm64

docker manifest create xiaokaixuan/xbox_speeder xiaokaixuan/xbox_speeder:amd64 xiaokaixuan/xbox_speeder:arm64 --amend
docker manifest push xiaokaixuan/xbox_speeder
```

### Usage

```bash
docker run -d --name xbox_speeder --restart always \
     -v ~/dnsmasq.d:/etc/dnsmasq.d -p 53:53 -p 53:53/udp -p 80:80 xiaokaixuan/xbox_speeder
```

### Docker Hub
> *https://hub.docker.com/r/xiaokaixuan/xbox_speeder*

### Reference
> *https://github.com/skydevil88/XboxDownload*

