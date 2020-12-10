/**
 * Automatically generated on Thu Dec 10 2020 19:27:44 GMT+0800 (China Standard Time)
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ClientCommand {
    /**
     * Reload the ACLs from the configured ACL file
     */
    ACLLOAD<T>(): Promise<T>;
    /**
     * Save the current ACL rules in the configured ACL file
     */
    ACLSAVE<T>(): Promise<T>;
    /**
     * List the current ACL rules in ACL config file format
     */
    ACLLIST<T>(): Promise<T>;
    /**
     * List the username of all the configured ACL rules
     */
    ACLUSERS<T>(): Promise<T>;
    /**
     * Get the rules for a specific ACL user
     * @param args username
     */
    ACLGETUSER<T>(...args: any): Promise<T>;
    /**
     * Modify or create the rules for a specific ACL user
     * @param args username [rule [rule ...]]
     */
    ACLSETUSER<T>(...args: any): Promise<T>;
    /**
     * Remove the specified ACL users and the associated rules
     * @param args username [username ...]
     */
    ACLDELUSER<T>(...args: any): Promise<T>;
    /**
     * List the ACL categories or the commands inside a category
     * @param args [categoryname]
     */
    ACLCAT<T>(...args: any): Promise<T>;
    /**
     * Generate a pseudorandom secure password to use for ACL users
     * @param args [bits]
     */
    ACLGENPASS<T>(...args: any): Promise<T>;
    /**
     * Return the name of the user associated to the current connection
     */
    ACLWHOAMI<T>(): Promise<T>;
    /**
     * List latest events denied because of ACLs in place
     * @param args [count or RESET]
     */
    ACLLOG<T>(...args: any): Promise<T>;
    /**
     * Show helpful text about the different subcommands
     */
    ACLHELP<T>(): Promise<T>;
    /**
     * Append a value to a key
     * @param args key value
     */
    APPEND<T>(...args: any): Promise<T>;
    /**
     * Authenticate to the server
     * @param args [username] password
     */
    AUTH<T>(...args: any): Promise<T>;
    /**
     * Asynchronously rewrite the append-only file
     */
    BGREWRITEAOF<T>(): Promise<T>;
    /**
     * Asynchronously save the dataset to disk
     * @param args [SCHEDULE]
     */
    BGSAVE<T>(...args: any): Promise<T>;
    /**
     * Count set bits in a string
     * @param args key [start end]
     */
    BITCOUNT<T>(...args: any): Promise<T>;
    /**
     * Perform arbitrary bitfield integer operations on strings
     * @param args key [GET type offset] [SET type offset value] [INCRBY type offset increment] [OVERFLOW WRAP|SAT|FAIL]
     */
    BITFIELD<T>(...args: any): Promise<T>;
    /**
     * Perform bitwise operations between strings
     * @param args operation destkey key [key ...]
     */
    BITOP<T>(...args: any): Promise<T>;
    /**
     * Find first bit set or clear in a string
     * @param args key bit [start] [end]
     */
    BITPOS<T>(...args: any): Promise<T>;
    /**
     * Remove and get the first element in a list, or block until one is available
     * @param args key [key ...] timeout
     */
    BLPOP<T>(...args: any): Promise<T>;
    /**
     * Remove and get the last element in a list, or block until one is available
     * @param args key [key ...] timeout
     */
    BRPOP<T>(...args: any): Promise<T>;
    /**
     * Pop an element from a list, push it to another list and return it; or block until one is available
     * @param args source destination timeout
     */
    BRPOPLPUSH<T>(...args: any): Promise<T>;
    /**
     * Pop an element from a list, push it to another list and return it; or block until one is available
     * @param args source destination LEFT|RIGHT LEFT|RIGHT timeout
     */
    BLMOVE<T>(...args: any): Promise<T>;
    /**
     * Remove and return the member with the lowest score from one or more sorted sets, or block until one is available
     * @param args key [key ...] timeout
     */
    BZPOPMIN<T>(...args: any): Promise<T>;
    /**
     * Remove and return the member with the highest score from one or more sorted sets, or block until one is available
     * @param args key [key ...] timeout
     */
    BZPOPMAX<T>(...args: any): Promise<T>;
    /**
     * Instruct the server about tracking or not keys in the next request
     * @param args YES|NO
     */
    CLIENTCACHING<T>(...args: any): Promise<T>;
    /**
     * Returns the client ID for the current connection
     */
    CLIENTID<T>(): Promise<T>;
    /**
     * Returns information about the current client connection.
     */
    CLIENTINFO<T>(): Promise<T>;
    /**
     * Kill the connection of a client
     * @param args [ip:port] [ID client-id] [TYPE normal|master|slave|pubsub] [USER username] [ADDR ip:port] [SKIPME yes/no]
     */
    CLIENTKILL<T>(...args: any): Promise<T>;
    /**
     * Get the list of client connections
     * @param args [TYPE normal|master|replica|pubsub] [ID client-id [client-id ...]]
     */
    CLIENTLIST<T>(...args: any): Promise<T>;
    /**
     * Get the current connection name
     */
    CLIENTGETNAME<T>(): Promise<T>;
    /**
     * Get tracking notifications redirection client ID if any
     */
    CLIENTGETREDIR<T>(): Promise<T>;
    /**
     * Stop processing commands from clients for some time
     * @param args timeout
     */
    CLIENTPAUSE<T>(...args: any): Promise<T>;
    /**
     * Instruct the server whether to reply to commands
     * @param args ON|OFF|SKIP
     */
    CLIENTREPLY<T>(...args: any): Promise<T>;
    /**
     * Set the current connection name
     * @param args connection-name
     */
    CLIENTSETNAME<T>(...args: any): Promise<T>;
    /**
     * Enable or disable server assisted client side caching support
     * @param args ON|OFF [REDIRECT client-id] [PREFIX prefix [PREFIX prefix ...]] [BCAST] [OPTIN] [OPTOUT] [NOLOOP]
     */
    CLIENTTRACKING<T>(...args: any): Promise<T>;
    /**
     * Unblock a client blocked in a blocking command from a different connection
     * @param args client-id [TIMEOUT|ERROR]
     */
    CLIENTUNBLOCK<T>(...args: any): Promise<T>;
    /**
     * Assign new hash slots to receiving node
     * @param args slot [slot ...]
     */
    CLUSTERADDSLOTS<T>(...args: any): Promise<T>;
    /**
     * Advance the cluster config epoch
     */
    CLUSTERBUMPEPOCH<T>(): Promise<T>;
    /**
     * Return the number of failure reports active for a given node
     * @param args node-id
     */
    CLUSTERCOUNTFAILUREREPORTS<T>(...args: any): Promise<T>;
    /**
     * Return the number of local keys in the specified hash slot
     * @param args slot
     */
    CLUSTERCOUNTKEYSINSLOT<T>(...args: any): Promise<T>;
    /**
     * Set hash slots as unbound in receiving node
     * @param args slot [slot ...]
     */
    CLUSTERDELSLOTS<T>(...args: any): Promise<T>;
    /**
     * Forces a replica to perform a manual failover of its master.
     * @param args [FORCE|TAKEOVER]
     */
    CLUSTERFAILOVER<T>(...args: any): Promise<T>;
    /**
     * Delete a node's own slots information
     */
    CLUSTERFLUSHSLOTS<T>(): Promise<T>;
    /**
     * Remove a node from the nodes table
     * @param args node-id
     */
    CLUSTERFORGET<T>(...args: any): Promise<T>;
    /**
     * Return local key names in the specified hash slot
     * @param args slot count
     */
    CLUSTERGETKEYSINSLOT<T>(...args: any): Promise<T>;
    /**
     * Provides info about Redis Cluster node state
     */
    CLUSTERINFO<T>(): Promise<T>;
    /**
     * Returns the hash slot of the specified key
     * @param args key
     */
    CLUSTERKEYSLOT<T>(...args: any): Promise<T>;
    /**
     * Force a node cluster to handshake with another node
     * @param args ip port
     */
    CLUSTERMEET<T>(...args: any): Promise<T>;
    /**
     * Return the node id
     */
    CLUSTERMYID<T>(): Promise<T>;
    /**
     * Get Cluster config for the node
     */
    CLUSTERNODES<T>(): Promise<T>;
    /**
     * Reconfigure a node as a replica of the specified master node
     * @param args node-id
     */
    CLUSTERREPLICATE<T>(...args: any): Promise<T>;
    /**
     * Reset a Redis Cluster node
     * @param args [HARD|SOFT]
     */
    CLUSTERRESET<T>(...args: any): Promise<T>;
    /**
     * Forces the node to save cluster state on disk
     */
    CLUSTERSAVECONFIG<T>(): Promise<T>;
    /**
     * Set the configuration epoch in a new node
     * @param args config-epoch
     */
    CLUSTERSETCONFIGEPOCH<T>(...args: any): Promise<T>;
    /**
     * Bind a hash slot to a specific node
     * @param args slot IMPORTING|MIGRATING|STABLE|NODE [node-id]
     */
    CLUSTERSETSLOT<T>(...args: any): Promise<T>;
    /**
     * List replica nodes of the specified master node
     * @param args node-id
     */
    CLUSTERSLAVES<T>(...args: any): Promise<T>;
    /**
     * List replica nodes of the specified master node
     * @param args node-id
     */
    CLUSTERREPLICAS<T>(...args: any): Promise<T>;
    /**
     * Get array of Cluster slot to node mappings
     */
    CLUSTERSLOTS<T>(): Promise<T>;
    /**
     * Get array of Redis command details
     */
    COMMAND<T>(): Promise<T>;
    /**
     * Get total number of Redis commands
     */
    COMMANDCOUNT<T>(): Promise<T>;
    /**
     * Extract keys given a full Redis command
     */
    COMMANDGETKEYS<T>(): Promise<T>;
    /**
     * Get array of specific Redis command details
     * @param args command-name [command-name ...]
     */
    COMMANDINFO<T>(...args: any): Promise<T>;
    /**
     * Get the value of a configuration parameter
     * @param args parameter
     */
    CONFIGGET<T>(...args: any): Promise<T>;
    /**
     * Rewrite the configuration file with the in memory configuration
     */
    CONFIGREWRITE<T>(): Promise<T>;
    /**
     * Set a configuration parameter to the given value
     * @param args parameter value
     */
    CONFIGSET<T>(...args: any): Promise<T>;
    /**
     * Reset the stats returned by INFO
     */
    CONFIGRESETSTAT<T>(): Promise<T>;
    /**
     * Copy a key
     * @param args source destination [DB destination-db] [REPLACE]
     */
    COPY<T>(...args: any): Promise<T>;
    /**
     * Return the number of keys in the selected database
     */
    DBSIZE<T>(): Promise<T>;
    /**
     * Get debugging information about a key
     * @param args key
     */
    DEBUGOBJECT<T>(...args: any): Promise<T>;
    /**
     * Make the server crash
     */
    DEBUGSEGFAULT<T>(): Promise<T>;
    /**
     * Decrement the integer value of a key by one
     * @param args key
     */
    DECR<T>(...args: any): Promise<T>;
    /**
     * Decrement the integer value of a key by the given number
     * @param args key decrement
     */
    DECRBY<T>(...args: any): Promise<T>;
    /**
     * Delete a key
     * @param args key [key ...]
     */
    DEL<T>(...args: any): Promise<T>;
    /**
     * Discard all commands issued after MULTI
     */
    DISCARD<T>(): Promise<T>;
    /**
     * Return a serialized version of the value stored at the specified key.
     * @param args key
     */
    DUMP<T>(...args: any): Promise<T>;
    /**
     * Echo the given string
     * @param args message
     */
    ECHO<T>(...args: any): Promise<T>;
    /**
     * Execute a Lua script server side
     * @param args script numkeys key [key ...] arg [arg ...]
     */
    EVAL<T>(...args: any): Promise<T>;
    /**
     * Execute a Lua script server side
     * @param args sha1 numkeys key [key ...] arg [arg ...]
     */
    EVALSHA<T>(...args: any): Promise<T>;
    /**
     * Execute all commands issued after MULTI
     */
    EXEC<T>(): Promise<T>;
    /**
     * Determine if a key exists
     * @param args key [key ...]
     */
    EXISTS<T>(...args: any): Promise<T>;
    /**
     * Set a key's time to live in seconds
     * @param args key seconds
     */
    EXPIRE<T>(...args: any): Promise<T>;
    /**
     * Set the expiration for a key as a UNIX timestamp
     * @param args key timestamp
     */
    EXPIREAT<T>(...args: any): Promise<T>;
    /**
     * Remove all keys from all databases
     * @param args [ASYNC]
     */
    FLUSHALL<T>(...args: any): Promise<T>;
    /**
     * Remove all keys from the current database
     * @param args [ASYNC]
     */
    FLUSHDB<T>(...args: any): Promise<T>;
    /**
     * Add one or more geospatial items in the geospatial index represented using a sorted set
     * @param args key longitude latitude member [longitude latitude member ...]
     */
    GEOADD<T>(...args: any): Promise<T>;
    /**
     * Returns members of a geospatial index as standard geohash strings
     * @param args key member [member ...]
     */
    GEOHASH<T>(...args: any): Promise<T>;
    /**
     * Returns longitude and latitude of members of a geospatial index
     * @param args key member [member ...]
     */
    GEOPOS<T>(...args: any): Promise<T>;
    /**
     * Returns the distance between two members of a geospatial index
     * @param args key member1 member2 [m|km|ft|mi]
     */
    GEODIST<T>(...args: any): Promise<T>;
    /**
     * Query a sorted set representing a geospatial index to fetch members matching a given maximum distance from a point
     * @param args key longitude latitude radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count] [ASC|DESC] [STORE key] [STOREDIST key]
     */
    GEORADIUS<T>(...args: any): Promise<T>;
    /**
     * Query a sorted set representing a geospatial index to fetch members matching a given maximum distance from a member
     * @param args key member radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count] [ASC|DESC] [STORE key] [STOREDIST key]
     */
    GEORADIUSBYMEMBER<T>(...args: any): Promise<T>;
    /**
     * Get the value of a key
     * @param args key
     */
    GET<T>(...args: any): Promise<T>;
    /**
     * Returns the bit value at offset in the string value stored at key
     * @param args key offset
     */
    GETBIT<T>(...args: any): Promise<T>;
    /**
     * Get a substring of the string stored at a key
     * @param args key start end
     */
    GETRANGE<T>(...args: any): Promise<T>;
    /**
     * Set the string value of a key and return its old value
     * @param args key value
     */
    GETSET<T>(...args: any): Promise<T>;
    /**
     * Delete one or more hash fields
     * @param args key field [field ...]
     */
    HDEL<T>(...args: any): Promise<T>;
    /**
     * switch Redis protocol
     * @param args protover [AUTH username password] [SETNAME clientname]
     */
    HELLO<T>(...args: any): Promise<T>;
    /**
     * Determine if a hash field exists
     * @param args key field
     */
    HEXISTS<T>(...args: any): Promise<T>;
    /**
     * Get the value of a hash field
     * @param args key field
     */
    HGET<T>(...args: any): Promise<T>;
    /**
     * Get all the fields and values in a hash
     * @param args key
     */
    HGETALL<T>(...args: any): Promise<T>;
    /**
     * Increment the integer value of a hash field by the given number
     * @param args key field increment
     */
    HINCRBY<T>(...args: any): Promise<T>;
    /**
     * Increment the float value of a hash field by the given amount
     * @param args key field increment
     */
    HINCRBYFLOAT<T>(...args: any): Promise<T>;
    /**
     * Get all the fields in a hash
     * @param args key
     */
    HKEYS<T>(...args: any): Promise<T>;
    /**
     * Get the number of fields in a hash
     * @param args key
     */
    HLEN<T>(...args: any): Promise<T>;
    /**
     * Get the values of all the given hash fields
     * @param args key field [field ...]
     */
    HMGET<T>(...args: any): Promise<T>;
    /**
     * Set multiple hash fields to multiple values
     * @param args key field value [field value ...]
     */
    HMSET<T>(...args: any): Promise<T>;
    /**
     * Set the string value of a hash field
     * @param args key field value [field value ...]
     */
    HSET<T>(...args: any): Promise<T>;
    /**
     * Set the value of a hash field, only if the field does not exist
     * @param args key field value
     */
    HSETNX<T>(...args: any): Promise<T>;
    /**
     * Get the length of the value of a hash field
     * @param args key field
     */
    HSTRLEN<T>(...args: any): Promise<T>;
    /**
     * Get all the values in a hash
     * @param args key
     */
    HVALS<T>(...args: any): Promise<T>;
    /**
     * Increment the integer value of a key by one
     * @param args key
     */
    INCR<T>(...args: any): Promise<T>;
    /**
     * Increment the integer value of a key by the given amount
     * @param args key increment
     */
    INCRBY<T>(...args: any): Promise<T>;
    /**
     * Increment the float value of a key by the given amount
     * @param args key increment
     */
    INCRBYFLOAT<T>(...args: any): Promise<T>;
    /**
     * Get information and statistics about the server
     * @param args [section]
     */
    INFO<T>(...args: any): Promise<T>;
    /**
     * Display some computer art and the Redis version
     * @param args [VERSION version]
     */
    LOLWUT<T>(...args: any): Promise<T>;
    /**
     * Find all keys matching the given pattern
     * @param args pattern
     */
    KEYS<T>(...args: any): Promise<T>;
    /**
     * Get the UNIX time stamp of the last successful save to disk
     */
    LASTSAVE<T>(): Promise<T>;
    /**
     * Get an element from a list by its index
     * @param args key index
     */
    LINDEX<T>(...args: any): Promise<T>;
    /**
     * Insert an element before or after another element in a list
     * @param args key BEFORE|AFTER pivot element
     */
    LINSERT<T>(...args: any): Promise<T>;
    /**
     * Get the length of a list
     * @param args key
     */
    LLEN<T>(...args: any): Promise<T>;
    /**
     * Remove and get the first element in a list
     * @param args key
     */
    LPOP<T>(...args: any): Promise<T>;
    /**
     * Return the index of matching elements on a list
     * @param args key element [RANK rank] [COUNT num-matches] [MAXLEN len]
     */
    LPOS<T>(...args: any): Promise<T>;
    /**
     * Prepend one or multiple elements to a list
     * @param args key element [element ...]
     */
    LPUSH<T>(...args: any): Promise<T>;
    /**
     * Prepend an element to a list, only if the list exists
     * @param args key element [element ...]
     */
    LPUSHX<T>(...args: any): Promise<T>;
    /**
     * Get a range of elements from a list
     * @param args key start stop
     */
    LRANGE<T>(...args: any): Promise<T>;
    /**
     * Remove elements from a list
     * @param args key count element
     */
    LREM<T>(...args: any): Promise<T>;
    /**
     * Set the value of an element in a list by its index
     * @param args key index element
     */
    LSET<T>(...args: any): Promise<T>;
    /**
     * Trim a list to the specified range
     * @param args key start stop
     */
    LTRIM<T>(...args: any): Promise<T>;
    /**
     * Outputs memory problems report
     */
    MEMORYDOCTOR<T>(): Promise<T>;
    /**
     * Show helpful text about the different subcommands
     */
    MEMORYHELP<T>(): Promise<T>;
    /**
     * Show allocator internal stats
     */
    MEMORYMALLOCSTATS<T>(): Promise<T>;
    /**
     * Ask the allocator to release memory
     */
    MEMORYPURGE<T>(): Promise<T>;
    /**
     * Show memory usage details
     */
    MEMORYSTATS<T>(): Promise<T>;
    /**
     * Estimate the memory usage of a key
     * @param args key [SAMPLES count]
     */
    MEMORYUSAGE<T>(...args: any): Promise<T>;
    /**
     * Get the values of all the given keys
     * @param args key [key ...]
     */
    MGET<T>(...args: any): Promise<T>;
    /**
     * Atomically transfer a key from a Redis instance to another one.
     * @param args host port key|"" destination-db timeout [COPY] [REPLACE] [AUTH password] [AUTH2 username password] [KEYS key [key ...]]
     */
    MIGRATE<T>(...args: any): Promise<T>;
    /**
     * List all modules loaded by the server
     */
    MODULELIST<T>(): Promise<T>;
    /**
     * Load a module
     * @param args path [ arg [arg ...]]
     */
    MODULELOAD<T>(...args: any): Promise<T>;
    /**
     * Unload a module
     * @param args name
     */
    MODULEUNLOAD<T>(...args: any): Promise<T>;
    /**
     * Listen for all requests received by the server in real time
     */
    MONITOR<T>(): Promise<T>;
    /**
     * Move a key to another database
     * @param args key db
     */
    MOVE<T>(...args: any): Promise<T>;
    /**
     * Set multiple keys to multiple values
     * @param args key value [key value ...]
     */
    MSET<T>(...args: any): Promise<T>;
    /**
     * Set multiple keys to multiple values, only if none of the keys exist
     * @param args key value [key value ...]
     */
    MSETNX<T>(...args: any): Promise<T>;
    /**
     * Mark the start of a transaction block
     */
    MULTI<T>(): Promise<T>;
    /**
     * Inspect the internals of Redis objects
     * @param args subcommand [arguments [arguments ...]]
     */
    OBJECT<T>(...args: any): Promise<T>;
    /**
     * Remove the expiration from a key
     * @param args key
     */
    PERSIST<T>(...args: any): Promise<T>;
    /**
     * Set a key's time to live in milliseconds
     * @param args key milliseconds
     */
    PEXPIRE<T>(...args: any): Promise<T>;
    /**
     * Set the expiration for a key as a UNIX timestamp specified in milliseconds
     * @param args key milliseconds-timestamp
     */
    PEXPIREAT<T>(...args: any): Promise<T>;
    /**
     * Adds the specified elements to the specified HyperLogLog.
     * @param args key element [element ...]
     */
    PFADD<T>(...args: any): Promise<T>;
    /**
     * Return the approximated cardinality of the set(s) observed by the HyperLogLog at key(s).
     * @param args key [key ...]
     */
    PFCOUNT<T>(...args: any): Promise<T>;
    /**
     * Merge N different HyperLogLogs into a single one.
     * @param args destkey sourcekey [sourcekey ...]
     */
    PFMERGE<T>(...args: any): Promise<T>;
    /**
     * Ping the server
     * @param args [message]
     */
    PING<T>(...args: any): Promise<T>;
    /**
     * Set the value and expiration in milliseconds of a key
     * @param args key milliseconds value
     */
    PSETEX<T>(...args: any): Promise<T>;
    /**
     * Listen for messages published to channels matching the given patterns
     * @param args pattern [pattern ...]
     */
    PSUBSCRIBE<T>(...args: any): Promise<T>;
    /**
     * Inspect the state of the Pub/Sub subsystem
     * @param args subcommand [argument [argument ...]]
     */
    PUBSUB<T>(...args: any): Promise<T>;
    /**
     * Get the time to live for a key in milliseconds
     * @param args key
     */
    PTTL<T>(...args: any): Promise<T>;
    /**
     * Post a message to a channel
     * @param args channel message
     */
    PUBLISH<T>(...args: any): Promise<T>;
    /**
     * Stop listening for messages posted to channels matching the given patterns
     * @param args [pattern [pattern ...]]
     */
    PUNSUBSCRIBE<T>(...args: any): Promise<T>;
    /**
     * Close the connection
     */
    QUIT<T>(): Promise<T>;
    /**
     * Return a random key from the keyspace
     */
    RANDOMKEY<T>(): Promise<T>;
    /**
     * Enables read queries for a connection to a cluster replica node
     */
    READONLY<T>(): Promise<T>;
    /**
     * Disables read queries for a connection to a cluster replica node
     */
    READWRITE<T>(): Promise<T>;
    /**
     * Rename a key
     * @param args key newkey
     */
    RENAME<T>(...args: any): Promise<T>;
    /**
     * Rename a key, only if the new key does not exist
     * @param args key newkey
     */
    RENAMENX<T>(...args: any): Promise<T>;
    /**
     * Reset the connection
     */
    RESET<T>(): Promise<T>;
    /**
     * Create a key using the provided serialized value, previously obtained using DUMP.
     * @param args key ttl serialized-value [REPLACE] [ABSTTL] [IDLETIME seconds] [FREQ frequency]
     */
    RESTORE<T>(...args: any): Promise<T>;
    /**
     * Return the role of the instance in the context of replication
     */
    ROLE<T>(): Promise<T>;
    /**
     * Remove and get the last element in a list
     * @param args key
     */
    RPOP<T>(...args: any): Promise<T>;
    /**
     * Remove the last element in a list, prepend it to another list and return it
     * @param args source destination
     */
    RPOPLPUSH<T>(...args: any): Promise<T>;
    /**
     * Pop an element from a list, push it to another list and return it
     * @param args source destination LEFT|RIGHT LEFT|RIGHT
     */
    LMOVE<T>(...args: any): Promise<T>;
    /**
     * Append one or multiple elements to a list
     * @param args key element [element ...]
     */
    RPUSH<T>(...args: any): Promise<T>;
    /**
     * Append an element to a list, only if the list exists
     * @param args key element [element ...]
     */
    RPUSHX<T>(...args: any): Promise<T>;
    /**
     * Add one or more members to a set
     * @param args key member [member ...]
     */
    SADD<T>(...args: any): Promise<T>;
    /**
     * Synchronously save the dataset to disk
     */
    SAVE<T>(): Promise<T>;
    /**
     * Get the number of members in a set
     * @param args key
     */
    SCARD<T>(...args: any): Promise<T>;
    /**
     * Set the debug mode for executed scripts.
     * @param args YES|SYNC|NO
     */
    SCRIPTDEBUG<T>(...args: any): Promise<T>;
    /**
     * Check existence of scripts in the script cache.
     * @param args sha1 [sha1 ...]
     */
    SCRIPTEXISTS<T>(...args: any): Promise<T>;
    /**
     * Remove all the scripts from the script cache.
     */
    SCRIPTFLUSH<T>(): Promise<T>;
    /**
     * Kill the script currently in execution.
     */
    SCRIPTKILL<T>(): Promise<T>;
    /**
     * Load the specified Lua script into the script cache.
     * @param args script
     */
    SCRIPTLOAD<T>(...args: any): Promise<T>;
    /**
     * Subtract multiple sets
     * @param args key [key ...]
     */
    SDIFF<T>(...args: any): Promise<T>;
    /**
     * Subtract multiple sets and store the resulting set in a key
     * @param args destination key [key ...]
     */
    SDIFFSTORE<T>(...args: any): Promise<T>;
    /**
     * Change the selected database for the current connection
     * @param args index
     */
    SELECT<T>(...args: any): Promise<T>;
    /**
     * Set the string value of a key
     * @param args key value [EX seconds|PX milliseconds|KEEPTTL] [NX|XX] [GET]
     */
    SET<T>(...args: any): Promise<T>;
    /**
     * Sets or clears the bit at offset in the string value stored at key
     * @param args key offset value
     */
    SETBIT<T>(...args: any): Promise<T>;
    /**
     * Set the value and expiration of a key
     * @param args key seconds value
     */
    SETEX<T>(...args: any): Promise<T>;
    /**
     * Set the value of a key, only if the key does not exist
     * @param args key value
     */
    SETNX<T>(...args: any): Promise<T>;
    /**
     * Overwrite part of a string at key starting at the specified offset
     * @param args key offset value
     */
    SETRANGE<T>(...args: any): Promise<T>;
    /**
     * Synchronously save the dataset to disk and then shut down the server
     * @param args [NOSAVE|SAVE]
     */
    SHUTDOWN<T>(...args: any): Promise<T>;
    /**
     * Intersect multiple sets
     * @param args key [key ...]
     */
    SINTER<T>(...args: any): Promise<T>;
    /**
     * Intersect multiple sets and store the resulting set in a key
     * @param args destination key [key ...]
     */
    SINTERSTORE<T>(...args: any): Promise<T>;
    /**
     * Determine if a given value is a member of a set
     * @param args key member
     */
    SISMEMBER<T>(...args: any): Promise<T>;
    /**
     * Returns the membership associated with the given elements for a set
     * @param args key member [member ...]
     */
    SMISMEMBER<T>(...args: any): Promise<T>;
    /**
     * Make the server a replica of another instance, or promote it as master. Deprecated starting with Redis 5. Use REPLICAOF instead.
     * @param args host port
     */
    SLAVEOF<T>(...args: any): Promise<T>;
    /**
     * Make the server a replica of another instance, or promote it as master.
     * @param args host port
     */
    REPLICAOF<T>(...args: any): Promise<T>;
    /**
     * Manages the Redis slow queries log
     * @param args subcommand [argument]
     */
    SLOWLOG<T>(...args: any): Promise<T>;
    /**
     * Get all the members in a set
     * @param args key
     */
    SMEMBERS<T>(...args: any): Promise<T>;
    /**
     * Move a member from one set to another
     * @param args source destination member
     */
    SMOVE<T>(...args: any): Promise<T>;
    /**
     * Sort the elements in a list, set or sorted set
     * @param args key [BY pattern] [LIMIT offset count] [GET pattern [GET pattern ...]] [ASC|DESC] [ALPHA] [STORE destination]
     */
    SORT<T>(...args: any): Promise<T>;
    /**
     * Remove and return one or multiple random members from a set
     * @param args key [count]
     */
    SPOP<T>(...args: any): Promise<T>;
    /**
     * Get one or multiple random members from a set
     * @param args key [count]
     */
    SRANDMEMBER<T>(...args: any): Promise<T>;
    /**
     * Remove one or more members from a set
     * @param args key member [member ...]
     */
    SREM<T>(...args: any): Promise<T>;
    /**
     * Run algorithms (currently LCS) against strings
     * @param args LCS algo-specific-argument [algo-specific-argument ...]
     */
    STRALGO<T>(...args: any): Promise<T>;
    /**
     * Get the length of the value stored in a key
     * @param args key
     */
    STRLEN<T>(...args: any): Promise<T>;
    /**
     * Listen for messages published to the given channels
     * @param args channel [channel ...]
     */
    SUBSCRIBE<T>(...args: any): Promise<T>;
    /**
     * Add multiple sets
     * @param args key [key ...]
     */
    SUNION<T>(...args: any): Promise<T>;
    /**
     * Add multiple sets and store the resulting set in a key
     * @param args destination key [key ...]
     */
    SUNIONSTORE<T>(...args: any): Promise<T>;
    /**
     * Swaps two Redis databases
     * @param args index1 index2
     */
    SWAPDB<T>(...args: any): Promise<T>;
    /**
     * Internal command used for replication
     */
    SYNC<T>(): Promise<T>;
    /**
     * Internal command used for replication
     * @param args replicationid offset
     */
    PSYNC<T>(...args: any): Promise<T>;
    /**
     * Return the current server time
     */
    TIME<T>(): Promise<T>;
    /**
     * Alters the last access time of a key(s). Returns the number of existing keys specified.
     * @param args key [key ...]
     */
    TOUCH<T>(...args: any): Promise<T>;
    /**
     * Get the time to live for a key
     * @param args key
     */
    TTL<T>(...args: any): Promise<T>;
    /**
     * Determine the type stored at key
     * @param args key
     */
    TYPE<T>(...args: any): Promise<T>;
    /**
     * Stop listening for messages posted to the given channels
     * @param args [channel [channel ...]]
     */
    UNSUBSCRIBE<T>(...args: any): Promise<T>;
    /**
     * Delete a key asynchronously in another thread. Otherwise it is just as DEL, but non blocking.
     * @param args key [key ...]
     */
    UNLINK<T>(...args: any): Promise<T>;
    /**
     * Forget about all watched keys
     */
    UNWATCH<T>(): Promise<T>;
    /**
     * Wait for the synchronous replication of all the write commands sent in the context of the current connection
     * @param args numreplicas timeout
     */
    WAIT<T>(...args: any): Promise<T>;
    /**
     * Watch the given keys to determine execution of the MULTI/EXEC block
     * @param args key [key ...]
     */
    WATCH<T>(...args: any): Promise<T>;
    /**
     * Add one or more members to a sorted set, or update its score if it already exists
     * @param args key [NX|XX] [GT|LT] [CH] [INCR] score member [score member ...]
     */
    ZADD<T>(...args: any): Promise<T>;
    /**
     * Get the number of members in a sorted set
     * @param args key
     */
    ZCARD<T>(...args: any): Promise<T>;
    /**
     * Count the members in a sorted set with scores within the given values
     * @param args key min max
     */
    ZCOUNT<T>(...args: any): Promise<T>;
    /**
     * Subtract multiple sorted sets
     * @param args numkeys key [key ...] [WITHSCORES]
     */
    ZDIFF<T>(...args: any): Promise<T>;
    /**
     * Subtract multiple sorted sets and store the resulting sorted set in a new key
     * @param args destination numkeys key [key ...]
     */
    ZDIFFSTORE<T>(...args: any): Promise<T>;
    /**
     * Increment the score of a member in a sorted set
     * @param args key increment member
     */
    ZINCRBY<T>(...args: any): Promise<T>;
    /**
     * Intersect multiple sorted sets
     * @param args numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX] [WITHSCORES]
     */
    ZINTER<T>(...args: any): Promise<T>;
    /**
     * Intersect multiple sorted sets and store the resulting sorted set in a new key
     * @param args destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]
     */
    ZINTERSTORE<T>(...args: any): Promise<T>;
    /**
     * Count the number of members in a sorted set between a given lexicographical range
     * @param args key min max
     */
    ZLEXCOUNT<T>(...args: any): Promise<T>;
    /**
     * Remove and return members with the highest scores in a sorted set
     * @param args key [count]
     */
    ZPOPMAX<T>(...args: any): Promise<T>;
    /**
     * Remove and return members with the lowest scores in a sorted set
     * @param args key [count]
     */
    ZPOPMIN<T>(...args: any): Promise<T>;
    /**
     * Return a range of members in a sorted set, by index
     * @param args key start stop [WITHSCORES]
     */
    ZRANGE<T>(...args: any): Promise<T>;
    /**
     * Return a range of members in a sorted set, by lexicographical range
     * @param args key min max [LIMIT offset count]
     */
    ZRANGEBYLEX<T>(...args: any): Promise<T>;
    /**
     * Return a range of members in a sorted set, by lexicographical range, ordered from higher to lower strings.
     * @param args key max min [LIMIT offset count]
     */
    ZREVRANGEBYLEX<T>(...args: any): Promise<T>;
    /**
     * Return a range of members in a sorted set, by score
     * @param args key min max [WITHSCORES] [LIMIT offset count]
     */
    ZRANGEBYSCORE<T>(...args: any): Promise<T>;
    /**
     * Determine the index of a member in a sorted set
     * @param args key member
     */
    ZRANK<T>(...args: any): Promise<T>;
    /**
     * Remove one or more members from a sorted set
     * @param args key member [member ...]
     */
    ZREM<T>(...args: any): Promise<T>;
    /**
     * Remove all members in a sorted set between the given lexicographical range
     * @param args key min max
     */
    ZREMRANGEBYLEX<T>(...args: any): Promise<T>;
    /**
     * Remove all members in a sorted set within the given indexes
     * @param args key start stop
     */
    ZREMRANGEBYRANK<T>(...args: any): Promise<T>;
    /**
     * Remove all members in a sorted set within the given scores
     * @param args key min max
     */
    ZREMRANGEBYSCORE<T>(...args: any): Promise<T>;
    /**
     * Return a range of members in a sorted set, by index, with scores ordered from high to low
     * @param args key start stop [WITHSCORES]
     */
    ZREVRANGE<T>(...args: any): Promise<T>;
    /**
     * Return a range of members in a sorted set, by score, with scores ordered from high to low
     * @param args key max min [WITHSCORES] [LIMIT offset count]
     */
    ZREVRANGEBYSCORE<T>(...args: any): Promise<T>;
    /**
     * Determine the index of a member in a sorted set, with scores ordered from high to low
     * @param args key member
     */
    ZREVRANK<T>(...args: any): Promise<T>;
    /**
     * Get the score associated with the given member in a sorted set
     * @param args key member
     */
    ZSCORE<T>(...args: any): Promise<T>;
    /**
     * Add multiple sorted sets
     * @param args numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX] [WITHSCORES]
     */
    ZUNION<T>(...args: any): Promise<T>;
    /**
     * Get the score associated with the given members in a sorted set
     * @param args key member [member ...]
     */
    ZMSCORE<T>(...args: any): Promise<T>;
    /**
     * Add multiple sorted sets and store the resulting sorted set in a new key
     * @param args destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]
     */
    ZUNIONSTORE<T>(...args: any): Promise<T>;
    /**
     * Incrementally iterate the keys space
     * @param args cursor [MATCH pattern] [COUNT count] [TYPE type]
     */
    SCAN<T>(...args: any): Promise<T>;
    /**
     * Incrementally iterate Set elements
     * @param args key cursor [MATCH pattern] [COUNT count]
     */
    SSCAN<T>(...args: any): Promise<T>;
    /**
     * Incrementally iterate hash fields and associated values
     * @param args key cursor [MATCH pattern] [COUNT count]
     */
    HSCAN<T>(...args: any): Promise<T>;
    /**
     * Incrementally iterate sorted sets elements and associated scores
     * @param args key cursor [MATCH pattern] [COUNT count]
     */
    ZSCAN<T>(...args: any): Promise<T>;
    /**
     * Get information on streams and consumer groups
     * @param args [CONSUMERS key groupname] [GROUPS key] [STREAM key] [HELP]
     */
    XINFO<T>(...args: any): Promise<T>;
    /**
     * Appends a new entry to a stream
     * @param args key [MAXLEN [=|~] length] [NOMKSTREAM] *|ID field value [field value ...]
     */
    XADD<T>(...args: any): Promise<T>;
    /**
     * Trims the stream to (approximately if '~' is passed) a certain size
     * @param args key MAXLEN [=|~] length
     */
    XTRIM<T>(...args: any): Promise<T>;
    /**
     * Removes the specified entries from the stream. Returns the number of items actually deleted, that may be different from the number of IDs passed in case certain IDs do not exist.
     * @param args key ID [ID ...]
     */
    XDEL<T>(...args: any): Promise<T>;
    /**
     * Return a range of elements in a stream, with IDs matching the specified IDs interval
     * @param args key start end [COUNT count]
     */
    XRANGE<T>(...args: any): Promise<T>;
    /**
     * Return a range of elements in a stream, with IDs matching the specified IDs interval, in reverse order (from greater to smaller IDs) compared to XRANGE
     * @param args key end start [COUNT count]
     */
    XREVRANGE<T>(...args: any): Promise<T>;
    /**
     * Return the number of entries in a stream
     * @param args key
     */
    XLEN<T>(...args: any): Promise<T>;
    /**
     * Return never seen elements in multiple streams, with IDs greater than the ones reported by the caller for each stream. Can block.
     * @param args [COUNT count] [BLOCK milliseconds] STREAMS key [key ...] ID [ID ...]
     */
    XREAD<T>(...args: any): Promise<T>;
    /**
     * Create, destroy, and manage consumer groups.
     * @param args [CREATE key groupname ID|$ [MKSTREAM]] [SETID key groupname ID|$] [DESTROY key groupname] [CREATECONSUMER key groupname consumername] [DELCONSUMER key groupname consumername]
     */
    XGROUP<T>(...args: any): Promise<T>;
    /**
     * Return new entries from a stream using a consumer group, or access the history of the pending entries for a given consumer. Can block.
     * @param args GROUP group consumer [COUNT count] [BLOCK milliseconds] [NOACK] STREAMS key [key ...] ID [ID ...]
     */
    XREADGROUP<T>(...args: any): Promise<T>;
    /**
     * Marks a pending message as correctly processed, effectively removing it from the pending entries list of the consumer group. Return value of the command is the number of messages successfully acknowledged, that is, the IDs we were actually able to resolve in the PEL.
     * @param args key group ID [ID ...]
     */
    XACK<T>(...args: any): Promise<T>;
    /**
     * Changes (or acquires) ownership of a message in a consumer group, as if the message was delivered to the specified consumer.
     * @param args key group consumer min-idle-time ID [ID ...] [IDLE ms] [TIME ms-unix-time] [RETRYCOUNT count] [FORCE] [JUSTID]
     */
    XCLAIM<T>(...args: any): Promise<T>;
    /**
     * Return information and entries from a stream consumer group pending entries list, that are messages fetched but never acknowledged.
     * @param args key group [[IDLE min-idle-time] start end count [consumer]]
     */
    XPENDING<T>(...args: any): Promise<T>;
    /**
     * Return a human readable latency analysis report.
     */
    LATENCYDOCTOR<T>(): Promise<T>;
    /**
     * Return a latency graph for the event.
     * @param args event
     */
    LATENCYGRAPH<T>(...args: any): Promise<T>;
    /**
     * Return timestamp-latency samples for the event.
     * @param args event
     */
    LATENCYHISTORY<T>(...args: any): Promise<T>;
    /**
     * Return the latest latency samples for all events.
     */
    LATENCYLATEST<T>(): Promise<T>;
    /**
     * Reset latency data for one or more events.
     * @param args [event [event ...]]
     */
    LATENCYRESET<T>(...args: any): Promise<T>;
    /**
     * Show helpful text about the different subcommands.
     */
    LATENCYHELP<T>(): Promise<T>;
}