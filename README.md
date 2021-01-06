# Camaro Redis

[![Azure DevOps builds](https://img.shields.io/azure-devops/build/camarojs/redis/1)](https://dev.azure.com/camarojs/redis/_build/latest?definitionId=1)
[![Azure DevOps coverage](https://img.shields.io/azure-devops/coverage/camarojs/redis/1)](https://dev.azure.com/camarojs/redis/_build/latest?definitionId=1)
[![npm](https://img.shields.io/npm/dm/@camaro/redis)](https://www.npmjs.com/package/@camaro/redis)
[![GitHub stars](https://img.shields.io/github/stars/camarojs/redis)](https://github.com/camarojs/redis/stargazers)

Redis client for node, support resp3 and all commands of redis.

**NOTE**:
> Camaro Redis only support redis 6.0 or later, and protocol version 3.

## Features

The first redis client to support [resp3](https://github.com/antirez/RESP3/blob/master/spec.md) .

+ All commands of redis support.
+ All command results return promise.
+ Support for ES6 types, such as Map and Set.

## Quick Start

### Install

```bash
npm install @camaro/redis
```

### Usage

```js
const { Client } = require('redis')
const client = new Client();

client.SET('foo', 'foo').then(() => {
    return client.GET('foo')
}).then(reply => {
    console.log(reply) // 'foo'
})

// if you want to use async/await
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
| password | null | Password of redis client. |

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

### Pub/Sub

You can receive `pub/sub` message by `message` event and handle it in the callback function.

```js
const client = new Client();
client.on('message', (data)=>{
    // data: ['pubsub','message','somechannel','this is the message']
    console.log(data);    
})
```
