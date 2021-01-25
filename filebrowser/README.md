## File Browser

### Support arm64
```bash
docker run --rm --privileged multiarch/qemu-user-static:register --reset
```

### Build
```bash
docker build -t xiaokaixuan/filebrowser:amd64 .
docker build -t xiaokaixuan/filebrowser:arm64 -f Dockerfile.arm64 .
docker push xiaokaixuan/filebrowser:amd64
docker push xiaokaixuan/filebrowser:arm64

docker manifest create xiaokaixuan/filebrowser xiaokaixuan/filebrowser:amd64 xiaokaixuan/filebrowser:arm64 --amend
docker manifest push xiaokaixuan/filebrowser
```

### Usage

```bash
docker run -d --name filebrowser \
    --restart always -v /path/to/root:/srv -p80:80 xiaokaixuan/filebrowser
```

### Docker Hub
> *https://hub.docker.com/r/xiaokaixuan/filebrowser*

