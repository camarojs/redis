/**
 * Automatically generated on Fri Dec 11 2020 15:18:08 GMT+0800 (China Standard Time)
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ClientCommand {
    /**
     * Reload the ACLs from the configured ACL file
     */
    ACLLOAD(): Promise<void>;
    /**
     * Save the current ACL rules in the configured ACL file
     */
    ACLSAVE(): Promise<void>;
    /**
     * List the current ACL rules in ACL config file format
     */
    ACLLIST(): Promise<void>;
    /**
     * List the username of all the configured ACL rules
     */
    ACLUSERS(): Promise<void>;
    /**
     * Get the rules for a specific ACL user
     * @param args username
     */
    ACLGETUSER(...args: any): Promise<void>;
    /**
     * Modify or create the rules for a specific ACL user
     * @param args username [rule [rule ...]]
     */
    ACLSETUSER(...args: any): Promise<void>;
    /**
     * Remove the specified ACL users and the associated rules
     * @param args username [username ...]
     */
    ACLDELUSER(...args: any): Promise<void>;
    /**
     * List the ACL categories or the commands inside a category
     * @param args [categoryname]
     */
    ACLCAT(...args: any): Promise<void>;
    /**
     * Generate a pseudorandom secure password to use for ACL users
     * @param args [bits]
     */
    ACLGENPASS(...args: any): Promise<void>;
    /**
     * Return the name of the user associated to the current connection
     */
    ACLWHOAMI(): Promise<void>;
    /**
     * List latest events denied because of ACLs in place
     * @param args [count or RESET]
     */
    ACLLOG(...args: any): Promise<void>;
    /**
     * Show helpful text about the different subcommands
     */
    ACLHELP(): Promise<void>;
    /**
     * Append a value to a key
     * @param args key value
     */
    APPEND(...args: any): Promise<void>;
    /**
     * Authenticate to the server
     * @param args [username] password
     */
    AUTH(...args: any): Promise<void>;
    /**
     * Asynchronously rewrite the append-only file
     */
    BGREWRITEAOF(): Promise<void>;
    /**
     * Asynchronously save the dataset to disk
     * @param args [SCHEDULE]
     */
    BGSAVE(...args: any): Promise<void>;
    /**
     * Count set bits in a string
     * @param args key [start end]
     */
    BITCOUNT(...args: any): Promise<void>;
    /**
     * Perform arbitrary bitfield integer operations on strings
     * @param args key [GET type offset] [SET type offset value] [INCRBY type offset increment] [OVERFLOW WRAP|SAT|FAIL]
     */
    BITFIELD(...args: any): Promise<void>;
    /**
     * Perform bitwise operations between strings
     * @param args operation destkey key [key ...]
     */
    BITOP(...args: any): Promise<void>;
    /**
     * Find first bit set or clear in a string
     * @param args key bit [start] [end]
     */
    BITPOS(...args: any): Promise<void>;
    /**
     * Remove and get the first element in a list, or block until one is available
     * @param args key [key ...] timeout
     */
    BLPOP(...args: any): Promise<void>;
    /**
     * Remove and get the last element in a list, or block until one is available
     * @param args key [key ...] timeout
     */
    BRPOP(...args: any): Promise<void>;
    /**
     * Pop an element from a list, push it to another list and return it; or block until one is available
     * @param args source destination timeout
     */
    BRPOPLPUSH(...args: any): Promise<void>;
    /**
     * Pop an element from a list, push it to another list and return it; or block until one is available
     * @param args source destination LEFT|RIGHT LEFT|RIGHT timeout
     */
    BLMOVE(...args: any): Promise<void>;
    /**
     * Remove and return the member with the lowest score from one or more sorted sets, or block until one is available
     * @param args key [key ...] timeout
     */
    BZPOPMIN(...args: any): Promise<void>;
    /**
     * Remove and return the member with the highest score from one or more sorted sets, or block until one is available
     * @param args key [key ...] timeout
     */
    BZPOPMAX(...args: any): Promise<void>;
    /**
     * Instruct the server about tracking or not keys in the next request
     * @param args YES|NO
     */
    CLIENTCACHING(...args: any): Promise<void>;
    /**
     * Returns the client ID for the current connection
     */
    CLIENTID(): Promise<void>;
    /**
     * Returns information about the current client connection.
     */
    CLIENTINFO(): Promise<void>;
    /**
     * Kill the connection of a client
     * @param args [ip:port] [ID client-id] [TYPE normal|master|slave|pubsub] [USER username] [ADDR ip:port] [SKIPME yes/no]
     */
    CLIENTKILL(...args: any): Promise<void>;
    /**
     * Get the list of client connections
     * @param args [TYPE normal|master|replica|pubsub] [ID client-id [client-id ...]]
     */
    CLIENTLIST(...args: any): Promise<void>;
    /**
     * Get the current connection name
     */
    CLIENTGETNAME(): Promise<void>;
    /**
     * Get tracking notifications redirection client ID if any
     */
    CLIENTGETREDIR(): Promise<void>;
    /**
     * Stop processing commands from clients for some time
     * @param args timeout
     */
    CLIENTPAUSE(...args: any): Promise<void>;
    /**
     * Instruct the server whether to reply to commands
     * @param args ON|OFF|SKIP
     */
    CLIENTREPLY(...args: any): Promise<void>;
    /**
     * Set the current connection name
     * @param args connection-name
     */
    CLIENTSETNAME(...args: any): Promise<void>;
    /**
     * Enable or disable server assisted client side caching support
     * @param args ON|OFF [REDIRECT client-id] [PREFIX prefix [PREFIX prefix ...]] [BCAST] [OPTIN] [OPTOUT] [NOLOOP]
     */
    CLIENTTRACKING(...args: any): Promise<void>;
    /**
     * Unblock a client blocked in a blocking command from a different connection
     * @param args client-id [TIMEOUT|ERROR]
     */
    CLIENTUNBLOCK(...args: any): Promise<void>;
    /**
     * Assign new hash slots to receiving node
     * @param args slot [slot ...]
     */
    CLUSTERADDSLOTS(...args: any): Promise<void>;
    /**
     * Advance the cluster config epoch
     */
    CLUSTERBUMPEPOCH(): Promise<void>;
    /**
     * Return the number of failure reports active for a given node
     * @param args node-id
     */
    CLUSTERCOUNTFAILUREREPORTS(...args: any): Promise<void>;
    /**
     * Return the number of local keys in the specified hash slot
     * @param args slot
     */
    CLUSTERCOUNTKEYSINSLOT(...args: any): Promise<void>;
    /**
     * Set hash slots as unbound in receiving node
     * @param args slot [slot ...]
     */
    CLUSTERDELSLOTS(...args: any): Promise<void>;
    /**
     * Forces a replica to perform a manual failover of its master.
     * @param args [FORCE|TAKEOVER]
     */
    CLUSTERFAILOVER(...args: any): Promise<void>;
    /**
     * Delete a node's own slots information
     */
    CLUSTERFLUSHSLOTS(): Promise<void>;
    /**
     * Remove a node from the nodes table
     * @param args node-id
     */
    CLUSTERFORGET(...args: any): Promise<void>;
    /**
     * Return local key names in the specified hash slot
     * @param args slot count
     */
    CLUSTERGETKEYSINSLOT(...args: any): Promise<void>;
    /**
     * Provides info about Redis Cluster node state
     */
    CLUSTERINFO(): Promise<void>;
    /**
     * Returns the hash slot of the specified key
     * @param args key
     */
    CLUSTERKEYSLOT(...args: any): Promise<void>;
    /**
     * Force a node cluster to handshake with another node
     * @param args ip port
     */
    CLUSTERMEET(...args: any): Promise<void>;
    /**
     * Return the node id
     */
    CLUSTERMYID(): Promise<void>;
    /**
     * Get Cluster config for the node
     */
    CLUSTERNODES(): Promise<void>;
    /**
     * Reconfigure a node as a replica of the specified master node
     * @param args node-id
     */
    CLUSTERREPLICATE(...args: any): Promise<void>;
    /**
     * Reset a Redis Cluster node
     * @param args [HARD|SOFT]
     */
    CLUSTERRESET(...args: any): Promise<void>;
    /**
     * Forces the node to save cluster state on disk
     */
    CLUSTERSAVECONFIG(): Promise<void>;
    /**
     * Set the configuration epoch in a new node
     * @param args config-epoch
     */
    CLUSTERSETCONFIGEPOCH(...args: any): Promise<void>;
    /**
     * Bind a hash slot to a specific node
     * @param args slot IMPORTING|MIGRATING|STABLE|NODE [node-id]
     */
    CLUSTERSETSLOT(...args: any): Promise<void>;
    /**
     * List replica nodes of the specified master node
     * @param args node-id
     */
    CLUSTERSLAVES(...args: any): Promise<void>;
    /**
     * List replica nodes of the specified master node
     * @param args node-id
     */
    CLUSTERREPLICAS(...args: any): Promise<void>;
    /**
     * Get array of Cluster slot to node mappings
     */
    CLUSTERSLOTS(): Promise<void>;
    /**
     * Get array of Redis command details
     */
    COMMAND(): Promise<void>;
    /**
     * Get total number of Redis commands
     */
    COMMANDCOUNT(): Promise<void>;
    /**
     * Extract keys given a full Redis command
     */
    COMMANDGETKEYS(): Promise<void>;
    /**
     * Get array of specific Redis command details
     * @param args command-name [command-name ...]
     */
    COMMANDINFO(...args: any): Promise<void>;
    /**
     * Get the value of a configuration parameter
     * @param args parameter
     */
    CONFIGGET(...args: any): Promise<void>;
    /**
     * Rewrite the configuration file with the in memory configuration
     */
    CONFIGREWRITE(): Promise<void>;
    /**
     * Set a configuration parameter to the given value
     * @param args parameter value
     */
    CONFIGSET(...args: any): Promise<void>;
    /**
     * Reset the stats returned by INFO
     */
    CONFIGRESETSTAT(): Promise<void>;
    /**
     * Copy a key
     * @param args source destination [DB destination-db] [REPLACE]
     */
    COPY(...args: any): Promise<void>;
    /**
     * Return the number of keys in the selected database
     */
    DBSIZE(): Promise<void>;
    /**
     * Get debugging information about a key
     * @param args key
     */
    DEBUGOBJECT(...args: any): Promise<void>;
    /**
     * Make the server crash
     */
    DEBUGSEGFAULT(): Promise<void>;
    /**
     * Decrement the integer value of a key by one
     * @param args key
     */
    DECR(...args: any): Promise<void>;
    /**
     * Decrement the integer value of a key by the given number
     * @param args key decrement
     */
    DECRBY(...args: any): Promise<void>;
    /**
     * Delete a key
     * @param args key [key ...]
     */
    DEL(...args: any): Promise<void>;
    /**
     * Discard all commands issued after MULTI
     */
    DISCARD(): Promise<void>;
    /**
     * Return a serialized version of the value stored at the specified key.
     * @param args key
     */
    DUMP(...args: any): Promise<void>;
    /**
     * Echo the given string
     * @param args message
     */
    ECHO(...args: any): Promise<void>;
    /**
     * Execute a Lua script server side
     * @param args script numkeys key [key ...] arg [arg ...]
     */
    EVAL(...args: any): Promise<void>;
    /**
     * Execute a Lua script server side
     * @param args sha1 numkeys key [key ...] arg [arg ...]
     */
    EVALSHA(...args: any): Promise<void>;
    /**
     * Execute all commands issued after MULTI
     */
    EXEC(): Promise<void>;
    /**
     * Determine if a key exists
     * @param args key [key ...]
     */
    EXISTS(...args: any): Promise<void>;
    /**
     * Set a key's time to live in seconds
     * @param args key seconds
     */
    EXPIRE(...args: any): Promise<void>;
    /**
     * Set the expiration for a key as a UNIX timestamp
     * @param args key timestamp
     */
    EXPIREAT(...args: any): Promise<void>;
    /**
     * Remove all keys from all databases
     * @param args [ASYNC]
     */
    FLUSHALL(...args: any): Promise<void>;
    /**
     * Remove all keys from the current database
     * @param args [ASYNC]
     */
    FLUSHDB(...args: any): Promise<void>;
    /**
     * Add one or more geospatial items in the geospatial index represented using a sorted set
     * @param args key longitude latitude member [longitude latitude member ...]
     */
    GEOADD(...args: any): Promise<void>;
    /**
     * Returns members of a geospatial index as standard geohash strings
     * @param args key member [member ...]
     */
    GEOHASH(...args: any): Promise<void>;
    /**
     * Returns longitude and latitude of members of a geospatial index
     * @param args key member [member ...]
     */
    GEOPOS(...args: any): Promise<void>;
    /**
     * Returns the distance between two members of a geospatial index
     * @param args key member1 member2 [m|km|ft|mi]
     */
    GEODIST(...args: any): Promise<void>;
    /**
     * Query a sorted set representing a geospatial index to fetch members matching a given maximum distance from a point
     * @param args key longitude latitude radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count] [ASC|DESC] [STORE key] [STOREDIST key]
     */
    GEORADIUS(...args: any): Promise<void>;
    /**
     * Query a sorted set representing a geospatial index to fetch members matching a given maximum distance from a member
     * @param args key member radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count] [ASC|DESC] [STORE key] [STOREDIST key]
     */
    GEORADIUSBYMEMBER(...args: any): Promise<void>;
    /**
     * Get the value of a key
     * @param args key
     */
    GET(...args: any): Promise<void>;
    /**
     * Returns the bit value at offset in the string value stored at key
     * @param args key offset
     */
    GETBIT(...args: any): Promise<void>;
    /**
     * Get a substring of the string stored at a key
     * @param args key start end
     */
    GETRANGE(...args: any): Promise<void>;
    /**
     * Set the string value of a key and return its old value
     * @param args key value
     */
    GETSET(...args: any): Promise<void>;
    /**
     * Delete one or more hash fields
     * @param args key field [field ...]
     */
    HDEL(...args: any): Promise<void>;
    /**
     * switch Redis protocol
     * @param args protover [AUTH username password] [SETNAME clientname]
     */
    HELLO(...args: any): Promise<void>;
    /**
     * Determine if a hash field exists
     * @param args key field
     */
    HEXISTS(...args: any): Promise<void>;
    /**
     * Get the value of a hash field
     * @param args key field
     */
    HGET(...args: any): Promise<void>;
    /**
     * Get all the fields and values in a hash
     * @param args key
     */
    HGETALL(...args: any): Promise<void>;
    /**
     * Increment the integer value of a hash field by the given number
     * @param args key field increment
     */
    HINCRBY(...args: any): Promise<void>;
    /**
     * Increment the float value of a hash field by the given amount
     * @param args key field increment
     */
    HINCRBYFLOAT(...args: any): Promise<void>;
    /**
     * Get all the fields in a hash
     * @param args key
     */
    HKEYS(...args: any): Promise<void>;
    /**
     * Get the number of fields in a hash
     * @param args key
     */
    HLEN(...args: any): Promise<void>;
    /**
     * Get the values of all the given hash fields
     * @param args key field [field ...]
     */
    HMGET(...args: any): Promise<void>;
    /**
     * Set multiple hash fields to multiple values
     * @param args key field value [field value ...]
     */
    HMSET(...args: any): Promise<void>;
    /**
     * Set the string value of a hash field
     * @param args key field value [field value ...]
     */
    HSET(...args: any): Promise<void>;
    /**
     * Set the value of a hash field, only if the field does not exist
     * @param args key field value
     */
    HSETNX(...args: any): Promise<void>;
    /**
     * Get the length of the value of a hash field
     * @param args key field
     */
    HSTRLEN(...args: any): Promise<void>;
    /**
     * Get all the values in a hash
     * @param args key
     */
    HVALS(...args: any): Promise<void>;
    /**
     * Increment the integer value of a key by one
     * @param args key
     */
    INCR(...args: any): Promise<void>;
    /**
     * Increment the integer value of a key by the given amount
     * @param args key increment
     */
    INCRBY(...args: any): Promise<void>;
    /**
     * Increment the float value of a key by the given amount
     * @param args key increment
     */
    INCRBYFLOAT(...args: any): Promise<void>;
    /**
     * Get information and statistics about the server
     * @param args [section]
     */
    INFO(...args: any): Promise<void>;
    /**
     * Display some computer art and the Redis version
     * @param args [VERSION version]
     */
    LOLWUT(...args: any): Promise<void>;
    /**
     * Find all keys matching the given pattern
     * @param args pattern
     */
    KEYS(...args: any): Promise<void>;
    /**
     * Get the UNIX time stamp of the last successful save to disk
     */
    LASTSAVE(): Promise<void>;
    /**
     * Get an element from a list by its index
     * @param args key index
     */
    LINDEX(...args: any): Promise<void>;
    /**
     * Insert an element before or after another element in a list
     * @param args key BEFORE|AFTER pivot element
     */
    LINSERT(...args: any): Promise<void>;
    /**
     * Get the length of a list
     * @param args key
     */
    LLEN(...args: any): Promise<void>;
    /**
     * Remove and get the first element in a list
     * @param args key
     */
    LPOP(...args: any): Promise<void>;
    /**
     * Return the index of matching elements on a list
     * @param args key element [RANK rank] [COUNT num-matches] [MAXLEN len]
     */
    LPOS(...args: any): Promise<void>;
    /**
     * Prepend one or multiple elements to a list
     * @param args key element [element ...]
     */
    LPUSH(...args: any): Promise<void>;
    /**
     * Prepend an element to a list, only if the list exists
     * @param args key element [element ...]
     */
    LPUSHX(...args: any): Promise<void>;
    /**
     * Get a range of elements from a list
     * @param args key start stop
     */
    LRANGE(...args: any): Promise<void>;
    /**
     * Remove elements from a list
     * @param args key count element
     */
    LREM(...args: any): Promise<void>;
    /**
     * Set the value of an element in a list by its index
     * @param args key index element
     */
    LSET(...args: any): Promise<void>;
    /**
     * Trim a list to the specified range
     * @param args key start stop
     */
    LTRIM(...args: any): Promise<void>;
    /**
     * Outputs memory problems report
     */
    MEMORYDOCTOR(): Promise<void>;
    /**
     * Show helpful text about the different subcommands
     */
    MEMORYHELP(): Promise<void>;
    /**
     * Show allocator internal stats
     */
    MEMORYMALLOCSTATS(): Promise<void>;
    /**
     * Ask the allocator to release memory
     */
    MEMORYPURGE(): Promise<void>;
    /**
     * Show memory usage details
     */
    MEMORYSTATS(): Promise<void>;
    /**
     * Estimate the memory usage of a key
     * @param args key [SAMPLES count]
     */
    MEMORYUSAGE(...args: any): Promise<void>;
    /**
     * Get the values of all the given keys
     * @param args key [key ...]
     */
    MGET(...args: any): Promise<void>;
    /**
     * Atomically transfer a key from a Redis instance to another one.
     * @param args host port key|"" destination-db timeout [COPY] [REPLACE] [AUTH password] [AUTH2 username password] [KEYS key [key ...]]
     */
    MIGRATE(...args: any): Promise<void>;
    /**
     * List all modules loaded by the server
     */
    MODULELIST(): Promise<void>;
    /**
     * Load a module
     * @param args path [ arg [arg ...]]
     */
    MODULELOAD(...args: any): Promise<void>;
    /**
     * Unload a module
     * @param args name
     */
    MODULEUNLOAD(...args: any): Promise<void>;
    /**
     * Listen for all requests received by the server in real time
     */
    MONITOR(): Promise<void>;
    /**
     * Move a key to another database
     * @param args key db
     */
    MOVE(...args: any): Promise<void>;
    /**
     * Set multiple keys to multiple values
     * @param args key value [key value ...]
     */
    MSET(...args: any): Promise<void>;
    /**
     * Set multiple keys to multiple values, only if none of the keys exist
     * @param args key value [key value ...]
     */
    MSETNX(...args: any): Promise<void>;
    /**
     * Mark the start of a transaction block
     */
    MULTI(): Promise<void>;
    /**
     * Inspect the internals of Redis objects
     * @param args subcommand [arguments [arguments ...]]
     */
    OBJECT(...args: any): Promise<void>;
    /**
     * Remove the expiration from a key
     * @param args key
     */
    PERSIST(...args: any): Promise<void>;
    /**
     * Set a key's time to live in milliseconds
     * @param args key milliseconds
     */
    PEXPIRE(...args: any): Promise<void>;
    /**
     * Set the expiration for a key as a UNIX timestamp specified in milliseconds
     * @param args key milliseconds-timestamp
     */
    PEXPIREAT(...args: any): Promise<void>;
    /**
     * Adds the specified elements to the specified HyperLogLog.
     * @param args key element [element ...]
     */
    PFADD(...args: any): Promise<void>;
    /**
     * Return the approximated cardinality of the set(s) observed by the HyperLogLog at key(s).
     * @param args key [key ...]
     */
    PFCOUNT(...args: any): Promise<void>;
    /**
     * Merge N different HyperLogLogs into a single one.
     * @param args destkey sourcekey [sourcekey ...]
     */
    PFMERGE(...args: any): Promise<void>;
    /**
     * Ping the server
     * @param args [message]
     */
    PING(...args: any): Promise<void>;
    /**
     * Set the value and expiration in milliseconds of a key
     * @param args key milliseconds value
     */
    PSETEX(...args: any): Promise<void>;
    /**
     * Listen for messages published to channels matching the given patterns
     * @param args pattern [pattern ...]
     */
    PSUBSCRIBE(...args: any): Promise<void>;
    /**
     * Inspect the state of the Pub/Sub subsystem
     * @param args subcommand [argument [argument ...]]
     */
    PUBSUB(...args: any): Promise<void>;
    /**
     * Get the time to live for a key in milliseconds
     * @param args key
     */
    PTTL(...args: any): Promise<void>;
    /**
     * Post a message to a channel
     * @param args channel message
     */
    PUBLISH(...args: any): Promise<void>;
    /**
     * Stop listening for messages posted to channels matching the given patterns
     * @param args [pattern [pattern ...]]
     */
    PUNSUBSCRIBE(...args: any): Promise<void>;
    /**
     * Close the connection
     */
    QUIT(): Promise<void>;
    /**
     * Return a random key from the keyspace
     */
    RANDOMKEY(): Promise<void>;
    /**
     * Enables read queries for a connection to a cluster replica node
     */
    READONLY(): Promise<void>;
    /**
     * Disables read queries for a connection to a cluster replica node
     */
    READWRITE(): Promise<void>;
    /**
     * Rename a key
     * @param args key newkey
     */
    RENAME(...args: any): Promise<void>;
    /**
     * Rename a key, only if the new key does not exist
     * @param args key newkey
     */
    RENAMENX(...args: any): Promise<void>;
    /**
     * Reset the connection
     */
    RESET(): Promise<void>;
    /**
     * Create a key using the provided serialized value, previously obtained using DUMP.
     * @param args key ttl serialized-value [REPLACE] [ABSTTL] [IDLETIME seconds] [FREQ frequency]
     */
    RESTORE(...args: any): Promise<void>;
    /**
     * Return the role of the instance in the context of replication
     */
    ROLE(): Promise<void>;
    /**
     * Remove and get the last element in a list
     * @param args key
     */
    RPOP(...args: any): Promise<void>;
    /**
     * Remove the last element in a list, prepend it to another list and return it
     * @param args source destination
     */
    RPOPLPUSH(...args: any): Promise<void>;
    /**
     * Pop an element from a list, push it to another list and return it
     * @param args source destination LEFT|RIGHT LEFT|RIGHT
     */
    LMOVE(...args: any): Promise<void>;
    /**
     * Append one or multiple elements to a list
     * @param args key element [element ...]
     */
    RPUSH(...args: any): Promise<void>;
    /**
     * Append an element to a list, only if the list exists
     * @param args key element [element ...]
     */
    RPUSHX(...args: any): Promise<void>;
    /**
     * Add one or more members to a set
     * @param args key member [member ...]
     */
    SADD(...args: any): Promise<void>;
    /**
     * Synchronously save the dataset to disk
     */
    SAVE(): Promise<void>;
    /**
     * Get the number of members in a set
     * @param args key
     */
    SCARD(...args: any): Promise<void>;
    /**
     * Set the debug mode for executed scripts.
     * @param args YES|SYNC|NO
     */
    SCRIPTDEBUG(...args: any): Promise<void>;
    /**
     * Check existence of scripts in the script cache.
     * @param args sha1 [sha1 ...]
     */
    SCRIPTEXISTS(...args: any): Promise<void>;
    /**
     * Remove all the scripts from the script cache.
     */
    SCRIPTFLUSH(): Promise<void>;
    /**
     * Kill the script currently in execution.
     */
    SCRIPTKILL(): Promise<void>;
    /**
     * Load the specified Lua script into the script cache.
     * @param args script
     */
    SCRIPTLOAD(...args: any): Promise<void>;
    /**
     * Subtract multiple sets
     * @param args key [key ...]
     */
    SDIFF(...args: any): Promise<void>;
    /**
     * Subtract multiple sets and store the resulting set in a key
     * @param args destination key [key ...]
     */
    SDIFFSTORE(...args: any): Promise<void>;
    /**
     * Change the selected database for the current connection
     * @param args index
     */
    SELECT(...args: any): Promise<void>;
    /**
     * Set the string value of a key
     * @param args key value [EX seconds|PX milliseconds|KEEPTTL] [NX|XX] [GET]
     */
    SET(...args: any): Promise<void>;
    /**
     * Sets or clears the bit at offset in the string value stored at key
     * @param args key offset value
     */
    SETBIT(...args: any): Promise<void>;
    /**
     * Set the value and expiration of a key
     * @param args key seconds value
     */
    SETEX(...args: any): Promise<void>;
    /**
     * Set the value of a key, only if the key does not exist
     * @param args key value
     */
    SETNX(...args: any): Promise<void>;
    /**
     * Overwrite part of a string at key starting at the specified offset
     * @param args key offset value
     */
    SETRANGE(...args: any): Promise<void>;
    /**
     * Synchronously save the dataset to disk and then shut down the server
     * @param args [NOSAVE|SAVE]
     */
    SHUTDOWN(...args: any): Promise<void>;
    /**
     * Intersect multiple sets
     * @param args key [key ...]
     */
    SINTER(...args: any): Promise<void>;
    /**
     * Intersect multiple sets and store the resulting set in a key
     * @param args destination key [key ...]
     */
    SINTERSTORE(...args: any): Promise<void>;
    /**
     * Determine if a given value is a member of a set
     * @param args key member
     */
    SISMEMBER(...args: any): Promise<void>;
    /**
     * Returns the membership associated with the given elements for a set
     * @param args key member [member ...]
     */
    SMISMEMBER(...args: any): Promise<void>;
    /**
     * Make the server a replica of another instance, or promote it as master. Deprecated starting with Redis 5. Use REPLICAOF instead.
     * @param args host port
     */
    SLAVEOF(...args: any): Promise<void>;
    /**
     * Make the server a replica of another instance, or promote it as master.
     * @param args host port
     */
    REPLICAOF(...args: any): Promise<void>;
    /**
     * Manages the Redis slow queries log
     * @param args subcommand [argument]
     */
    SLOWLOG(...args: any): Promise<void>;
    /**
     * Get all the members in a set
     * @param args key
     */
    SMEMBERS(...args: any): Promise<void>;
    /**
     * Move a member from one set to another
     * @param args source destination member
     */
    SMOVE(...args: any): Promise<void>;
    /**
     * Sort the elements in a list, set or sorted set
     * @param args key [BY pattern] [LIMIT offset count] [GET pattern [GET pattern ...]] [ASC|DESC] [ALPHA] [STORE destination]
     */
    SORT(...args: any): Promise<void>;
    /**
     * Remove and return one or multiple random members from a set
     * @param args key [count]
     */
    SPOP(...args: any): Promise<void>;
    /**
     * Get one or multiple random members from a set
     * @param args key [count]
     */
    SRANDMEMBER(...args: any): Promise<void>;
    /**
     * Remove one or more members from a set
     * @param args key member [member ...]
     */
    SREM(...args: any): Promise<void>;
    /**
     * Run algorithms (currently LCS) against strings
     * @param args LCS algo-specific-argument [algo-specific-argument ...]
     */
    STRALGO(...args: any): Promise<void>;
    /**
     * Get the length of the value stored in a key
     * @param args key
     */
    STRLEN(...args: any): Promise<void>;
    /**
     * Listen for messages published to the given channels
     * @param args channel [channel ...]
     */
    SUBSCRIBE(...args: any): Promise<void>;
    /**
     * Add multiple sets
     * @param args key [key ...]
     */
    SUNION(...args: any): Promise<void>;
    /**
     * Add multiple sets and store the resulting set in a key
     * @param args destination key [key ...]
     */
    SUNIONSTORE(...args: any): Promise<void>;
    /**
     * Swaps two Redis databases
     * @param args index1 index2
     */
    SWAPDB(...args: any): Promise<void>;
    /**
     * Internal command used for replication
     */
    SYNC(): Promise<void>;
    /**
     * Internal command used for replication
     * @param args replicationid offset
     */
    PSYNC(...args: any): Promise<void>;
    /**
     * Return the current server time
     */
    TIME(): Promise<void>;
    /**
     * Alters the last access time of a key(s). Returns the number of existing keys specified.
     * @param args key [key ...]
     */
    TOUCH(...args: any): Promise<void>;
    /**
     * Get the time to live for a key
     * @param args key
     */
    TTL(...args: any): Promise<void>;
    /**
     * Determine the type stored at key
     * @param args key
     */
    TYPE(...args: any): Promise<void>;
    /**
     * Stop listening for messages posted to the given channels
     * @param args [channel [channel ...]]
     */
    UNSUBSCRIBE(...args: any): Promise<void>;
    /**
     * Delete a key asynchronously in another thread. Otherwise it is just as DEL, but non blocking.
     * @param args key [key ...]
     */
    UNLINK(...args: any): Promise<void>;
    /**
     * Forget about all watched keys
     */
    UNWATCH(): Promise<void>;
    /**
     * Wait for the synchronous replication of all the write commands sent in the context of the current connection
     * @param args numreplicas timeout
     */
    WAIT(...args: any): Promise<void>;
    /**
     * Watch the given keys to determine execution of the MULTI/EXEC block
     * @param args key [key ...]
     */
    WATCH(...args: any): Promise<void>;
    /**
     * Add one or more members to a sorted set, or update its score if it already exists
     * @param args key [NX|XX] [GT|LT] [CH] [INCR] score member [score member ...]
     */
    ZADD(...args: any): Promise<void>;
    /**
     * Get the number of members in a sorted set
     * @param args key
     */
    ZCARD(...args: any): Promise<void>;
    /**
     * Count the members in a sorted set with scores within the given values
     * @param args key min max
     */
    ZCOUNT(...args: any): Promise<void>;
    /**
     * Subtract multiple sorted sets
     * @param args numkeys key [key ...] [WITHSCORES]
     */
    ZDIFF(...args: any): Promise<void>;
    /**
     * Subtract multiple sorted sets and store the resulting sorted set in a new key
     * @param args destination numkeys key [key ...]
     */
    ZDIFFSTORE(...args: any): Promise<void>;
    /**
     * Increment the score of a member in a sorted set
     * @param args key increment member
     */
    ZINCRBY(...args: any): Promise<void>;
    /**
     * Intersect multiple sorted sets
     * @param args numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX] [WITHSCORES]
     */
    ZINTER(...args: any): Promise<void>;
    /**
     * Intersect multiple sorted sets and store the resulting sorted set in a new key
     * @param args destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]
     */
    ZINTERSTORE(...args: any): Promise<void>;
    /**
     * Count the number of members in a sorted set between a given lexicographical range
     * @param args key min max
     */
    ZLEXCOUNT(...args: any): Promise<void>;
    /**
     * Remove and return members with the highest scores in a sorted set
     * @param args key [count]
     */
    ZPOPMAX(...args: any): Promise<void>;
    /**
     * Remove and return members with the lowest scores in a sorted set
     * @param args key [count]
     */
    ZPOPMIN(...args: any): Promise<void>;
    /**
     * Return a range of members in a sorted set, by index
     * @param args key start stop [WITHSCORES]
     */
    ZRANGE(...args: any): Promise<void>;
    /**
     * Return a range of members in a sorted set, by lexicographical range
     * @param args key min max [LIMIT offset count]
     */
    ZRANGEBYLEX(...args: any): Promise<void>;
    /**
     * Return a range of members in a sorted set, by lexicographical range, ordered from higher to lower strings.
     * @param args key max min [LIMIT offset count]
     */
    ZREVRANGEBYLEX(...args: any): Promise<void>;
    /**
     * Return a range of members in a sorted set, by score
     * @param args key min max [WITHSCORES] [LIMIT offset count]
     */
    ZRANGEBYSCORE(...args: any): Promise<void>;
    /**
     * Determine the index of a member in a sorted set
     * @param args key member
     */
    ZRANK(...args: any): Promise<void>;
    /**
     * Remove one or more members from a sorted set
     * @param args key member [member ...]
     */
    ZREM(...args: any): Promise<void>;
    /**
     * Remove all members in a sorted set between the given lexicographical range
     * @param args key min max
     */
    ZREMRANGEBYLEX(...args: any): Promise<void>;
    /**
     * Remove all members in a sorted set within the given indexes
     * @param args key start stop
     */
    ZREMRANGEBYRANK(...args: any): Promise<void>;
    /**
     * Remove all members in a sorted set within the given scores
     * @param args key min max
     */
    ZREMRANGEBYSCORE(...args: any): Promise<void>;
    /**
     * Return a range of members in a sorted set, by index, with scores ordered from high to low
     * @param args key start stop [WITHSCORES]
     */
    ZREVRANGE(...args: any): Promise<void>;
    /**
     * Return a range of members in a sorted set, by score, with scores ordered from high to low
     * @param args key max min [WITHSCORES] [LIMIT offset count]
     */
    ZREVRANGEBYSCORE(...args: any): Promise<void>;
    /**
     * Determine the index of a member in a sorted set, with scores ordered from high to low
     * @param args key member
     */
    ZREVRANK(...args: any): Promise<void>;
    /**
     * Get the score associated with the given member in a sorted set
     * @param args key member
     */
    ZSCORE(...args: any): Promise<void>;
    /**
     * Add multiple sorted sets
     * @param args numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX] [WITHSCORES]
     */
    ZUNION(...args: any): Promise<void>;
    /**
     * Get the score associated with the given members in a sorted set
     * @param args key member [member ...]
     */
    ZMSCORE(...args: any): Promise<void>;
    /**
     * Add multiple sorted sets and store the resulting sorted set in a new key
     * @param args destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]
     */
    ZUNIONSTORE(...args: any): Promise<void>;
    /**
     * Incrementally iterate the keys space
     * @param args cursor [MATCH pattern] [COUNT count] [TYPE type]
     */
    SCAN(...args: any): Promise<void>;
    /**
     * Incrementally iterate Set elements
     * @param args key cursor [MATCH pattern] [COUNT count]
     */
    SSCAN(...args: any): Promise<void>;
    /**
     * Incrementally iterate hash fields and associated values
     * @param args key cursor [MATCH pattern] [COUNT count]
     */
    HSCAN(...args: any): Promise<void>;
    /**
     * Incrementally iterate sorted sets elements and associated scores
     * @param args key cursor [MATCH pattern] [COUNT count]
     */
    ZSCAN(...args: any): Promise<void>;
    /**
     * Get information on streams and consumer groups
     * @param args [CONSUMERS key groupname] [GROUPS key] [STREAM key] [HELP]
     */
    XINFO(...args: any): Promise<void>;
    /**
     * Appends a new entry to a stream
     * @param args key [MAXLEN [=|~] length] [NOMKSTREAM] *|ID field value [field value ...]
     */
    XADD(...args: any): Promise<void>;
    /**
     * Trims the stream to (approximately if '~' is passed) a certain size
     * @param args key MAXLEN [=|~] length
     */
    XTRIM(...args: any): Promise<void>;
    /**
     * Removes the specified entries from the stream. Returns the number of items actually deleted, that may be different from the number of IDs passed in case certain IDs do not exist.
     * @param args key ID [ID ...]
     */
    XDEL(...args: any): Promise<void>;
    /**
     * Return a range of elements in a stream, with IDs matching the specified IDs interval
     * @param args key start end [COUNT count]
     */
    XRANGE(...args: any): Promise<void>;
    /**
     * Return a range of elements in a stream, with IDs matching the specified IDs interval, in reverse order (from greater to smaller IDs) compared to XRANGE
     * @param args key end start [COUNT count]
     */
    XREVRANGE(...args: any): Promise<void>;
    /**
     * Return the number of entries in a stream
     * @param args key
     */
    XLEN(...args: any): Promise<void>;
    /**
     * Return never seen elements in multiple streams, with IDs greater than the ones reported by the caller for each stream. Can block.
     * @param args [COUNT count] [BLOCK milliseconds] STREAMS key [key ...] ID [ID ...]
     */
    XREAD(...args: any): Promise<void>;
    /**
     * Create, destroy, and manage consumer groups.
     * @param args [CREATE key groupname ID|$ [MKSTREAM]] [SETID key groupname ID|$] [DESTROY key groupname] [CREATECONSUMER key groupname consumername] [DELCONSUMER key groupname consumername]
     */
    XGROUP(...args: any): Promise<void>;
    /**
     * Return new entries from a stream using a consumer group, or access the history of the pending entries for a given consumer. Can block.
     * @param args GROUP group consumer [COUNT count] [BLOCK milliseconds] [NOACK] STREAMS key [key ...] ID [ID ...]
     */
    XREADGROUP(...args: any): Promise<void>;
    /**
     * Marks a pending message as correctly processed, effectively removing it from the pending entries list of the consumer group. Return value of the command is the number of messages successfully acknowledged, that is, the IDs we were actually able to resolve in the PEL.
     * @param args key group ID [ID ...]
     */
    XACK(...args: any): Promise<void>;
    /**
     * Changes (or acquires) ownership of a message in a consumer group, as if the message was delivered to the specified consumer.
     * @param args key group consumer min-idle-time ID [ID ...] [IDLE ms] [TIME ms-unix-time] [RETRYCOUNT count] [FORCE] [JUSTID]
     */
    XCLAIM(...args: any): Promise<void>;
    /**
     * Return information and entries from a stream consumer group pending entries list, that are messages fetched but never acknowledged.
     * @param args key group [[IDLE min-idle-time] start end count [consumer]]
     */
    XPENDING(...args: any): Promise<void>;
    /**
     * Return a human readable latency analysis report.
     */
    LATENCYDOCTOR(): Promise<void>;
    /**
     * Return a latency graph for the event.
     * @param args event
     */
    LATENCYGRAPH(...args: any): Promise<void>;
    /**
     * Return timestamp-latency samples for the event.
     * @param args event
     */
    LATENCYHISTORY(...args: any): Promise<void>;
    /**
     * Return the latest latency samples for all events.
     */
    LATENCYLATEST(): Promise<void>;
    /**
     * Reset latency data for one or more events.
     * @param args [event [event ...]]
     */
    LATENCYRESET(...args: any): Promise<void>;
    /**
     * Show helpful text about the different subcommands.
     */
    LATENCYHELP(): Promise<void>;
}