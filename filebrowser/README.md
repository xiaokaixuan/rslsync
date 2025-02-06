## File Browser

### Support arm64
```bash
docker run --rm --privileged multiarch/qemu-user-static:register --reset
docker buildx create --use
```

### Build
```bash
docker buildx build --platform=linux/amd64 -t xiaokaixuan/filebrowser:amd64 . --load
docker buildx build --platform=linux/arm64 -t xiaokaixuan/filebrowser:arm64 -f Dockerfile.arm64 . --load

docker push xiaokaixuan/filebrowser:amd64
docker push xiaokaixuan/filebrowser:arm64

docker manifest create xiaokaixuan/filebrowser xiaokaixuan/filebrowser:amd64 xiaokaixuan/filebrowser:arm64 --amend
docker manifest push xiaokaixuan/filebrowser
```

### Usage

```bash
docker run -d --name filebrowser \
    --restart always -v /path/to/root:/srv:rslave -p80:80 xiaokaixuan/filebrowser
```

### Docker Hub
> *https://github.com/filebrowser/filebrowser*

> *https://hub.docker.com/r/xiaokaixuan/filebrowser*

