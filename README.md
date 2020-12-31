# Camaro Redis

[![Azure DevOps builds](https://img.shields.io/azure-devops/build/camarojs/redis/1)](https://dev.azure.com/camarojs/redis/_build/latest?definitionId=1)
[![Azure DevOps coverage](https://img.shields.io/azure-devops/coverage/camarojs/redis/1)](https://dev.azure.com/camarojs/redis/_build/latest?definitionId=1)
[![npm](https://img.shields.io/npm/dm/@camaro/redis)](https://www.npmjs.com/package/@camaro/redis)
[![GitHub stars](https://img.shields.io/github/stars/camarojs/redis)](https://github.com/camarojs/redis/stargazers)

Redis client for node, support resp3 and all commands of redis.

**Note**:
> Currently only resp3 is supported.

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
