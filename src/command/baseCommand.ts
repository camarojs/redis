export interface IBaseCommand {
    ACL(subcommand: 'load'): Promise<void>;
    ACL(subcommand: 'save'): Promise<void>;
    ACL(subcommand: 'list'): Promise<string[]>;
    ACL(subcommand: 'users'): Promise<string[]>;
    ACL<T>(subcommand: 'getuser', username: string): Promise<T[]>;
    ACL(subcommand: 'setuser', username: string, ...rule: string[]): Promise<void>;
    ACL(subcommand: 'deluser', ...username: string[]): Promise<number>;
    ACL(subcommand: 'cat', categoryname?: string): Promise<string[]>;
    ACL(subcommand: 'genpass', bits?: number): Promise<string>;
    ACL(subcommand: 'whoami'): Promise<string>;
    ACL(subcommand: 'log', count: number): Promise<string[]>;
    ACL(subcommand: 'log', reset: 'reset'): Promise<void>;
    ACL(subcommand: 'help'): Promise<string[]>;

    APPEND(key: string, value: string): Promise<number>;

    AUTH(password: string): Promise<void>;
    AUTH(username: string, password: string): Promise<void>;

    BGREWRITEAOF(): Promise<void>;

    BGSAVE(schedule?: unknown): Promise<void>;

    BITCOUNT(key: string, start?: number, end?: number): Promise<number>;

    BITFIELD(key: string, subcommand: 'get', type: string, offset: number): Promise<number[]>;
    BITFIELD(key: string, subcommand: 'set', type: string, offset: number, value: string): Promise<number[]>;
    BITFIELD(key: string, subcommand: 'incrby', type: string, offset: number, increment: string): Promise<number[]>;
    BITFIELD(key: string, subcommand: 'overflow', behavior: 'wrap' | 'sat' | 'fail'): Promise<number[]>;
    BITFIELD_RO<T>(...arg: string[]): Promise<T>;

    BITOP(operation: 'and' | 'or' | 'xor' | 'not', destkey: 'destkey', ...key: string[]): Promise<number[]>;

    BITPOS(key: string, bit: number, start?: number, end?: number): Promise<number>;

    BLPOP<T extends string[]>(...arg: [...T, number]): Promise<string[] | number | null>;

    BRPOP<T extends string[]>(...arg: [...T, number]): Promise<string[] | number | null>;

    BRPOPLPUSH(source: string, destination: string, timeout: number): Promise<string | null>;

    BLMOVE(source: string, destination: string, whereto: 'left' | 'right', wherefrom: 'left' | 'right', timeout: number): Promise<string | null>

    BZPOPMIN<T extends string[]>(...arg: [...T, number]): Promise<string[] | null>;

    BZPOPMAX<T extends string[]>(...arg: [...T, number]): Promise<string[] | null>;

    CLIENT(subcommand: 'caching', mode: 'yes' | 'no'): Promise<void>;
    CLIENT(subcommand: 'id'): Promise<number>;
    CLIENT(subcommand: 'info'): Promise<string>;
    CLIENT(subcommand: 'kill', ip: string, port: number): Promise<void>;
    CLIENT(subcommand: 'kill', way: 'id', clientId: number): Promise<number>;
    CLIENT(subcommand: 'kill', way: 'type', type: 'normal' | 'master' | 'slave' | 'pubsub'): Promise<number>;
    CLIENT(subcommand: 'kill', way: 'user', username: string): Promise<number>;
    CLIENT(subcommand: 'kill', way: 'addr', ipport: string): Promise<number>;
    CLIENT(subcommand: 'kill', way: 'skipme', mode: 'yes' | 'no'): Promise<number>;
    CLIENT(subcommand: 'list', way: 'type', type: 'normal' | 'master' | 'slave' | 'pubsub'): Promise<string>;
    CLIENT(subcommand: 'list', way: 'id', clientId: number[]): Promise<string>;
    CLIENT(subcommand: 'getname'): Promise<string | null>;
    CLIENT(subcommand: 'getredir'): Promise<number>;
    CLIENT(subcommand: 'unpause'): Promise<void>;
    CLIENT(subcommand: 'pause', timeout: number, mode: 'write' | 'all'): Promise<void>;
    CLIENT(subcommand: 'reply', mode: 'on' | 'off' | 'skip'): Promise<void>;
    CLIENT(subcommand: 'setname', name: string): Promise<void>;
    CLIENT(subcommand: 'tracking', mode: 'on' | 'off', ...arg: string[]): Promise<void>;
    CLIENT<T>(subcommand: 'trackinginfo'): Promise<T>;
    CLIENT(subcommand: 'unblock', clientId: number, behavior: 'timeout' | 'error'): Promise<number>;

    CLUSTER(subcommand: 'addslots', ...slot: string[]): Promise<void>;
    CLUSTER(subcommand: 'bumpepoch'): Promise<string>;
    CLUSTER(subcommand: 'count-failure-reports', nodeId: string): Promise<number>;
    CLUSTER(subcommand: 'countkeysinslot'): Promise<number>;
    CLUSTER(subcommand: 'delslots', ...slot: string[]): Promise<void>;
    CLUSTER(subcommand: 'failover', option: 'force' | 'takeover'): Promise<void>;
    CLUSTER(subcommand: 'flushslots'): Promise<void>;
    CLUSTER(subcommand: 'forget', nodeId: string): Promise<void>;
    CLUSTER(subcommand: 'getkeysinslot', slot: string, count: number): Promise<string[]>;
    CLUSTER(subcommand: 'info'): Promise<string>;
    CLUSTER(subcommand: 'keyslot', key: string): Promise<number>;
    CLUSTER(subcommand: 'meet', ip: string, port: number): Promise<number>;
    CLUSTER(subcommand: 'myid'): Promise<string>;
    CLUSTER(subcommand: 'nodes'): Promise<string>;
    CLUSTER(subcommand: 'replicate', nodeId: string): Promise<void>;
    CLUSTER(subcommand: 'reset', type: 'hard' | 'soft'): Promise<void>;
    CLUSTER(subcommand: 'saveconfig'): Promise<void>;
    CLUSTER(subcommand: 'set-config-epoch'): Promise<void>;
    CLUSTER(subcommand1: 'setslot', slot: string, subcommand2: 'importing' | 'migrating' | 'stable' | 'node', nodeId?: string): Promise<void>;
    CLUSTER(subcommand: 'slaves', nodeId: string): Promise<string>;
    CLUSTER(subcommand: 'replicas', nodeId: string): Promise<string>;
    CLUSTER<T>(subcommand: 'slots'): Promise<T>;

    COMMAND<T>(): Promise<T>;
    COMMAND(subcommand: 'count'): Promise<number>;
    COMMAND(subcommand: 'getkeys'): Promise<string[]>;
    COMMAND<T>(subcommand: 'info', ...name: string[]): Promise<T>;

    CONFIG(subcommand: 'get', parameter: string): Promise<string[]>;
    CONFIG(subcommand: 'rewrite'): Promise<void>;
    CONFIG(subcommand: 'set', parameter: string, value: string): Promise<void>;
    CONFIG(subcommand: 'resetstat'): Promise<void>;

    COPY(source: string, destination: string, ...arg: string[]): Promise<number>;

    DBSIZE(): Promise<number>;

    DEBUG(subcommand: 'object', key: string): Promise<string>;
    DEBUG(subcommand: 'segfault'): Promise<string>;

    DECR(key: string): Promise<number>;

    DECRBY(key: string, decrement: number): Promise<number>;

    DEL(...key: string[]): Promise<number>;

    DISCARD(): Promise<void>;

    DUMP(key: string): Promise<string>;

    ECHO(message: string): Promise<string>;

    EVAL(script: string, numkeys: number, ...arg: string[]): Promise<string>;

    EVALSHA(sha1: string, numkeys: number, ...arg: string[]): Promise<string>;

    EXEC(): Promise<string[]>;

    EXISTS(...key: string[]): Promise<number>;

    EXPIRE(key: string, seconds: number): Promise<number>;

    EXPIREAT(key: string, timestamp: number): Promise<number>;

    FAILOVER(subcommand: 'to', host: string, port: number, force?: boolean): Promise<void>;
    FAILOVER(subcommand: 'abort'): Promise<void>;
    FAILOVER(subcommand: 'timeout', milliseconds: number): Promise<void>;

    FLUSHALL(mode?: 'async' | 'sync'): Promise<void>;

    FLUSHDB(mode?: 'async' | 'sync'): Promise<void>;

    GEOADD(key: string, ...arg: string[]): Promise<number>;

    GEOHASH(key: string, ...member: string[]): Promise<string[]>;

    GEOPOS(key: string, ...member: string[]): Promise<string[]>;

    GEODIST(key: string, member1: string, member2: string, unit: 'm' | 'km' | 'mi' | 'ft'): Promise<string[]>;

    GEORADIUS(...arg: string[]): Promise<string[]>;
    GEORADIUS_RO<T>(...arg: string[]): Promise<T>;

    GEORADIUSBYMEMBER(...arg: string[]): Promise<string[]>;
    GEORADIUSBYMEMBER_RO<T>(...arg: string[]): Promise<T>;

    GEOSEARCH(...arg: string[]): Promise<string[]>;

    GEOSEARCHSTORE(...arg: string[]): Promise<string[]>;

    GET(key: string): Promise<string>;

    GETBIT(key: string, offset: number): Promise<number>;

    GETDEL(key: string): Promise<string | null>;

    GETEX(key: string, option: 'ex', seconds: number): Promise<string | null>;
    GETEX(key: string, option: 'px', milliseconds: number): Promise<string | null>;
    GETEX(key: string, option: 'exat', timestamp: number): Promise<string | null>;
    GETEX(key: string, option: 'pxat', millisecondsTimestamp: number): Promise<string | null>;
    GETEX(key: string, option: 'persist'): Promise<string | null>;

    GETRANGE(key: string, start: number, end: number): Promise<string>;

    GETSET(key: string, value: string): Promise<string | null>;

    HDEL(key: string, ...field: string[]): Promise<number>;

    HELLO(protover: number): Promise<void>;
    HELLO(protover: number, option: 'auth', password: string): Promise<void>;
    HELLO(protover: number, option: 'auth', username: string, password: string): Promise<void>;
    HELLO(protover: number, option: 'setname', clientname: string): Promise<void>;

    HEXISTS(key: string, field: string): Promise<number>;

    HGET(key: string, field: string): Promise<string | null>;

    HINCRBY(key: string, field: string, increment: number): Promise<number>;

    HINCRBYFLOAT(key: string, field: string, increment: number): Promise<string>;

    HKEYS(key: string): Promise<string[]>;

    HLEN(key: string): Promise<number>;

    HMGET(key: string, ...field: string[]): Promise<string[]>;

    HMSET(key: string, ...fieldValue: string[]): Promise<number>;

    HSET(key: string, ...fieldValue: string[]): Promise<number>;

    HSETNX(key: string, field: string, value: string): Promise<number>;

    HRANDFIELD(key: string): Promise<string | null>;
    HRANDFIELD(key: string, count: number, withvalues?: 'withvalues'): Promise<string[]>;

    HSCAN(key: string, cursor: number): Promise<[string, string[]]>;
    HSCAN(key: string, cursor: number, option1: 'match', pattern: string): Promise<[string, string[]]>;
    HSCAN(key: string, cursor: number, option1: 'count', count: number): Promise<[string, string[]]>;
    HSCAN(key: string, cursor: number, option1: 'match', pattern: string, option2: 'count', count: number): Promise<[string, string[]]>;

    HSTRLEN(key: string, field: string): Promise<number>;

    HVALS(key: string, field: string): Promise<string[]>;

    INCR(key: string, field: string): Promise<string[]>;

    INCRBY(key: string, field: string, increment: string): Promise<number>;

    INCRBYFLOAT(key: string, field: string, increment: string): Promise<number>;

    INFO(
        section?: 'all' | 'default' | 'everything' | 'server' | 'clients' | 'memory'
        | 'persistence' | 'stats' | 'replication' | 'cpu' | 'commandstats' | 'cluster'
        | 'modules' | 'keyspace' | 'errorstats'
    ): Promise<string>;

    KEYS(pattern: string): Promise<string[]>;

    LATENCY(subcommand: 'doctor'): Promise<string>;
    LATENCY(subcommand: 'graph', event: string): Promise<string>;
    LATENCY(subcommand: 'history', event: string): Promise<[number, number][]>;
    LATENCY<T>(subcommand: 'latest', event: string): Promise<T[]>;
    LATENCY(subcommand: 'reset', ...event: string[]): Promise<number>;
    LATENCY(subcommand: 'help'): Promise<string[]>;

    LOLWUT(): Promise<string>;
    LOLWUT(subcommand: 'version', version: number): Promise<string>;

    LASTSAVE(): Promise<number>;

    LINDEX(key: string, index: number): Promise<string | null>;

    LINSERT(key: string, pos: 'before' | 'after', pivot: string, element: string): Promise<number>;

    LLEN(key: string): Promise<number>;

    LMOVE(source: string, destination: string, whereto: 'left' | 'right', wherefrom: 'left' | 'right'): Promise<string | null>

    LPOP(key: string): Promise<string | null>;

    LPOS(key: string, element: string, ...arg: string[]): Promise<string[] | number | null>;

    LPUSH(key: string, ...element: string[]): Promise<number>;

    LPUSHX(key: string, ...element: string[]): Promise<number>;

    LRANGE(key: string, start: number, end: number): Promise<string[]>;

    LREM(key: string, count: number, element: string): Promise<number>;

    LSET(key: string, index: number, element: string): Promise<string>;

    LTRIM(key: string, start: number, stop: number): Promise<string>;

    MEMORY(subcommand: 'doctor'): Promise<string>;
    MEMORY(subcommand: 'help'): Promise<string[]>;
    MEMORY(subcommand: 'malloc-stats'): Promise<string>;
    MEMORY(subcommand: 'purge'): Promise<string>;
    MEMORY(subcommand: 'stats'): Promise<string>;
    MEMORY(subcommand: 'usage', key: string): Promise<number>;
    MEMORY(subcommand: 'usage', key: string, option: 'samples', count: number): Promise<number>;

    MGET(...key: string[]): Promise<string[]>;

    MIGRATE(...arg: string[]): Promise<string>;

    MODULE(subcommand: 'list'): Promise<{ name: string, ver: string }[]>;
    MODULE(subcommand: 'load', path: string, ...arg: string[]): Promise<void>;
    MODULE(subcommand: 'unload', name: string): Promise<void>;

    MONITOR(): Promise<void>;

    MOVE(key: string, db: number): Promise<void>;

    MSET(key: string, value: string, ...arg: string[]): Promise<void>;

    MSETNX(key: string, value: string, ...arg: string[]): Promise<number>;

    MULTI(): Promise<void>;

    OBJECT(subcommand: 'refcount', key: string): Promise<number>;
    OBJECT(subcommand: 'encoding', key: string): Promise<string>;
    OBJECT(subcommand: 'idletime', key: string): Promise<number>;
    OBJECT(subcommand: 'freq', key: string): Promise<string>;
    OBJECT(subcommand: 'help'): Promise<string>;

    PERSIST(key: string): Promise<number>;

    PEXPIRE(key: string, milliseconds: number): Promise<number>;

    PEXPIREAT(key: string, millisecondsTimestamp: number): Promise<number>;

    PFADD(key: string, ...element: string[]): Promise<number>;

    PFCOUNT(...key: string[]): Promise<number>;

    PFMERGE(destkey: string, ...sourcekey: string[]): Promise<void>;

    PING(message?: string): Promise<string>;

    PSETEX(key: string, milliseconds: number, value: string): Promise<void>;

    PSUBSCRIBE(...pattern: string[]): Promise<void>;

    PUBSUB(subcommand: 'channels', pattern?: string): Promise<string[]>;
    PUBSUB(subcommand: 'numsub', ...channel: string[]): Promise<string[]>;
    PUBSUB(subcommand: 'numpat'): Promise<number>;

    PTTL(key: string): Promise<number>;

    PUBLISH(channel: string, message: string): Promise<number>;

    PUNSUBSCRIBE(...pattern: string[]): Promise<number>;

    QUIT(): Promise<void>;

    RANDOMKEY(): Promise<string | null>;

    READONLY(): Promise<void>;

    READWRITE(): Promise<void>;

    RENAME(key: string, newkey: string): Promise<void>;

    RENAMENX(key: string, newkey: string): Promise<number>;

    REPLICAOF(host: string, port: number): Promise<void>;

    RESET(): Promise<void>;

    RESTORE(key: string, ttl: number, serializedValue: string, ...arg: string[]): Promise<void>;

    ROLE<T>(): Promise<T[]>;

    RPOP(key: string): Promise<string | null>;
    RPOP(key: string, count: number): Promise<string[] | null>;

    RPOPLPUSH(source: string, destination: string): Promise<string>;

    RPUSH(key: string, ...element: string[]): Promise<number>;

    RPUSHX(key: string, ...element: string[]): Promise<number>;

    SADD(key: string, ...member: string[]): Promise<number>;

    SAVE(): Promise<void>;

    SCAN(cursor: number): Promise<[string, string[]]>;
    SCAN(cursor: number, option1: 'match', pattern: string): Promise<[string, string[]]>;
    SCAN(cursor: number, option1: 'count', count: number): Promise<[string, string[]]>;
    SCAN(cursor: number, option1: 'type', type: string): Promise<[string, string[]]>;
    SCAN(cursor: number, option1: 'match', pattern: string, option2: 'count', count: number): Promise<[string, string[]]>;
    SCAN(cursor: number, option1: 'match', pattern: string, option2: 'type', type: string): Promise<[string, string[]]>;
    SCAN(cursor: number, option1: 'count', count: number, option2: 'type', type: string): Promise<[string, string[]]>;
    SCAN(cursor: number, option1: 'match', pattern: string, option2: 'count', count: number, option3: 'type', type: string): Promise<[string, string[]]>;

    SCARD(key: string): Promise<number>;

    SCRIPT(subcommand: 'debug', mode: 'yes' | 'sync' | 'no'): Promise<void>;
    SCRIPT(subcommand: 'exists', ...sha1: string[]): Promise<number[]>;
    SCRIPT(subcommand: 'flush', modifier?: 'async' | 'sync'): Promise<void>;
    SCRIPT(subcommand: 'kill'): Promise<void>;
    SCRIPT(subcommand: 'load', script: string): Promise<string>;

    SDIFF(...key: string[]): Promise<string[]>;

    SDIFFSTORE(destination: string, ...key: string[]): Promise<number>;

    SELECT(index: number): Promise<void>;

    SET(key: string, value: string, ...arg: string[]): Promise<string>;

    SETBIT(key: string, offset: number, value: string): Promise<number>;

    SETEX(key: string, seconds: number, value: string): Promise<void>;

    SETRANGE(key: string, offset: number, value: string): Promise<number>;

    SHUTDOWN(modifier?: 'save' | 'nosave'): Promise<number>;

    SINTER(...key: string[]): Promise<string>;

    SINTERSTORE(destination: string, ...key: string[]): Promise<number>;

    SISMEMBER(key: string, member: string): Promise<number>;

    SMISMEMBER(key: string, ...member: string[]): Promise<number[]>;

    SLAVEOF(host: string, port: number): Promise<void>;

    SLOWLOG<T>(...arg: string[]): Promise<T>;

    SMEMBERS(key: string): Promise<string[]>;

    SMOVE(key: string, source: string, destination: string, member: string): Promise<number>;

    SORT(key: string, ...arg: string[]): Promise<string[] | number>;

    SPOP(key: string): Promise<string | null>;
    SPOP(key: string, count: number): Promise<string[] | null>;

    SRANDMEMBER(key: string): Promise<string | null>;
    SRANDMEMBER(key: string, count: number): Promise<string[] | null>;

    SREM(key: string, ...member: string[]): Promise<number>;

    SSCAN(key: string, cursor: number): Promise<[string, string[]]>;
    SSCAN(key: string, cursor: number, option1: 'match', pattern: string): Promise<[string, string[]]>;
    SSCAN(key: string, cursor: number, option1: 'count', count: number): Promise<[string, string[]]>;
    SSCAN(key: string, cursor: number, option1: 'match', pattern: string, option2: 'count', count: number): Promise<[string, string[]]>;

    STRALGO<T>(subcommand: 'lcs', ...arg: string[]): Promise<T>;

    STRLEN(key: string): Promise<number>;

    SUBSCRIBE(...channel: string[]): Promise<void>;

    SUNION(...key: string[]): Promise<string[]>;

    SUNIONSTORE(destination: string, ...key: string[]): Promise<number>;

    SWAPDB(index1: number, index2: number,): Promise<void>;

    SYNC(): Promise<void>;

    PSYNC(replicationid: string, offset: string): Promise<void>;

    TIME(): Promise<string[]>;

    TOUCH(...key: string[]): Promise<number>;

    TTL(key: string): Promise<number>;

    TYPE(key: string): Promise<string | null>;

    UNSUBSCRIBE(...channel: string[]): Promise<void>;

    UNLINK(...key: string[]): Promise<number>;

    UNWATCH(): Promise<void>;

    WAIT(numreplicas: string, timeout: number): Promise<void>;

    WATCH(...key: string[]): Promise<void>;

    XADD(key: string, ...arg: string[]): Promise<string>;

    XACK(key: string, group: string, ...id: string[]): Promise<number>;

    XAUTOCLAIM<T>(key: string, group: string, consumer: string, minIdleIime: number, start: string, subcommand2?: 'JUSTID'): Promise<T>;
    XAUTOCLAIM<T>(key: string, group: string, consumer: string, minIdleIime: number, start: string, subcommand1: 'count', count: number, subcommand2?: 'JUSTID'): Promise<T>;

    XCLAIM<T>(key: string, group: string, consumer: string, ...arg: string[]): Promise<T>;

    XDEL(key: string, ...id: string[]): Promise<number>;

    XGROUP<T>(...arg: string[]): Promise<T>;

    XINFO<T>(...arg: string[]): Promise<T>;

    XLEN(key: string): Promise<number>;

    XPENDING<T>(key: string, group: string): Promise<T>;

    XRANGE<T>(key: string, start: number, end: number): Promise<T[]>;
    XRANGE<T>(key: string, start: number, end: number, option: 'count', count: number): Promise<T[]>;

    XREVRANGE(key: string, end: number, start: number): Promise<string[]>;
    XREVRANGE(key: string, end: number, start: number, option: 'count', count: number): Promise<string[]>;

    XREAD<T>(...arg: string[]): Promise<T[]>;

    XREADGROUP<T>(...arg: string[]): Promise<T[]>;

    XTRIM(key: string, subcommand: 'maxlen' | 'minid', ...arg: string[]): Promise<number>;

    ZADD(key: string, ...arg: string[]): Promise<number | string>;

    ZCARD(key: string): Promise<number>;

    ZCOUNT(key: string, min: number, max: number): Promise<number>;

    ZDIFF(numkeys: number, ...arg: string[]): Promise<string[]>;

    ZDIFFSTORE(destination: string, numkeys: number, ...key: string[]): Promise<number>;

    ZINCRBY(key: string, increment: number, member: string): Promise<string>;

    ZINTER(numkeys: number, ...arg: string[]): Promise<string[]>;

    ZINTERSTORE(destination: string, numkeys: number, ...key: string[]): Promise<number>;

    ZLEXCOUNT(key: string, min: number, max: number): Promise<number>;

    ZMSCORE(key: string, member: string): Promise<string>;

    ZPOPMAX(key: string, count?: number): Promise<number[]>;

    ZPOPMIN(key: string, count?: number): Promise<number[]>;

    ZRANDMEMBER(key: string): Promise<string | null>;
    ZRANDMEMBER(key: string, count: number, option?: 'withscores'): Promise<string[]>;

    ZRANGESTORE(dst: string, src: string, min: number, max: number, ...arg: string[]): Promise<number>;

    ZRANGE(key: string, min: number, max: number, ...arg: string[]): Promise<string[]>;

    ZRANGEBYLEX(key: string, min: number, max: number): Promise<string[]>;
    ZRANGEBYLEX(key: string, min: number, max: number, option: 'limit', offset: number, count: number): Promise<string[]>;

    ZREVRANGEBYLEX(key: string, min: number, max: number): Promise<string[]>;
    ZREVRANGEBYLEX(key: string, min: number, max: number, option: 'limit', offset: number, count: number): Promise<string[]>;

    ZRANGEBYSCORE(key: string, min: number, max: number): Promise<string[]>;
    ZRANGEBYSCORE(key: string, min: number, max: number, option: 'limit', offset: number, count: number): Promise<string[]>;
    ZRANGEBYSCORE(key: string, min: number, max: number, option: 'withscores'): Promise<string[]>;
    ZRANGEBYSCORE(key: string, min: number, max: number, option1: 'withscores', option2: 'limit', offset: number, count: number): Promise<string[]>;

    ZRANK(key: string, member: string): Promise<number | null>;

    ZREM(key: string, ...member: string[]): Promise<number>;

    ZREMRANGEBYLEX(key: string, min: number, max: number): Promise<number>;

    ZREMRANGEBYRANK(key: string, start: number, stop: number): Promise<number>;

    ZREMRANGEBYSCORE(key: string, min: number, max: number): Promise<number>;

    ZREVRANGE(key: string, start: number, stop: number, option: 'withscores'): Promise<string[]>;

    ZREVRANGEBYSCORE(key: string, min: number, max: number): Promise<string[]>;
    ZREVRANGEBYSCORE(key: string, min: number, max: number, option: 'limit', offset: number, count: number): Promise<string[]>;
    ZREVRANGEBYSCORE(key: string, min: number, max: number, option: 'withscores'): Promise<string[]>;
    ZREVRANGEBYSCORE(key: string, min: number, max: number, option1: 'withscores', option2: 'limit', offset: number, count: number): Promise<string[]>;

    ZREVRANK(key: string, member: string): Promise<number | null>;

    ZSCAN(key: string, cursor: number): Promise<[string, string[]]>;
    ZSCAN(key: string, cursor: number, option1: 'match', pattern: string): Promise<[string, string[]]>;
    ZSCAN(key: string, cursor: number, option1: 'count', count: number): Promise<[string, string[]]>;
    ZSCAN(key: string, cursor: number, option1: 'match', pattern: string, option2: 'count', count: number): Promise<[string, string[]]>;

    ZSCORE(key: string, member: string): Promise<string>;

    ZUNION<T>(numkeys: number, ...args: string[]): Promise<T>;

    ZUNIONSTORE(destination: string, numkeys: number, ...arg: string[]): Promise<number>;

    //#region No documentation 
    ASKING<T>(...arg: string[]): Promise<T>;
    'HOST:'<T>(...arg: string[]): Promise<T>;
    PFDEBUG<T>(...arg: string[]): Promise<T>;
    PFSELFTEST<T>(...arg: string[]): Promise<T>;
    POST<T>(...arg: string[]): Promise<T>;
    'RESTORE-ASKING'<T>(...arg: string[]): Promise<T>;
    REPLCONF<T>(...arg: string[]): Promise<T>;
    SUBSTR<T>(...arg: string[]): Promise<T>;
    XSETID<T>(...arg: string[]): Promise<T>;
    //#endregion
}