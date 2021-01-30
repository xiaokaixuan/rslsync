## Aria2 + AriaNg

### Support arm64
```bash
docker run --rm --privileged multiarch/qemu-user-static:register --reset
```

### Build
```bash
docker build -t xiaokaixuan/aria2_ng:amd64 .
docker build -t xiaokaixuan/aria2_ng:arm64 -f Dockerfile.arm64 .
docker push xiaokaixuan/aria2_ng:amd64
docker push xiaokaixuan/aria2_ng:arm64

docker manifest create xiaokaixuan/aria2_ng xiaokaixuan/aria2_ng:amd64 xiaokaixuan/aria2_ng:arm64 --amend
docker manifest push xiaokaixuan/aria2_ng
```

### Usage

```bash
docker run -d --name aria2_ng --restart always \
    -v /path/to/downloads:/downloads -p 6800:6800 -p 80:80 xiaokaixuan/aria2_ng
```

### Docker Hub
> *https://hub.docker.com/r/xiaokaixuan/aria2_ng*