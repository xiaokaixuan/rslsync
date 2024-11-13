## Hysteria 2

### Usage

```bash
docker run -d --name hysteria \
    --restart unless-stopped -e PORT=4433 --net=host xiaokaixuan/hysteria
    
docker cp cert.pem hysteria:/hysteria/
docker cp key.pem hysteria:/hysteria/
docker restart hysteria

```

### Docker Hub
> *https://hub.docker.com/r/xiaokaixuan/hysteria*

