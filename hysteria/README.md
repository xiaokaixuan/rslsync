## Hysteria 2

### Usage

```bash

docker buildx build --platform linux/amd64,linux/arm64 -t xiaokaixuan/hysteria --push .

docker run -d --name hysteria \
    --restart unless-stopped -e PORT=2233 --net=host xiaokaixuan/hysteria
    
docker cp cert.pem hysteria:/hysteria/
docker cp key.pem hysteria:/hysteria/
docker restart hysteria

```

### Docker Hub
> *https://github.com/HyNetworks/hysteria*

> *https://hub.docker.com/r/xiaokaixuan/hysteria*

