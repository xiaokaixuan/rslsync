## Resilio Sync

### Build
```bash
docker build -t xiaokaixuan/rslsync:amd64 .
docker build -t xiaokaixuan/rslsync:arm64 -f Dockerfile.arm64 .
docker push xiaokaixuan/rslsync:amd64
docker push xiaokaixuan/rslsync:arm64

docker manifest create xiaokaixuan/rslsync xiaokaixuan/rslsync:amd64 xiaokaixuan/rslsync:arm64 --amend
docker manifest push xiaokaixuan/rslsync
```

### Usage

```bash
docker run -d --name sync --restart=always \
    -v ~/sync_data:/sync_data -p8888:8888 -p55555:55555 -p55555:55555/udp xiaokaixuan/rslsync
```

### Docker Hub
> *https://hub.docker.com/r/xiaokaixuan/rslsync*

