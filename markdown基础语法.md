# markdown教程

- 作者：杨家祺



## 目录

- 概述

- 基础用法

- 高级用法

  

## 概述

Markdown是一种轻量级标记语言。它允许人们使用易读易写的纯文本格式编写文档，然后转换成格式丰富的HTML页面。Markdown的写法比较简单，操作容易，是一种发布语言，Markdown将文档的样式和文本的内容分离开，在文本中只声明结构，而具体的样式渲染交由所依附的编译器渲染引擎负责。主要的Markdown编译器有如几种：MarkdownPad、Typora、BookPad以及Visual Studio Code等。



## 基础用法

### 1. 标题

# 一级标题

一级标题
=
二级标题
-

## 二级标题（自带底部横线）

### 三级标题
#### 四级标题

##### 五级标题

###### 六级标题

```
# 一级标题
一级标题
=
二级标题
-
## 二级标题（自带底部横线）
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```
### 2. 引用

>你好啊，我是引用。
>
>>还能这么玩

```
>你好啊，我是引用。
>>还能这么玩
```
### 3. 无序列表\* + -

* 1
* 2
+ 4
- 5
- 7

```
* 1
* 2
+ 4
- 5
- 7
```

### 4. 有序列表

1. 234
2. 234
3. 234
6. 234

```
1. 234
2. 234
3. 234
4. 234
```

### 5. 链接，图片在最前面增加`!`不再赘述

[这是一个链接](http://www.baidu.com)\[]()

>隐式链接
>
>[Google1][test]

[test]: http://google.com/

>隐式链接,图片等同
>
>[Google2][]

[Google2]: http://google.com/


>自助链接

<http://www.baidu.com>

>页内链接

[跳到最下面(底部a标签)](#down).



```
[这是一个链接](http://www.baidu.com)\[]()

>隐式链接
>
>[Google1][test]

[test]: http://google.com/

>隐式链接,图片等同
>
>[Google2][]

[Google2]: http://google.com/


>自助链接

<http://www.baidu.com>

>页内链接

[跳到最下面(底部a标签)](#down).
```



### 6. 图片

>  ![alt 图片](图片链接)

![alt 图像](https://pics0.baidu.com/feed/d043ad4bd11373f0efffe991ada08ef1faed0431.jpeg@f_auto?token=5c8e2327d4d52783e38c28fee678b881)



### 7. 代码块

>代码框(\` 或者 ~)

`这是一个代码框`

\`这是一个代码框\`

>代码块(\```或者~~~)

```
代码块hello
代码块
		代码块
代码块
```

~~~
代码块
~~~

\`\`\`
代码块hello
代码块
		代码块
代码块
\`\`\`

\~~~
代码块
\~~~



### 8. 分割线

>(***或者---或者- - - 或者 * * *）

***

---

- - -

* * *

```
***
---
- - -
* * *
```
### 9. 表格 三个（-）以上分行

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |



First Header  | Second Header|thred
---           | ---          |-----
Content Cell  | Content Cell |thred
Content Cell  | Content Cell |thred

```
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |



First Header  | Second Header|thred
---           | ---          |-----
Content Cell  | Content Cell |thred
Content Cell  | Content Cell |thred

```

### 10. 字体

>粗体\** xxx ** 或者 __ xxx __ 或者 command-b
**这是粗体**   

__这是粗体__ 

```
**这是粗体**   

__这是粗体__ 
```

> 斜体\* xxx * 或者 _ xxx _ 或者 command-i

*这是斜体* 

_这是斜体_

```
*这是斜体* 

_这是斜体_
```
>粗斜体

***粗斜体***

```
***粗斜体***
```


### 11. 反斜杠

> 反斜杠特殊用法，支持以下这些符号前面加上反斜杠来帮助插入普通的符号：

```
\   反斜线
`   反引号
*   星号
_   底线
{}  花括号
[]  方括号
()  括弧
#   井字号
+   加号
-   减号
.   英文句点
!   惊叹号
```



## 高级用法

markdown支持简单的html标签，所以可以自定义样式以及排版，比如设置字体：

### 1. 设置字体样式

```
<font face="黑体" color=green size=5>我是黑体，绿色，字体大小为5</font>
```

<font face="黑体" color=green size=5>我是黑体，绿色，字体大小为5



### 2. 数学公式

MarkDown可以插入 LaTex 数学公式。支持行内公式以及公式块。默认是不支持的，需要我们在文件-偏好设置中设置一下：勾上内联公式

> 行内公式：$内联公式$

```
$x^4$
```

$x^4$



> (行间)公式块
>
> $$ 行间公式 $$

```
$$
x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}
$$
```

$$
x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}
$$

### 3. 支持emoji表情

| `:angry:`😠      | `:astonished:`😲 | `:cold_sweat:`**😰** | `:cry:`**😢** | `:disappointed:`**😞** |
| --------------- | --------------- | ------------------- | ------------ | --------------------- |
| `:dizzy_face:`😵 | `yum:`😋         | `:smirk:`😏          | `:smiley:`😃  | ...                   |





&copy;

<a name="down"/>

```
底部的a标签，内部跳转使用
<a name="down"/>
```

