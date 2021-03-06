# 小程序  undefined

## 吃饭 (摇一摇)

 - 南北大战，依据南北饮食差异 与设置一些特色菜单
   - 北方战队
   - 南方战队
 - 某某 专属，需要专属码验证，可自定义，保存至服务器
 - 个人专属，用户自定义菜单
   - 蓄谋已久，保存至服务端
   - 临时起意，保存至客户端 10分钟

## 木鱼

 - 敲木鱼
   - 记录次数，每秒最多两次次
   - 播放声音

 - 排行榜
   - 前十名，不同称号
   - 刘*一
   - 陈*二
   - 张*三
   - 李*四
   - 王*五
   - 赵*六
   - 孙*七
   - 周*八
   - 吴*九
   - 郑*十


# 小程序 + 云开发

## 云开发 quickstart

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

### 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

## 数据库

菜单集合
```typeScript
Array<{
  _id: string; // 系统生成
  type: 'public' | 'private' | 'vip'; // public: 所有人都可以查看；private: 个人自定义数据；code: 专属码匹配可查看
  vipCode: string | null; // 专属码，非专属菜单则为 null
  userId: string | null; // 用户 openId，若非私有 则为 null
  name: string; // 菜单分类 名称
  menu: Array<string>; // 菜单内容
}>
```

专属码用户
```typescript
// 若无专属码，则不在此记录
Array<{
  _id: string; // 系统生成
  userId: string; // 用户 openId
  vipCode: Array<string>; // 此用户可使用的 专属码
}>
```
