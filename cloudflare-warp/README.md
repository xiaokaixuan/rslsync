## Cloudflare WARP

### Build
```bash
docker build -t xiaokaixuan/cloudflare-warp .
docker push xiaokaixuan/cloudflare-warp
```

### Usage

```bash
docker run -d --name cloudflare-warp --restart=unless-stopped --memory 256m --cpus 1 xiaokaixuan/cloudflare-warp
```

### Commands
```bash

docker exec -it cloudflare-warp warp-cli help

warp-cli teams-enroll

warp-cli register

warp-cli set-mode proxy

warp-cli connect

```

### Docker Hub
> *https://hub.docker.com/r/xiaokaixuan/cloudflare-warp*

