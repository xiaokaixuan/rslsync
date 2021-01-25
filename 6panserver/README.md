## 6Pan Server

### Build
```bash
docker build -t xiaokaixuan/6panserver:amd64 .
docker build -t xiaokaixuan/6panserver:arm64 -f Dockerfile.arm64 .
docker push xiaokaixuan/6panserver:amd64
docker push xiaokaixuan/6panserver:arm64

docker manifest create xiaokaixuan/6panserver xiaokaixuan/6panserver:amd64 xiaokaixuan/6panserver:arm64 --amend
docker manifest push xiaokaixuan/6panserver
```

### Usage

```bash
docker run -d --name 6panserver \
    --restart always -p 29375:29375 \
    -v /path/to/downloads:/downloads xiaokaixuan/6panserver [-password=0123456789123456]
```

### Docker Hub
> *https://hub.docker.com/r/xiaokaixuan/6panserver*
