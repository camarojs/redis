# Camaro Redis 文档

## 快速开始

### 安装

```bash
npm install @camaro/redis
```

### 使用

```js
// 如果你想使用resp2，将`ClientV3`改为`ClientV2`
const { ClientV3: Client } = require('@camaro/redis')
const client = new Client();

client.SET('foo', 'foo').then(() => {
    return client.GET('foo')
}).then(reply => {
    console.log(reply) // 'foo'
})

// 或者使用 async/await 。
await client.SET('bar', 'bar')
const reply = await client.GET('bar')
console.log(reply) // 'bar'
```

### 客户端选项

| 选项 | 默认值 | 说明 |
| --- | --- | --- |
| host | 127.0.0.1 | redis服务器的地址。 |
| port | 6379 | redis服务器的端口。 |
| username | default | 连接服务器使用的用户名。 |
| password | null | 连接服务器使用的密码。 |
| db | 0 | 如果设置了，会执行 `SELECT` 命令切换到对应的数据库。 |
| reconnection | true | 发生错误时是否重新连接。 |

## API 说明

### Client 构造函数

类 `Client` 可以使用提供 `Options`参数 的构造函数。

### redis 命令

所有的 redis 命令都可以这样使用：

```js
const client = new Client();
client.SET(...args);
client.GET(...args);
// ... other commands
```

查看完整 redis 命令列表: [https://redis.io/commands](https://redis.io/commands)。

### Events

+ `message`: 查看 [Pub/Sub](#Pub/Sub)。
+ `error`: 发生连接错误时触发。
+ `connect`: 成功建立socket连接时触发。

### Pub/Sub

可以通过注册 `message` 事件，接收来自 `pub/sub` 的消息。

如果你使用 resp2，需要实例化一个新的客户端来接收消息。

```js
const client = new Client();
client.SUBSCRIBE('test');
client.on('message', (data)=>{
    // data: ['message','somechannel','this is the message']
    console.log(data);    
})
```