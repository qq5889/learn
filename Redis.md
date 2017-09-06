# Redis

## 简介
> Redis 是一个开源（BSD许可）的，内存中的数据结构存储系统，它可以用作数据库（高性能的key-value数据库）、缓存和消息中间件。

### 特点
- Redis支持数据的持久化，可以将内存中的数据保存在磁盘中，重启的时候可以再次加载进行使用。

- Redis不仅仅支持简单的key-value类型的数据，同时还提供list，set，zset，hash等数据结构的存储。

- Redis支持数据的备份，即master-slave模式的数据备份。

### 优势
- 性能极高 – Redis能读的速度是110000次/s,写的速度是81000次/s 。

- 丰富的数据类型 – Redis支持二进制案例的 Strings, Lists, Hashes, Sets 及 Ordered Sets 数据类型操作。

- 原子 – Redis的所有操作都是原子性的，同时Redis还支持对几个操作全并后的原子性执行。

- 丰富的特性 – Redis还支持 publish/subscribe, 通知, key 过期等等特性。

- Redis有着更为复杂的数据结构并且提供对他们的原子性操作，这是一个不同于其他数据库的进化路径。Redis的数据类型都是基于基本数据结构的同时对程序员透明，无需进行额外的抽象。

- Redis运行在内存中但是可以持久化到磁盘，所以在对不同数据集进行高速读写时需要权衡内存，因为数据量不能大于硬件内存。在内存数据库方面的另一个优点是，相比在磁盘上相同的复杂的数据结构，在内存中操作起来非常简单，这样Redis可以做很多内部复杂性很强的事情。同时，在磁盘格式方面他们是紧凑的以追加的方式产生的，因为他们并不需要进行随机访问。

### 相关链接

[键命令](http://www.redis.cn/commands.html)

[别人整理的键命令](http://redisdoc.com/)

[五个常见的使用场景](http://blog.jobbole.com/88383/)

[高级特性](http://blog.csdn.net/u011204847/article/details/51302109)

[redis优缺点总结](http://blog.csdn.net/oanqoanq/article/details/51281548)

[Docker 安装 Redis](http://www.runoob.com/docker/docker-install-redis.html)

[go+redis](https://studygolang.com/articles/4542)
## 安装

### 下载

[redis](http://www.redis.cn/download.html)

[Redis桌面管理](https://github.com/uglide/RedisDesktopManager/releases/)

> mac 下安装也可以使用 homebrew
> 
1. 执行 brew install redis
2. 启动 redis，可以使用后台服务启动 brew services start redis。或者直接启动：redis-server /usr/local/etc/redis.conf

### 安装与启动
1. 下载 
2. 解压
3. cd到解压后目录
4. 执行make(编译)
5. 二进制文件是编译完成后在src目录下，通过命令启动Redis服务：src/redis-server redis.conf
6. 新建shell（不要关前面的）,使用内置的客户端命令redis-cli使用redis
7. 执行ping命令，如果出现PONG，则说明安装成功

> 如果嫌麻烦 将src目录增加到环境变量
> 
> 或者将下载的压缩包
> 
 1. sudo mv 到 /usr/local/
 2. sudo tar -zxf redis-xxx.tar 解压文件
 3. 进入解压后的目录 cd redis-xxx
 4. sudo make test 测试编译
 5. sudo make install 

 
## 配置

### 配置文件
- Redis 的配置文件位于 Redis 安装目录下，文件名为 redis.conf。可以通过修改配置文件或者通过语法修改配置。

### 语法
- CONFIG GET key(key如果为*，则显示全部配置项)

- CONFIG SET key value 

### 参数说明

redis.conf 配置项说明如下：

1. Redis默认不是以守护进程的方式运行，可以通过该配置项修改，使用yes启用守护进程
    daemonize no
2. 当Redis以守护进程方式运行时，Redis默认会把pid写入/var/run/redis.pid文件，可以通过pidfile指定
    pidfile /var/run/redis.pid
3. 指定Redis监听端口，默认端口为6379，作者在自己的一篇博文中解释了为什么选用6379作为默认端口，因为6379在手机按键上MERZ对应的号码，而MERZ取自意大利歌女Alessia Merz的名字
    port 6379
4. 绑定的主机地址
    bind 127.0.0.1
5.当 客户端闲置多长时间后关闭连接，如果指定为0，表示关闭该功能
    timeout 300
6. 指定日志记录级别，Redis总共支持四个级别：debug、verbose、notice、warning，默认为verbose
    loglevel verbose
7. 日志记录方式，默认为标准输出，如果配置Redis为守护进程方式运行，而这里又配置为日志记录方式为标准输出，则日志将会发送给/dev/null
    logfile stdout
8. 设置数据库的数量，默认数据库为0，可以使用SELECT <dbid>命令在连接上指定数据库id
    databases 16
9. 指定在多长时间内，有多少次更新操作，就将数据同步到数据文件，可以多个条件配合
    save <seconds> <changes>
    Redis默认配置文件中提供了三个条件：
    save 900 1
    save 300 10
    save 60 10000
    分别表示900秒（15分钟）内有1个更改，300秒（5分钟）内有10个更改以及60秒内有10000个更改。
 
10. 指定存储至本地数据库时是否压缩数据，默认为yes，Redis采用LZF压缩，如果为了节省CPU时间，可以关闭该选项，但会导致数据库文件变的巨大
    rdbcompression yes
11. 指定本地数据库文件名，默认值为dump.rdb
    dbfilename dump.rdb
12. 指定本地数据库存放目录
    dir ./
13. 设置当本机为slav服务时，设置master服务的IP地址及端口，在Redis启动时，它会自动从master进行数据同步
    slaveof <masterip> <masterport>
14. 当master服务设置了密码保护时，slav服务连接master的密码
    masterauth <master-password>
15. 设置Redis连接密码，如果配置了连接密码，客户端在连接Redis时需要通过AUTH <password>命令提供密码，默认关闭
    requirepass foobared
16. 设置同一时间最大客户端连接数，默认无限制，Redis可以同时打开的客户端连接数为Redis进程可以打开的最大文件描述符数，如果设置 maxclients 0，表示不作限制。当客户端连接数到达限制时，Redis会关闭新的连接并向客户端返回max number of clients reached错误信息
    maxclients 128
17. 指定Redis最大内存限制，Redis在启动时会把数据加载到内存中，达到最大内存后，Redis会先尝试清除已到期或即将到期的Key，当此方法处理 后，仍然到达最大内存设置，将无法再进行写入操作，但仍然可以进行读取操作。Redis新的vm机制，会把Key存放内存，Value会存放在swap区
    maxmemory <bytes>
18. 指定是否在每次更新操作后进行日志记录，Redis在默认情况下是异步的把数据写入磁盘，如果不开启，可能会在断电时导致一段时间内的数据丢失。因为 redis本身同步数据文件是按上面save条件来同步的，所以有的数据会在一段时间内只存在于内存中。默认为no
    appendonly no
19. 指定更新日志文件名，默认为appendonly.aof
     appendfilename appendonly.aof
20. 指定更新日志条件，共有3个可选值： 
    no：表示等操作系统进行数据缓存同步到磁盘（快） 
    always：表示每次更新操作后手动调用fsync()将数据写到磁盘（慢，安全） 
    everysec：表示每秒同步一次（折衷，默认值）
    appendfsync everysec
 
21. 指定是否启用虚拟内存机制，默认值为no，简单的介绍一下，VM机制将数据分页存放，由Redis将访问量较少的页即冷数据swap到磁盘上，访问多的页面由磁盘自动换出到内存中（在后面的文章我会仔细分析Redis的VM机制）
     vm-enabled no
22. 虚拟内存文件路径，默认值为/tmp/redis.swap，不可多个Redis实例共享
     vm-swap-file /tmp/redis.swap
23. 将所有大于vm-max-memory的数据存入虚拟内存,无论vm-max-memory设置多小,所有索引数据都是内存存储的(Redis的索引数据 就是keys),也就是说,当vm-max-memory设置为0的时候,其实是所有value都存在于磁盘。默认值为0
     vm-max-memory 0
24. Redis swap文件分成了很多的page，一个对象可以保存在多个page上面，但一个page上不能被多个对象共享，vm-page-size是要根据存储的 数据大小来设定的，作者建议如果存储很多小对象，page大小最好设置为32或者64bytes；如果存储很大大对象，则可以使用更大的page，如果不 确定，就使用默认值
     vm-page-size 32
25. 设置swap文件中的page数量，由于页表（一种表示页面空闲或使用的bitmap）是在放在内存中的，，在磁盘上每8个pages将消耗1byte的内存。
     vm-pages 134217728
26. 设置访问swap文件的线程数,最好不要超过机器的核数,如果设置为0,那么所有对swap文件的操作都是串行的，可能会造成比较长时间的延迟。默认值为4
     vm-max-threads 4
27. 设置在向客户端应答时，是否把较小的包合并为一个包发送，默认为开启
    glueoutputbuf yes
28. 指定在超过一定的数量或者最大的元素超过某一临界值时，采用一种特殊的哈希算法
    hash-max-zipmap-entries 64
    hash-max-zipmap-value 512
29. 指定是否激活重置哈希，默认为开启（后面在介绍Redis的哈希算法时具体介绍）
    activerehashing yes
30. 指定包含其它的配置文件，可以在同一主机上多个Redis实例之间使用同一份配置文件，而同时各个实例又拥有自己的特定配置文件
    include /path/to/local.conf
    
## Redis 命令

- 启动 redis 本地客户端

```
redis-cli
```
- 执行 PING 命令，该命令用于检测 redis 服务是否启动。

```
PING
```
- 连接远程服务
```
redis-cli -h host -p port -a password

eg:
redis-cli -h 127.0.0.1 -p 6379 -a "123456"
```
   
## 数据类型
> Redis支持五种数据类型：string（字符串），hash（哈希），list（列表），set（集合）及zset(sorted set：有序集合)。

[官方翻译介绍](http://www.redis.cn/topics/data-types-intro.html)
### String（字符串）
> string是redis最基本的类型，一个key对应一个value。
> 
string类型是二进制安全的。意思是redis的string可以包含任何数据,长度不由任何特殊的终止字符决定。
>
string类型是Redis最基本的数据类型，一个键最大能存储512MB。

`注意：命令不区分大小写`

命令|	描述说明
---|---
SET key value	|此命令设置指定键的值。
GET key	|获取指定键的值。
GETRANGE key start end	|获取存储在键上的字符串的子字符串。
GETSET key value	|设置键的字符串值并返回其旧值。
GETBIT key offset	|返回在键处存储的字符串值中偏移处的位值。
MGET key1 [key2..]	|获取所有给定键的值
SETBIT key offset value	|存储在键上的字符串值中设置或清除偏移处的位
SETEX key seconds value	|使用键和到期时间来设置值
SETNX key value	|设置键的值，仅当键不存在时
SETRANGE key offset value	|在指定偏移处开始的键处覆盖字符串的一部分
STRLEN key	|获取存储在键中的值的长度
MSET key value [key value …]	|为多个键分别设置它们的值
MSETNX key value [key value …]	|为多个键分别设置它们的值，仅当键不存在时
PSETEX key milliseconds value	|设置键的值和到期时间(以毫秒为单位)
INCR key	|将键的整数值增加1
INCRBY key increment	|将键的整数值按给定的数值增加
INCRBYFLOAT key increment	|将键的浮点值按给定的数值增加
DECR key	|将键的整数值减1
DECRBY key decrement	|按给定数值减少键的整数值
APPEND key value	|将指定值附加到键

```
eg:
set name jackie

get name
> jackie

mset name1 Jackie name2 Tony

mget name1 name2
> Jackie
> Tony

set count 10
incr count
> 11

incr count
> 12

incrby count 3
> 15

decr count
> 14

decr count
> 13

decrby count 3
> 10


```
### 非String
> 特点:
> key 的自动创建和删除
> 
>>当我们向一个聚合数据类型中添加元素时，如果目标键不存在，就在添加元素前创建空的聚合数据类型。
>>
当我们从聚合数据类型中移除元素时，如果值仍然是空的，键自动被销毁。
>>
对一个空的 key 调用一个只读的命令，比如一个删除元素的命令，将总是产生同样的结果。该结果和对一个空的聚合类型做同个操作的结果是一样的。

### Hash（哈希）

> Redis hash 是一个键名对集合。

> Redis hash是一个string类型的field和value的映射表,所以它特别适合用于存储对象。

> 每个 hash 可以存储 2^32 -1 键值对（40多亿）

命令	|说明
---|---
HDEL key field2 [field2]	|删除一个或多个哈希字段。
HEXISTS key field	|判断是否存在散列字段。
HGET key field	|获取存储在指定键的哈希字段的值。
HGETALL key	|获取存储在指定键的哈希中的所有字段和值
HINCRBY key field increment	|将哈希字段的整数值按给定数字增加
HINCRBYFLOAT key field increment	|将哈希字段的浮点值按给定数值增加
HKEYS key	|获取哈希中的所有字段
HLEN key	|获取散列中的字段数量
HMGET key field1 [field2]	|获取所有给定哈希字段的值
HMSET key field1 value1 [field2 value2 ]	|为多个哈希字段分别设置它们的值
HSET key field value	|设置散列字段的字符串值
HSETNX key field value	|仅当字段不存在时，才设置散列字段的值
HVALS key	|获取哈希中的所有值
HSCAN key cursor [MATCH pattern] [COUNT count] |迭代哈希表中的键值对。

```
eg:
hmset user name jackie phone 13700000000

hset user name jackie1

hgetall user
> name
> jackie1
> phone
> 13700000000

hget user name
> jackie1

hmget user name phone
> jackie1
> 13700000000
```

### List（列表）

> Redis 列表是简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的头部（左边）或者尾部（右边）。

> 列表最多可存储 2^32 - 1 元素 (每个列表可存储40多亿)。

> 基于Linked Lists实现
> 
> 常用于聊天信息，评论等队列消息
> 

命令	|说明
---|---
BLPOP key1 [key2 ] timeout	|删除并获取列表中的第一个元素，或阻塞，直到有一个元素可用
BRPOP key1 [key2 ] timeout	|删除并获取列表中的最后一个元素，或阻塞，直到有一个元素可用
BRPOPLPUSH source destination timeout	|从列表中弹出值，将其推送到另一个列表并返回它; 或阻塞，直到一个可用
LINDEX key index	|通过其索引从列表获取元素
LINSERT key BEFORE/AFTER pivot value	|在列表中的另一个元素之前或之后插入元素
LLEN key	|获取列表的长度
LPOP key	|删除并获取列表中的第一个元素
LPUSH key value1 [value2]	|将一个或多个值添加到列表
LPUSHX key value	|仅当列表存在时，才向列表添加值
LRANGE key start stop	|从列表中获取一系列元素
LREM key count value	|从列表中删除元素
LSET key index value	|通过索引在列表中设置元素的值
LTRIM key start stop	|修剪列表的指定范围
RPOP key	|删除并获取列表中的最后一个元素
RPOPLPUSH source destination	|删除列表中的最后一个元素，将其附加到另一个列表并返回
RPUSH key value1 [value2]	|将一个或多个值附加到列表
RPUSHX key value	|仅当列表存在时才将值附加到列表

```
eg:
lpush mylist 1 2 3 4 5

rpush mylist a b

lrange mylist 0 1
> 1
> 2

lpop mylist
> 1

rpop mylist
> b

ltrim mylist 0 1
lrange mylist 0 -1
> 2
> 3

llen mylist
> 2
```

### Set(无序集合)

- Redis的Set是string类型的无序集合。
- 集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是O(1)。
- 添加一个string元素到,key对应的set集合中，成功返回1,如果元素已经在集合中返回0,key对应的set不存在返回错误。
- 集合中最大的成员数为 2^32 - 1

命令|描述
---|---
SADD key member1 [member2] |向集合添加一个或多个成员
SCARD key |获取集合的成员数
SDIFF key1 [key2] |返回给定所有集合的差集
SDIFFSTORE destination key1 [key2] |返回给定所有集合的差集并存储在 destination 中
SINTER key1 [key2] |返回给定所有集合的交集
SINTERSTORE destination key1 [key2] |返回给定所有集合的交集并存储在 destination 中
SISMEMBER key member |判断 member 元素是否是集合 key 的成员
SMEMBERS key |返回集合中的所有成员
SMOVE source destination member |将 member 元素从 source 集合移动到 destination 集合
SPOP key |移除并返回集合中的一个随机元素
SRANDMEMBER key [count] |返回集合中一个或多个随机数
SREM key member1 [member2] |移除集合中一个或多个成员
SUNION key1 [key2] |返回所有给定集合的并集
SUNIONSTORE destination key1 [key2] |所有给定集合的并集存储在 destination 集合中
SSCAN key cursor [MATCH pattern] [COUNT count] |迭代集合中的元素

```
eg:

```
### zset （有序集合)

- Redis zset 和 set 一样也是string类型元素的集合,且不允许重复的成员。
- 不同的是每个元素都会关联一个double类型的分数。redis正是通过分数来为集合中的成员进行从小到大的排序。
- zset的成员是唯一的,但分数(score)却可以重复。

命令|描述
---|---
ZADD key score1 member1 [score2 member2] |向有序集合添加一个或多个成员，或者更新已存在成员的分数
ZCARD key |获取有序集合的成员数
ZCOUNT key min max |计算在有序集合中指定区间分数的成员数
ZINCRBY key increment member |有序集合中对指定成员的分数加上增量 increment
ZINTERSTORE destination numkeys key [key ...] |计算给定的一个或多个有序集的交集并将结果集存储在新的有序集合 key 中
ZLEXCOUNT key min max |在有序集合中计算指定字典区间内成员数量
ZRANGE key start stop [WITHSCORES] |通过索引区间返回有序集合成指定区间内的成员
ZRANGEBYLEX key min max [LIMIT offset count] |通过字典区间返回有序集合的成员
ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT] |通过分数返回有序集合指定区间内的成员
ZRANK key member |返回有序集合中指定成员的索引
ZREM key member [member ...] |移除有序集合中的一个或多个成员
ZREMRANGEBYLEX key min max |移除有序集合中给定的字典区间的所有成员
ZREMRANGEBYRANK key start stop |移除有序集合中给定的排名区间的所有成员
ZREMRANGEBYSCORE key min max |移除有序集合中给定的分数区间的所有成员
ZREVRANGE key start stop [WITHSCORES] |返回有序集中指定区间内的成员，通过索引，分数从高到底
ZREVRANGEBYSCORE key max min [WITHSCORES] |返回有序集中指定分数区间内的成员，分数从高到低排序
ZREVRANK key member |返回有序集合中指定成员的排名，有序集成员按分数值递减(从大到小)排序
ZSCORE key member |返回有序集中，成员的分数值
ZUNIONSTORE destination numkeys key [key ...] |计算给定的一个或多个有序集的并集，并存储在新的 key 中
ZSCAN key cursor [MATCH pattern] [COUNT count] |迭代有序集合中的元素（包括元素成员和元素分值）

```
eg:
zadd sort1 0 a 1 b 1 c
```

### HyperLogLog
> 是一种使用随机化的算法，以少量内存提供集合中唯一元素数量的近似值。

> 可以接受多个元素作为输入，并给出输入元素的***基数***的***估算值***

- 优点：在输入元素的数量或者体积非常非常大时，计算基数所需的空间总是固定 的、并且是很小的。
- 每个 HyperLogLog 键只需要花费 12 KB 内存，就可以计算接近 2^64 个不同元素的基数。这和计算基数时，元素越多耗费内存就越多的集合形成鲜明对比。
- 因为 HyperLogLog 只会根据输入元素来计算基数，而不会储存输入元素本身，所以 HyperLogLog 不能像集合那样，返回输入的各个元素。

#### 一些定义
- **基数**：集合中不同元素的数量。比如 {‘apple’, ‘banana’, ‘cherry’, ‘banana’, ‘apple’} 的基数就是 3 。
- **估算值**：算法给出的基数并不是精确的，可能会比实际稍微多一些或者稍微少一些，但会控制在合理的范围之内。

#### 基本命令
命令|描述
---|---
PFADD key element [element ...] |添加指定元素到 HyperLogLog 中。
PFCOUNT key [key ...] |返回给定 HyperLogLog 的基数估算值。
PFMERGE destkey sourcekey [sourcekey ...] |将多个 HyperLogLog 合并为一个 HyperLogLog

### 常用键命令

命令|	描述
---|---
DEL key	|此命令删除一个指定键(如果存在)。
DUMP key	|此命令返回存储在指定键的值的序列化版本。
EXISTS key	| 此命令检查键是否存在。
	EXPIRE key seconds	|设置键在指定时间秒数之后到期/过期。
	EXPIREAT key timestamp	|设置在指定时间戳之后键到期/过期。这里的时间是Unix时间戳格式。
	PEXPIRE key milliseconds	|设置键的到期时间(以毫秒为单位)。
	PEXPIREAT key milliseconds-timestamp	|以Unix时间戳形式来设置键的到期时间(以毫秒为单位)。
	KEYS pattern	|查找与指定模式匹配的所有键。
	MOVE key db	|将键移动到另一个数据库。
	PERSIST key	|删除指定键的过期时间，得永生。
	PTTL key	|获取键的剩余到期时间。
	RANDOMKEY	|从Redis返回一个随机的键。
	RENAME key newkey	|更改键的名称。
	PTTL key	|获取键到期的剩余时间(以毫秒为单位)。
	RENAMENX key newkey	|如果新键不存在，重命名键。
	TYPE key	|返回存储在键中的值的数据类型。

[全部键命令](http://www.redis.cn/commands.html)

## 发布订阅
> Redis 发布订阅(pub/sub)是一种消息通信模式：发送者(pub)发送消息，订阅者(sub)接收消息。传送消息的链路称为信道。
> 
Redis 客户端可以订阅任意数量的频道。

### 命令

命令|描述
---|---
PSUBSCRIBE pattern [pattern ...] |订阅一个或多个符合给定模式的频道。
PUBSUB subcommand [argument [argument ...]] |查看订阅与发布系统状态。
PUBLISH channel message |将信息发送到指定的频道。
PUNSUBSCRIBE [pattern [pattern ...]] |退订所有给定模式的频道。
SUBSCRIBE channel [channel ...] |订阅给定的一个或多个频道的信息。
UNSUBSCRIBE [channel [channel ...]] |指退订给定的频道。

```
eg:
subscribe chat

新打开一个客户端
publish chat hello
```

## 事务

Redis 事务可以一次执行多个命令， 并且带有以下两个重要的保证：

- 事务是一个单独的隔离操作：事务中的所有命令都会序列化、按顺序地执行。事务在执行的过程中，不会被其他客户端发送来的命令请求所打断。
- 事务是一个原子操作：事务中的命令要么全部被执行，要么全部都不执行。

一个事务从开始到执行会经历以下三个阶段：

- 开始事务。
- 命令入队。
- 执行事务。

### 命令

命令|描述
---|---
DISCARD |取消事务，放弃执行事务块内的所有命令。
EXEC |执行所有事务块内的命令。
MULTI |标记一个事务块的开始。
UNWATCH |取消 WATCH 命令对所有 key 的监视。
WATCH key [key ...] |监视一个(或多个) key ，如果在事务执行之前这个(或这些) key 被其他命令所改动，那么事务将被打断。


## 脚本

Redis 脚本使用 Lua 解释器来执行脚本。 Reids 2.6 版本通过内嵌支持 Lua 环境。执行脚本的常用命令为 **EVAL**。

Eval 命令的基本语法如下：

- EVAL script numkeys key [key ...] arg [arg ...]

```
eg:

EVAL "return {KEYS[1],KEYS[2],ARGV[1],ARGV[2]}" 2 key1 key2 first second

1) "key1"
2) "key2"
3) "first"
4) "second"
```

命令|描述
---|---
EVAL script numkeys key [key ...] arg [arg ...] |执行 Lua 脚本。
EVALSHA sha1 numkeys key [key ...] arg [arg ...] |执行 Lua 脚本。
SCRIPT EXISTS script [script ...] |查看指定的脚本是否已经被保存在缓存当中。
SCRIPT FLUSH |从脚本缓存中移除所有脚本。
SCRIPT KILL |杀死当前正在运行的 Lua 脚本。
SCRIPT LOAD script |将脚本 script 添加到脚本缓存中，但并不立即执行这个脚本。


## Redis 连接命令

Redis 连接命令主要是用于连接 redis 服务。

### 命令

命令|描述
AUTH password |验证密码是否正确
ECHO message |打印字符串
PING |查看服务是否运行
QUIT |关闭当前连接
SELECT index |切换到指定的数据库

## redis服务器命令
Redis 服务器命令主要是用于管理 redis 服务。

### 命令
命令|描述
---|---
BGREWRITEAOF |异步执行一个 AOF（AppendOnly File） 文件重写操作
BGSAVE |在后台异步保存当前数据库的数据到磁盘
CLIENT KILL [ip:port] [ID client-id] |关闭客户端连接
CLIENT LIST |获取连接到服务器的客户端连接列表
CLIENT GETNAME |获取连接的名称
CLIENT PAUSE timeout |在指定时间内终止运行来自客户端的命令
CLIENT SETNAME connection-name |设置当前连接的名称
CLUSTER SLOTS |获取集群节点的映射数组
COMMAND |获取 Redis 命令详情数组
COMMAND COUNT |获取 Redis 命令总数
COMMAND GETKEYS |获取给定命令的所有键
TIME |返回当前服务器时间
COMMAND INFO command-name [command-name ...] |获取指定 Redis 命令描述的数组
CONFIG GET parameter |获取指定配置参数的值
CONFIG REWRITE |对启动 Redis 服务器时所指定的 redis.conf 配置文件进行改写
CONFIG SET parameter value |修改 redis 配置参数，无需重启
CONFIG RESETSTAT |重置 INFO 命令中的某些统计数据
DBSIZE |返回当前数据库的 key 的数量
DEBUG OBJECT key |获取 key 的调试信息
DEBUG SEGFAULT |让 Redis 服务崩溃
FLUSHALL |删除所有数据库的所有key
FLUSHDB |删除当前数据库的所有key
INFO [section] |获取 Redis 服务器的各种信息和统计数值
LASTSAVE |返回最近一次 Redis 成功将数据保存到磁盘上的时间，以 UNIX 时间戳格式表示
MONITOR |实时打印出 Redis 服务器接收到的命令，调试用
ROLE |返回主从实例所属的角色
SAVE |将数据集同步保存到磁盘
BGSAVE	|将数据集异步保存到磁盘
SHUTDOWN [NOSAVE] [SAVE] |同步保存数据到硬盘，并关闭服务器
SLAVEOF host port |将当前服务器转变为指定服务器的从属服务器(slave server)
SLOWLOG subcommand [argument] |管理 redis 的慢日志
SYNC |用于复制功能(replication)的内部命令

## 数据备份与恢复

### 备份

- SAVE 同步
- BGSAVE 异步

``` 
eg:
save
or
bgsave

该命令将在 redis 安装目录中创建dump.rdb文件。

```

### 恢复

- 如果需要恢复数据，只需将备份文件 (dump.rdb) 移动到 redis 安装目录并启动服务即可。获取 redis 目录可以使用 CONFIG 命令，如下所示：
```
CONFIG GET dir
```

## 安全
> 我们可以通过 redis 的配置文件设置密码参数，这样客户端连接到 redis 服务就需要密码验证，这样可以让你的 redis 服务更安全。

- 查看密码
```
CONFIG get requirepass
```

- 设置密码
```
CONFIG set requirepass "password"
```

- 设置密码之后如果要操作客户端，则需要先登录，否则报错；登录：

```
AUTH password
```

## 性能测试

- Redis 性能测试是通过同时执行多个命令实现的。

### 语法
```
redis-benchmark [option] [option value]

eg:
redis-benchmark -n 100000

redis-benchmark -h 127.0.0.1 -p 6379 -t set,lpush -n 10000 -q
```

### 参数

序号	|选项	|描述	|默认值
---|---|:---:|---:
1|	-h	|指定服务器主机名	|127.0.0.1
2|	-p	|指定服务器端口	|6379
3|	-s	|指定服务器 socket	
4|	-c	|指定并发连接数	|50
5|	-n	|指定请求数	|10000
6|	-d	|以字节的形式指定 SET/GET 值的数据大小	|2
7|	-k	|1=keep alive 0=reconnect	|1
8|	-r	|SET/GET/INCR 使用随机 key, SADD 使用随机值	
9|	-P	|通过管道传输 <numreq> 请求	|1
10|	-q	|强制退出 redis。仅显示 query/sec 值	
11|	--csv	|以 CSV 格式输出	
12|	-l	|生成循环，永久执行测试	
13|	-t	|仅运行以逗号分隔的测试命令列表。	
14|	-I	|Idle 模式。仅打开 N 个 idle 连接并等待。	
## 管道技术

Redis是一个TCP服务器，支持请求/响应协议。 在Redis中，请求通过以下步骤完成：

- 客户端向服务器发送查询，并从套接字读取，通常以阻塞的方式，用于服务器响应。
- 服务器处理命令并将响应发送回客户端。

### 管道的意义
管道的基本含义是，客户端可以向服务器发送多个请求，而不必等待回复，并最终在一个步骤中读取回复。


### 管道的好处

这种技术的好处是大大提高了协议性能。通过管道从连接到本地主机速度增加五倍，因特网连接的至少快一百倍。

## 分区

分区是分割数据到多个Redis实例的处理过程，因此每个实例只保存key的一个子集。

### 优势

- 通过利用多台计算机内存的和值，允许我们构造更大的数据库。


- 通过多核和多台计算机，允许我们扩展计算能力；通过多台计算机和网络适配器，允许我们扩展网络带宽。

### 不足

redis的一些特性在分区方面表现的不是很好：

- 涉及多个key的操作通常是不被支持的。举例来说，当两个set映射到不同的redis实例上时，你就不能对这两个set执行交集操作。

- 涉及多个key的redis事务不能使用。


- 当使用分区时，数据处理较为复杂，比如你需要处理多个rdb/aof文件，并且从多个实例和主机备份持久化文件。


- 增加或删除容量也比较复杂。redis集群大多数支持在运行时增加、删除节点的透明数据平衡的能力，但是类似于客户端分区、代理等其他系统则不支持这项特性。然而，一种叫做presharding的技术对此是有帮助的。

### 类型
Redis 有两种类型分区。 

假设有4个Redis实例 R0，R1，R2，R3，和类似user:1，user:2这样的表示用户的多个key，对既定的key有多种不同方式来选择这个key存放在哪个实例中。也就是说，有不同的系统来映射某个key到某个Redis服务。

#### 范围分区

最简单的分区方式是按范围分区，就是映射一定范围的对象到特定的Redis实例。
比如，ID从0到10000的用户会保存到实例R0，ID从10001到 20000的用户会保存到R1，以此类推。
这种方式是可行的，并且在实际中使用，不足就是要有一个区间范围到实例的映射表。这个表要被管理，同时还需要各 种对象的映射表，通常对Redis来说并非是好的方法。

#### 哈希分区

另外一种分区方法是hash分区。这对任何key都适用，也无需是object_name:这种形式，像下面描述的一样简单：

- 用一个hash函数将key转换为一个数字，比如使用crc32 hash函数。对key foobar执行crc32(foobar)会输出类似93024922的整数。

- 对这个整数取模，将其转化为0-3之间的数字，就可以将这个整数映射到4个Redis实例中的一个了。93024922 % 4 = 2，就是说key foobar应该被存到R2实例中。注意：取模操作是取除的余数，通常在多种编程语言中用%操作符实现。