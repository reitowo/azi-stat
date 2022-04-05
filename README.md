## [网站 >>](https://阿梓.我爱你)

基于React，目前实现了歌回统计，欢迎一起建设

## API列表
欢迎提供新想法

### 分批获取所有直播场次（时间顺序）
- GET https://api.schwarzer.wang/azi/broadcasts?skip={}&take={}

`skip` **必填** 起始Index

`take` **必填** 获取数量 (<=50)

`omitNone` **选填** 是否忽略没有唱歌的场次

--------
### 获取指定直播歌曲记录
- GET https://api.schwarzer.wang/azi/songs?broadcast={}

`broadcast` **必填** 直播场次ID

--------
### 搜索指定歌曲名的所有直播场次
- GET https://api.schwarzer.wang/azi/search?q={} 

`q` **必填** 歌曲名

---

### 搜索可能的歌曲名列表

- GET https://api.schwarzer.wang/azi/search/pre?q={} 

`q` **必填** 名称
