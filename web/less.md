## Less语法
### 变量

```
@nice-blue: #5B83AD;
@light-blue: @nice-blue + #111;

#header {
  color: @light-blue;
}

输出:
#header {
  color: #6c94be;
}

```
*注意 LESS 中的变量为完全的 `常量` ，所以只能定义一次.*


### 作用域
Less 中的作用域与编程语言中的作用域概念非常相似。首先会在局部查找变量和混合，如果没找到，编译器就会在父作用域中查找，依次类推


```
@var: red;

#page {
  @var: white;
  #header {
    color: @var; // white
  }
}
```

Less是[lazy load](http://lesscss.cn/features/#variables-feature-lazy-loading)，变量和混合不必在使用前声明，因此下面的代码与前面的例子等价：

```
@var: red;

#page {
  #header {
    color: @var; // white
  }
  @var: white;
}
```
### 运算

任何数值，颜色和变量都可以进行运算，Less 能够推断颜色和单位之间的区别

```
@base: 5%;
@filler: @base * 2;
@other: @base + @filler;

color: #888 / 4;
background-color: @base-color + #111;
height: 100% / 2 + @filler;
```

### 函数

Less 提供了许多用于转换颜色，处理字符串和进行算术运算的函数。这些函数使用起来非常简单。在下面的例子中我们使用 percentage 将 0.5 转换为 50%，然后将基础颜色值的饱和度增加了 5%，最后将背景颜色的亮度增加了 25% 之后又将色相值增加 8:

```
@base: #f04615;
@width: 0.5;

.class {
  width: percentage(@width); // returns `50%`
  color: saturate(@base, 5%);
  background-color: spin(lighten(@base, 25%), 8);
}
```
[更多函数参见Less函数手册](http://lesscss.cn/functions/)

### 父选择器

`&`运算符表示一个嵌套规则的父选择器，它在应用修改类或者应用伪类给现有选择器时最常用：


```
a {
  color: blue;
  &:hover {
    color: green;
  }
}
```
输出结果为：

```
a {
  color: blue;
}

a:hover {
  color: green;
}
```
“父选择器”有各种各样的用法。基本上，任何时候你都需要以不同的方式来组合选择器嵌套的规则，而不是默认规则。比如，一个使用&的典型的场景就是生成重复的类名：

```
.button {
  &-ok {
    background-image: url("ok.png");
  }
  &-cancel {
    background-image: url("cancel.png");
  }

  &-custom {
    background-image: url("custom.png");
  }
}
```
输出：

```
.button-ok {
  background-image: url("ok.png");
}
.button-cancel {
  background-image: url("cancel.png");
}
.button-custom {
  background-image: url("custom.png");
}
```


### 注释
可以使用块注释和行注释:

```
/* 多行注释会编译输出到最终的css文件 */
@var: red;

// 单行行注释不会编译输出到最终的css文件
@var: white;
```

### 命名空间
有时候，出于组织的目的，或者为了提供一些库的封装，你会希望将你的mixins 组合在一起。假设你想在 `#bundle` 下捆绑一些 mixins 和变量，以便复用或者作为库发布：


```
#bundle {
  .button {
    display: block;
    border: 1px solid black;
    background-color: grey;
    &:hover {
      background-color: white
    }
  }
  .tab { ... }
  .citation { ... }
}
```

现在如果我们想在 #header a 中混合 .button 类，那么我们可以这样做`#Namespace > .mixin-name`：

```
#header a {
  color: orange;
  #bundle > .button;
}
```
*注意命名空间中声明的变量外部作用域是无法访问的，外部只能访问`mixin`*

### 嵌套规则
Less 提供了嵌套的能力,模仿 HTML 的结构，例如

```
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
  }
}
```

### 混合

混合就是一种将一系列属性从一个规则集引入(“混合”)到另一个规则集的方式，假设我们有以下 class

```
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
```
我们希望在另一个规则集内部使用上面这些属性。那么，我们就只需要访问我们想要的属性所在类的名称即可，就像下面这样

```
#menu a {
  color: #111;
  .bordered;
}

.post a {
  color: red;
  .bordered;
}
```


#### 带参数混合
`mixins`也可以接受参数，在它进行mix in操作时会将变量传递给选择器代码块。比如：

```
.border-radius(@radius) {
  -webkit-border-radius: @radius;
     -moz-border-radius: @radius;
          border-radius: @radius;
}
```

接下来，你可以在系一些规则集中混入变量值：

```
#header {
  .border-radius(4px);
}
.button {
  .border-radius(6px);
}
```
对于这些进行mixin操作的参数也可以有默认值：

```
.border-radius(@radius: 5px) {
  -webkit-border-radius: @radius;
     -moz-border-radius: @radius;
          border-radius: @radius;
}
```

然后你可以像这样调用它：


```
#header {
  .border-radius;
}
```

你也可以使用不接受参数的mixins。如果你想从输出的CSS中隐藏规则集，但是又想在其他规则集中包含它的属性，这个特性是很有用的：

```
.wrap() {
  text-wrap: wrap;
  white-space: -moz-pre-wrap;
  white-space: pre-wrap;
  word-wrap: break-word;
}

pre { .wrap }
```

这样在输出文件中，`mixins`不会出现：


```
pre {
  text-wrap: wrap;
  white-space: -moz-pre-wrap;
  white-space: pre-wrap;
  word-wrap: break-word;
}
```
#### 带多个参数的`mixins`

参数可以用分号或者逗号分割。但是推荐使用分号分割。因为逗号符号有两个意思：它可以解释为mixins参数分隔符或者css列表分隔符。

使用逗号作为mixin的分隔符则无法用它创建逗号分割的参数列表。换句话说，如果编译器在mixin调用或者声明中看到至少一个分号，它会假设参数是由分号分割的，而所有的逗号都属于CSS列表:
>
* 两个参数，并且每个参数都是逗号分割的列表：.name(1,2,3;something, ele)，
* 三个参数，并且每个参数都包含一个数字：.name(1,2,3)，
* 使用伪造的分号创建mixin，调用的时候参数包含一个逗号分割的css列表：.name(1,2,3;)，
* 逗号分割默认值：.name(@param1: red, blue)。

定义多个具有相同名称和参数数量的mixins是合法的。Less会使用它可以应用的属性。如果使用mixin的时候只带一个参数，比如.mixin(green)，这个属性会导致所有的mixin都会使用强制使用这个明确的参数：

```
.mixin(@color) {
  color-1: @color;
}
.mixin(@color; @padding:2) {
  color-2: @color;
  padding-2: @padding;
}
.mixin(@color; @padding; @margin: 2) {
  color-3: @color;
  padding-3: @padding;
  margin: @margin @margin @margin @margin;
}
.some .selector div {
  .mixin(#008000);
}
```

回编译为：

```
.some .selector div {
  color-1: #008000;
  color-2: #008000;
  padding-2: 2;
}
```

#### @arguments 变量

`@arguments`在`mixins`内部有特殊意义，调用mixin时，它包含所有传入的参数。如果你不想单个单个的处理参数，这一特性是很有用的：

```
.box-shadow(@x: 0; @y: 0; @blur: 1px; @color: #000) {
  -webkit-box-shadow: @arguments;
     -moz-box-shadow: @arguments;
          box-shadow: @arguments;
}
.big-block {
  .box-shadow(2px; 5px);
}
```
输出结果：


```
.big-block {
  -webkit-box-shadow: 2px 5px 1px #000;
     -moz-box-shadow: 2px 5px 1px #000;
          box-shadow: 2px 5px 1px #000;
}
```


##Extend（扩展）
```
nav ul {
  &:extend(.inline);
  background: blue;
}
.inline {
  color: red;
}
```
在上面设置的规则中，:`extend`选择器会在.inline类出现的地方在.inline上应用"扩展选择器"(也就是nav ul)。


```
nav ul {
  background: blue;
}
.inline,
nav ul {
  color: red;
}
```

extend可以附加给一个选择器，也可以放入一个规则集中。

```
.a:extend(.b) {}

// 上面的代码块与下面这个做一样的事情
.a {
  &:extend(.b);
}
```
为选择器添加的扩展都必须放在选择器的尾部

* 选择器之后的扩展：pre:hover:extend(div pre)。
* 在选择器和扩展之间有空格是允许的：pre:hover :extend(div pre).
* 也允许有多个扩展: pre:hover:extend(div pre):extend(.bucket tr) - 注意这与 pre:hover:extend(div pre, .bucket tr)一样。
* 这是不允许的: pre:hover:extend(div pre).nth-child(odd)。因为扩展必须在最后。


extend的经典用例就是避免添加基础类、合并样式、替代mixin等。
比如，如果你有：

```
.animal {
  background-color: black;
  color: white;
}
```
如果你想有一个animal子类型，并且要重写背景颜色。那么在你的less中使用extend

```
.animal {
  background-color: black;
  color: white;
}
.bear {
  &:extend(.animal);
  background-color: brown;
}
```

`Mixins`会复制所有的属性到选择器中，这可能导致不必要的重复。因此你可以使用`extend`来代替mixin将你要用的属性移过去，这样就会生成更少的CSS。

mixin示例：

```
.my-inline-block() {
    display: inline-block;
  font-size: 0;
}
.thing1 {
  .my-inline-block;
}
.thing2 {
  .my-inline-block;
}
```
输出：


```
.thing1 {
  display: inline-block;
  font-size: 0;
}
.thing2 {
  display: inline-block;
  font-size: 0;
}
```

extend示例：


```
.my-inline-block {
  display: inline-block;
  font-size: 0;
}
.thing1 {
  &:extend(.my-inline-block);
}
.thing2 {
  &:extend(.my-inline-block);
}
```
`extend`合并后直接分组输出：


```
.my-inline-block,
.thing1,
.thing2 {
  display: inline-block;
  font-size: 0;
}
```
另一个用例可以用作mixin的替代 - 因为mixin仅仅能用于简单的选择器，如果你的html中有两个不同的块，但是你需要为这两个块应用相同的样式，那么你可以使用extend来关联这两块。

```
li.list > a {
  // list styles
}
button.list-style {
  &:extend(li.list > a); // 使用相同的列表样式
}
```

## 文件导入

**语法：`@import` `(keyword)` `"filename"`;**

下面导入指令已经被实现了：

* reference：使用Less文件但不输出
* inline：在输出中包含源文件但不加工它
* less：将文件作为Less文件对象，无论是什么文件扩展名
* css：将文件作为CSS文件对象，无论是什么文件扩展名
* once：只包含文件一次（默认行为）
* multiple：包含文件多次

##安装使用
安装 `npm install less -g`

编译 `lessc [option option=parameter ...] <source> [destination]`


例如


```
# compile bootstrap.less to bootstrap.css
$ lessc bootstrap.less bootstrap.css

# compile bootstrap.less to bootstrap.css and minify (compress) the result
$ les

sc -x bootstrap.less bootstrap.css
```
[更多选项设置传送门](http://www.lesscss.net/usage/#command-line-usage)

查看帮助 `lessc --help 或者 lessc --h`

### UI编译工具[Koala](http://koala-app.com/index-zh.html)