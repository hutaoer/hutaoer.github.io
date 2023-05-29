---
sidebar: auto
category: 学习笔记
tags:
  - 数据库
  - MongoDB
---

# MongoDB 学习笔记 —— 基础

## 基本概念
* 它是一个基于分布式文件存储的开源数据库系统。在高负载的情况下，添加更多的节点，可以保证服务器性能。
* 它将数据存储为一个文档，数据结构为键值对，类似于JSON对象。
* 文档不需要设置相同的字段，并且相同的字段不需要相同的数据类型，这与关系型数据库有很大的区别，也是 MongoDB 非常突出的特点。

## 安装
* 添加到`PATH`，`export PATH=/usr/local/mongodb/bin:$PATH`
* 启动`mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log --fork`

### SQL 和 MongoDB 术语对比
| SQL         | MongoDB     | 备注         |
| ----------- | ----------- | ----------- |
| database（数据库）| database（数据库）| 相同   |
| table （数据库表）| collection（集合）| 不同  |
| row（数据记录）| document（文档）| 不同  |
| column（数据字段）| field（域）| 不同  |
| index（索引）| index（索引）| 相同  |
| table joins （表连接）| 不支持表连接，支持嵌入文档 | 不同  |
| primary key（主键） | primary key（自动将_id设置为主键）| 不同  |

* 注意：
  - 文档的键，这个键的值可以是任何类型的，默认是个 ObjectId 对象
  - 文档中的键/值对是有序的。
  - 键不能含有\0 (空字符)。这个字符用来表示键的结尾。
  - .和$有特别的意义，只有在特定环境下才能使用。

### 数据类型
* `String`: 字符串，UTF-8 编码的字符串才是合法的。
* `Array`: 用于将数组或列表或多个值存储为一个键。
* `Timestamp`: 时间戳。
* `Object`: 用于内嵌文档。
* `Object ID`: 对象ID，用于创建文档的ID
* `Code`: 代码类型，用于在文档中存储 `javascript`代码。

## 常用API
* `show dbs`，查看数据库。
* `use [dbName]`，使用某个数据库，若不存在，则创建该数据库。
* `db.DropDatabase()`, 切换到某个数据库下面后，使用该命令，可删除该数据库。
* `show tables` or `show collections`，显示数据下的集合。
* `db.createCollection(name, options)`，创建集合，options为选项。 
* `db.tbName.drop()`, tbName为集合名字，使用该命令可删除该集合。
* `db.tbName.find()`, 查看tbName中的文档。 

### 插入文档
* `db.tbName.insert(document)`，插入文档。当插入文档的时候，会自动创建集合。
* `db.tbName.save(document)`, 该方法新版本中已经废弃。
* 3.2版本后，新增了方法：
  - `db.collection.insertOne()`，用于插入一条数据
  - `db.collection.insertMany()`，用于插入多条数据
* 也可以将文档数据存到一个变量中，通过传参的方式进行插入。

### 更新文档
* `db.collection.save(document)`,save() 方法通过传入的文档来替换已有文档，`_id `主键存在就更新，不存在就插入。
* `update`方法：
```js
db.collection.update(
   <query>, // query : update的查询条件，类似sql update查询内where后面的。
   <update>, // update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的
   {
     upsert: <boolean>,
     multi: <boolean>,
     writeConcern: <document>
   }
)
```

### 删除文档
```js
db.collection.remove(
   <query>,
   {
     justOne: <boolean>,
     writeConcern: <document>
   }
)
```
* 推荐使用`deleteOne(<query>)`（删除一个）和`deleteMany(<query>)`（删除多个）
* 清空集合：`db.col.remove({})`

### 查询文档
* `db.collection.find(query, projection)`
* `db.collection.findOne(query, projection)`
* `projection`,可选，使用投影操作符指定返回的键。查询时返回文档中所有键值， 只需省略该参数即可。

## 操作符

### 条件操作符
| 操作         | 格式     | 备注         |
| ----------- | ----------- | ----------- |
| 等于| `{<key>:<value>}`|  等号`=`  |
| 小于|`{<key>:{$lt:<value>}}`| 小于号`<`  |
| 小于或等于|`{<key>:{$lte:<value>}}`| 小于等于号`<=`  |
| 大于|`{<key>:{$gt:>value>}}`| 大于号`>`  |
| 大于等于|`{<key>:{$gte:>value>}}`| 大于等于号`>=`  |
| 不等于| `{<key>:{$ne:<value>}`|  不等号`!=`  |

### AND 条件
* `db.col.find({key1:value1, key2:value2}).pretty()`

### OR 条件
```js
db.col.find(
   {
      $or: [
         {key1: value1}, {key2:value2}
      ]
   }
).pretty()
```

### AND 和 OR 联合使用
* `db.col.find({"count": {$gt:50}, $or: [{"name": "名称"},{"title": "标题"}]}).pretty()`

### $type 操作符
* $type操作符是基于BSON类型来检索集合中匹配的数据类型，并返回结果。

### 其他API
* `db.COLLECTION_NAME.find().limit(NUMBER)`，limit()方法接受一个数字参数，该参数指定从MongoDB中读取的记录条数。
* `db.COLLECTION_NAME.find().sort({KEY:1})`, 1 为升序排列，而 -1 是用于降序排列。

## 索引
* `db.collection.createIndex(keys, options)` 创建索引，Key 值为你要创建的索引字段，1 为指定按升序创建索引，如果你想按降序来创建索引指定为 -1 即可。
* `db.values.createIndex({open: 1, close: 1}, {background: true})`，建索引过程会阻塞其它数据库操作，background可指定以后台方式创建索引。

## 聚合

## 复制
* mongodb的复制至少需要两个节点。其中一个是主节点，负责处理客户端请求，其余的都是从节点，负责复制主节点上的数据。
* 主节点记录在其上的所有操作oplog，从节点定期轮询主节点获取这些操作，然后对自己的数据副本执行这些操作，从而保证从节点的数据与主节点一致。









