## Tencent DDNS

### Build
> *https://github.com/kaixuan1115/notes/issues/35*

### Usage

```bash
docker run -d --name tencent_ddns --restart=on-failure --memory 134217728 --cpus 0.5 xiaokaixuan/tencent_ddns

docker logs -f tencent_ddns

docker cp tencent_ddns:/ddns-js/configs.js .

docker cp configs.js tencent_ddns:/ddns-js/
```

### Docker Hub
> *https://hub.docker.com/r/xiaokaixuan/tencent_ddns*

