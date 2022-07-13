## Tencent DDNS

### Build
> *https://github.com/kaixuan1115/notes/issues/35*

### Usage

```bash
docker run -d --name tencent_ddns --restart=always \
	-e DOMAIN='home.go-back.win' -e LOGIN_TOKEN='328129,a8471a019745cb5c298bc4bd6a41daaa' \
	--memory 134217728 --cpus 0.5 xiaokaixuan/tencent_ddns
```

### Docker Hub
> *https://hub.docker.com/r/xiaokaixuan/tencent_ddns*

