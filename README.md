# Camaro Redis

[![Azure DevOps builds](https://img.shields.io/azure-devops/build/camarojs/redis/1)](https://dev.azure.com/camarojs/redis/_build/latest?definitionId=1)
[![Azure DevOps coverage](https://img.shields.io/azure-devops/coverage/camarojs/redis/1)](https://dev.azure.com/camarojs/redis/_build/latest?definitionId=1)
[![npm](https://img.shields.io/npm/dm/@camaro/redis)](https://www.npmjs.com/package/@camaro/redis)
[![GitHub stars](https://img.shields.io/github/stars/camarojs/redis)](https://github.com/camarojs/redis/stargazers)

[中文文档说明](./doc/zh-CN.md)

Redis client for node, support resp2/3, redis6, and all commands of redis.

## Features

The first redis client to support [resp3](https://github.com/antirez/RESP3/blob/master/spec.md) .

+ All commands of redis support.
+ All command results return promise.
+ Support for ES6 types, such as Map and Set.
+ Support for TLS.

## Quick Start

### Install

```bash
npm install @camaro/redis
```

### Usage

```js
// If you want to use resp2 ,change `ClientV3` to `ClientV2`.
const { ClientV3: Client } = require('@camaro/redis')
const client = new Client();

client.SET('foo', 'foo').then(() => {
    return client.GET('foo')
}).then(reply => {
    console.log(reply) // 'foo'
})

// Or if you want to use async/await.
await client.SET('bar', 'bar')
const reply = await client.GET('bar')
console.log(reply) // 'bar'
```

### Client Options

| Option | Default | Description |
| --- | --- | --- |
| host | 127.0.0.1 | IP address of the redis server. |
| port | 6379 | Port of the redis server. |
| username | default | Username of redis client. |
| password | undefined | Password of redis client. |
| db | 0 | If set, client will run `SELECT` command on connect. |
| reconnection | true | Whether to reconnect when an error occurs. |
| logger | undefined | Provide a callback function to process commands log. |
| tls | undefined | Object passed as options to [tls.connect()](https://nodejs.org/api/tls.html#tls_tls_connect_options_callback). |

## API Reference

### Client.Constructor

The `Client` class has a constructor that can pass `Options`.

### Commands

All redis command can be used like this:

```js
const client = new Client();
client.SET(...args);
client.GET(...args);
// ... other commands
```

See the complete command list: [https://redis.io/commands](https://redis.io/commands) .

### Events

+ `message`: See [Pub/Sub](#Pub/Sub)
+ `error`: Emitted when a error occurs.
+ `connect`: Emitted when the client is established. Commands issued before the `connect` event are queued, then replayed just before this event is emitted.

### Pub/Sub

You can receive `pub/sub` message by `message` event and handle it in the callback function.

If you are using the resp2, you need to create a new client to receive messages.

```js
const client = new Client();
client.SUBSCRIBE('test');
client.on('message', (data)=>{
    // data: ['message','somechannel','this is the message']
    console.log(data);    
})
```
