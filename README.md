# Camaro Redis

Redis client for node, support resp3 and all commands of redis.

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
