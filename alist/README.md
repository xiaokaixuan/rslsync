## AList

### Build
```bash
docker build -t xiaokaixuan/alist:amd64 .
docker build -t xiaokaixuan/alist:arm64 -f Dockerfile.arm64 .
docker push xiaokaixuan/alist:amd64
docker push xiaokaixuan/alist:arm64

docker manifest create xiaokaixuan/alist xiaokaixuan/alist:amd64 xiaokaixuan/alist:arm64 --amend
docker manifest push xiaokaixuan/alist
```

### Usage

```bash
docker run -d --name alist \
    --restart always -p 5244:5244 \
    -v ~/alist:/alist/config xiaokaixuan/alist
```

### Docker Hub
> *https://github.com/Xhofe/alist*
> *https://hub.docker.com/r/xiaokaixuan/alist*
