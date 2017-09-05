## YAML
#### 简介
`YAML` 语言的基本语法规则如下
>
* 大小写敏感
* 使用缩进表示层级关系
* 缩进时不允许使用Tab键，只允许使用空格。
* 缩进的空格数目不重要，只要相同层级的元素左侧对齐即可
* `#` 表示注释，从这个字符一直到行尾，都会被解析器忽略。

`YAML` 支持的数据结构有三种。
>
* 对象：键值对的集合，又称为映射（mapping）/ 哈希（hashes） / 字典（dictionary）
* 数组：一组按次序排列的值，又称为序列（sequence） / 列表（list）
* 纯量（scalars）：单个的、不可再分的值

#### 对象
对象的一组键值对，使用冒号结构表示：

```
animal: pets 

//{ animal: 'pets' }


// 将所有键值对写成一个行内对象
hash: { name: Steve, foo: bar } 

// { hash: { name: 'Steve', foo: 'bar' } }

```

#### 数组

一组`连词线(-)`开头的行，构成一个数组。

```
- Cat
- Dog
- Goldfish

// [ 'Cat', 'Dog', 'Goldfish' ]
```

数据结构的元素是一个数组，则可以在该项下面缩进一个空格。

```
-
 - Cat
 - Dog
 - Goldfish

 // [ [ 'Cat', 'Dog', 'Goldfish' ] ]

```

数组也可以采用行内表示法

```
animal: [Cat, Dog]

// { animal: [ 'Cat', 'Dog' ] }
```

#### 纯量
纯量是最基本的、不可再分的值。以下数据类型都属于 JavaScript 的纯量。
>
* 字符串
* 布尔值
* 整数
* 浮点数
* Null
* 时间
* 日期

```
// 数值
number: 12.30 // => { number: 12.30 }

// 布尔值
isSet: true // => { isSet: true }

// null用~表示。
parent: ~ // => { parent: null }

// 时间采用 ISO8601 格式。
iso8601: 2001-12-14t21:59:43.10-05:00 
// => { iso8601: new Date('2001-12-14t21:59:43.10-05:00') }

// 日期采用复合 iso8601 格式的年、月、日表示。
date: 1976-07-31 // => { date: new Date('1976-07-31') }
```

YAML 允许使用两个感叹号，强制转换数据类型。

```
e: !!str 123
f: !!str true

// 转为json=> { e: '123', f: 'true' }
```

#### 字符串
字符串默认不使用引号表示

```
str: 这是一行字符串

// => { str: '这是一行字符串' }
```

如果字符串之中包含空格或特殊字符，需要放在引号之中。

```
str: '内容： 字符串'
// => { str: '内容: 字符串' }
```

单引号和双引号都可以使用，双引号不会对特殊字符转义。

```
s1: '内容\n字符串'
s2: "内容\n字符串"

// => { s1: '内容\\n字符串', s2: '内容\n字符串' }
```

单引号之中如果还有单引号，必须连续使用两个单引号转义。

```
str: 'labor''s day' 

// => { str: 'labor\'s day' }
```

字符串可以写成多行，从第二行开始，必须有一个单空格缩进。换行符会被转为空格。

```
str: 这是一段
  多行
  字符串
  
// => { str: '这是一段 多行 字符串' }
```
多行字符串可以使用`|`保留换行符，也可以使用`>`折叠换行

```
this: |
  Foo
  Bar
that: >
  Foo
  Bar
  
// => { this: 'Foo\nBar\n', that: 'Foo Bar\n' }
```

#### 引用
锚点`&`和别名`*`，可以用来引用。

```
defaults: &defaults
  adapter:  postgres
  host:     localhost

development:
  database: myapp_development
  <<: *defaults

test:
  database: myapp_test
  <<: *defaults
```

等同于下面的代码。

```
defaults:
  adapter:  postgres
  host:     localhost

development:
  database: myapp_development
  adapter:  postgres
  host:     localhost

test:
  database: myapp_test
  adapter:  postgres
  host:     localhos
```

`&`用来建立锚点（defaults），`<<`表示合并到当前数据，`*`用来引用锚点