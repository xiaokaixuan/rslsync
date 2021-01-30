## Resilio Sync + File Browser + qBittorrentEE + 6Pan Server
## Aria2 + AriaNg

### Usage
> *rslsync*
```bash
docker run -d --name sync --restart=always \
    -v ~/sync_data:/sync_data -p8888:8888 -p55555:55555 -p55555:55555/udp xiaokaixuan/rslsync
```
> *6panserver*
```bash
docker run -d --name 6panserver \
    --restart always -p 29375:29375 \
    -v /path/to/downloads:/downloads xiaokaixuan/6panserver [-password=0123456789123456]
```
> *filebrowser*
```bash
docker run -d --name filebrowser \
    --restart always -v /path/to/root:/srv -p80:80 xiaokaixuan/filebrowser
```
> *qbittorrent_ee*
```bash
docker run -d --name qbittorrent \
    -e WEBUI_PORT=8080 --restart always \
    -p 6881:6881 -p 6881:6881/udp -p 8080:8080 \
    -v /path/to/config:/config -v /path/to/downloads:/downloads xiaokaixuan/qbittorrent_ee
```
> *Aria2 + AriaNg*
```bash
docker run -d --name aria2_ng --restart always \
    -v /path/to/downloads:/downloads -p 6800:6800 -p 80:80 xiaokaixuan/aria2_ng
```

### Build
```bash
docker build -t xiaokaixuan/rslsync:amd64 .
docker build -t xiaokaixuan/rslsync:arm64 -f Dockerfile.arm64 .
docker push xiaokaixuan/rslsync:amd64
docker push xiaokaixuan/rslsync:arm64

docker manifest create xiaokaixuan/rslsync xiaokaixuan/rslsync:amd64 xiaokaixuan/rslsync:arm64 --amend
docker manifest push xiaokaixuan/rslsync
```

### Docker Hub
> *https://hub.docker.com/r/xiaokaixuan/rslsync*

