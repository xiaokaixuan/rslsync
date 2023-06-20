## Cloudflare WARP

### Build
```bash
docker build -t xiaokaixuan/cloudflare-warp .
docker push xiaokaixuan/cloudflare-warp
```

### Usage

```bash
docker run -d --name cloudflare-warp --restart=unless-stopped \
    --memory 256m --cpus 1 -p40001:40001 xiaokaixuan/cloudflare-warp
```

### Commands
```bash

docker exec -it cloudflare-warp warp-cli help

warp-cli teams-enroll # warp-cli register

warp-cli connect

warp-cli set-mode proxy
warp-cli enable-always-on

```

### Docker Hub
> *https://hub.docker.com/r/xiaokaixuan/cloudflare-warp*

