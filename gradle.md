#[gradle](https://docs.gradle.org/current/userguide/userguide.html)
##gradle是什么

Gradle是一个基于Apache Ant和Apache Maven概念的项目自动化建构工具。它使用一种基于Groovy的特定领域语言(DSL)来声明项目设置，抛弃了基于XML的各种繁琐配置。 面向Java应用为主。当前其支持的语言限于Java、Groovy和Scala，计划未来将支持更多的语言。

##为什么使用 Groovy?
完整的Gradle API是使用Groovy语言设计的。这是基于XML内部 [DSL](https://blog.csdn.net/yimi1995/article/details/76906573) 的优点。Gradle是其核心的通用构建工具; 它的主要焦点是Java项目。在这些项目中，团队成员要熟悉Java，这是为了更好的构建透明，给所有团队成员的项目。

 类似于 Python，Groovy或Ruby语言是最好的构建框架。为什么Groovy被选中？这是因为它为使用Java的人提供了迄今为止最大的透明度。Groovy的基本语法与Java是一样的。

你可能会想说，为什么不能使用 Java 来作为构建脚本的语言。 我认为这是一个很有意义的问题。对你们的团队来讲，它确实会有最高的透明度和最低的学习曲线。 但由于 Java 本身的局限性，这种构建语言可能就不会那样友善、 富有表现力和强大。 [1] 这也是为什么像 Python，Groovy 或者 Ruby 这样的语言在这方面表现得更好的原因。 我们选择了 Groovy，因为它向 Java 人员提供了目前为止最大的透明度。 其基本的语法，类型，包结构和其他方面都与 Java 一样，Groovy 在这之上又增加了许多东西。但是和 Java 也有着共同点。


##特性说明
这里简述下 Gradle 的特点.

- 声明式构建和合约构建

> Gradle 的核心是基于 Groovy 的 领域特定语言 (DSL), 具有十分优秀的扩展性. Gradle 通过提供可以随意集成的声明式语言元素将声明性构建推到了一个新的高度. 这些元素也为 Java, Groovy, OSGi, Web 和Scala 等项目提供基于合约构建的支持. 而且, 这种声明式语言是可扩展的. 你可以添加自己的语言元素或加强现有的语言元素, 从而提供简洁, 易于维护和易于理解的构建.

- 基于依赖的编程语言

> 声明式语言位于通用任务图 ( general purpose task graph ) 的顶端，它可以被充分利用在你的构建中. 它具有强大的灵活性, 可以满足使用者对 Gradle 的一些特别的需求.

- 让构建结构化

> Gradle 的易适应性和丰富性可让你在构建里直接套用通用的设计原则. 例如, 你可以非常容易地使用一些可重用的组件来构成你的构建. 但是不必要的间接内联内容是不合适的. 不要强行拆分已经结合在一起的部分 (例如, 在你的项目层次结构中). 避免使构建难以维护. 总之, 你可以创建一个结构良好，易于维护和易于理解的构建.

- API深化

> 你会非常乐意在整个构建执行的生命周期中使用 Gradle, 因为Gradle 允许你管理和定制它的配置和执行行为.

- Gradle 扩展

> Gradle 扩展得非常好. 不管是简单的独立项目还是大型的多项目构建, 它都能显著的提高效率. 这是真正的结构构建. 顶尖水平的构建功能，还可以解决许多大公司碰到的构建 性能低下的问题.

- 多项目构建

> Gradle 对多项目的支持是非常出色的. 项目依赖是很重要的部分. 它允许你模拟在多项目构建中项目的关系，这正是你所要关注的地方. Gradle 可以适应你的项目的结构, 而不是反过来.
> 
Gradle 提供了局部构建的功能. 如果你构建一个单独的子项目, Gradle 会构建这个子项目依赖的所有子项目. 你也可以选择依赖于另一个特别的子项目重新构建这些子项目. 这样在一些大型项目里就可以节省非常多的时间.

- 多种方式来管理你的依赖

> 不同的团队有不同的管理外部依赖的方法. Gradle 对于任何管理策略都提供了合适的支持. 从远程 Maven 和 Ivy 库的依赖管理到本地文件系统的 jars 或者 dirs.

- Gradle 是第一个构建整合工具

> Ant 的 tasks是 Gradle 中很重要的部分, 更有趣是 Ant 的 projects 也是十分重要的部分. Gradle 可以直接引入Ant 项目, 并在运行时直接将 Ant targets 转换成 Gradle tasks. 你可以从 Gradle 中依赖它们, 并增强它们的功能, 甚至可以在 build.xml 文件中声明 Gradle tasks 的依赖. 并且properties, paths 等也可以通过同样的方法集成进来.
> 
Gradle 完全支持你已有的 Maven 或者 lvy 仓库来构造发布或者提取依赖. Gradle 也提供了一个转化器, 用来将 maven 的 pom.xml 文件转换成 Gradle 脚本. 在运行时引入 Maven 项目也会在稍后推出.

- 易于迁移

> Gradle 可以兼容任何结构. 因此你可以直接在你的产品构建的分支上开发你的 Gradle 构建, 并且二者可以并行. 我们通常建议编写一些测试代码来确保它们的功能是相同的. 通过这种方式, 在迁移的时候就不会显得那么混乱和不可靠, 这是通过婴儿学步的方式来获得最佳的实践.

- Groovy

> Gradle 的构建脚本是通过 Groovy 编写的而不是 XML. 但是并不像其他方式, 这并不是为了简单的展示用动态语言编写的原始脚本有多么强大. 不然的话, 只会导致维护构建变得非常困难. Gradle 的整个设计是朝着一种语言的方向开发的, 并不是一种死板的框架. Groovy 就像胶水一样, 把你想实现的构想和抽象的 Gradle 粘在一起. Gradle提供了一些标准的构想, 但是他们并不享有任何形式的特权. 相比于其他声明式构建系统，对我们来说这是一个比较突出的特点.
> 
简单的语法学习：https://blog.csdn.net/u012070360/article/details/82624328

- Gradle 包装器

> Gradle 包装器允许你在没有安装 Gradle 的机器上运行 Gradle 构建. 在一些持续集成的服务器上, 这个功能将非常有用. 它同样也能降低使用一个开源项目的门槛, 也就是说构建它将会非常简单. 这个包装器对于公司来说也是很有吸引力的. 它并不需要为客户机提供相应的管理防范. 这种方式同样也能强制某一个版本 Gradle 的使用从而最小化某些支持问题.

- 11免费和开源

> Gradle 是一个开源项目, 遵循 ASL 许可.


##安装

###前置准备
Gradle 需要运行在一个 Java 环境里

- 安装一个 Java JDK 或者 JRE. 而且 Java 版本必须至少是 6 以上.
- Gradle 自带 Groovy 库, 所以没必要安装 Groovy. 任何已经安装的 Groovy 会被 Gradle 忽略.

Gradle 使用任何已经存在在你的路径中的 JDK (可以通过 java -version 检查, 如果有就说明系统已经安装了 Java 环境). 或者, 你也可以设置 JAVA_HOME 环境参数来指定希望使用的JDK的安装目录.

###安装配置
[Gradle网站](https://gradle.org/install/)

> 自动

`brew install gradle`

> 手动
> 
> 1. 下载&解压
> 2. 配置环境变量

最后gradle -v 测试下是否安装成功

##Projects 和 tasks
Gradle 里的任何东西都是基于这两个基础概念:

- projects ( 项目 )
- tasks ( 任务 )

> 每一个构建都是由一个或多个 projects 构成的. 一个 project 到底代表什么取决于你想用 Gradle 做什么. 举个例子, 一个 project 可以代表一个 JAR 或者一个网页应用. 它也可能代表一个发布的 ZIP 压缩包, 这个 ZIP 可能是由许多其他项目的 JARs 构成的. 但是一个 project 不一定非要代表被构建的某个东西. 它可以代表一件要做的事, 比如部署你的应用.
>
每一个 project 是由一个或多个 tasks 构成的. 一个 task 代表一些更加细化的构建. 可能是编译一些 classes, 创建一个 JAR, 生成 javadoc, 或者生成某个目录的压缩文件.
目前, 我们先来看看定义构建里的一些简单的 task. 以后的章节会讲解多项目构建以及如何通过 projects 和 tasks 工作.

###创建gradle构建
>
使用gradle命令运行Gradle构建。该gradle命令查找build.gradle当前目录中调用的文件。我们称这个build.gradle文件为构建脚本，但严格来说它是一个构建配置脚本。构建脚本定义项目及其任务。

####定义任务,一切从hello world开始

```
// gradle hello

task hello {
    doLast {
        println 'Hello world!'
    }
}

//使用字符串为任务名称定义任务
task('hello') {
    doLast {
        println "hello"
    }
}

//使用tasks容器定义任务
tasks.create('hello') {
    doLast {
        println "hello"
    }
}

// 使用DSL特定语法定义任务
task(hello) {
    doLast {
        println "hello"
    }
}

```

####任务依赖
请注意，在引用尚未定义的任务时，会报错。

```
task hello {
    doLast {
        println 'Hello world!'
    }
}
task intro {
	dependsOn hello
    doLast {
        println "I'm Gradle"
    }
}

task intro2(dependsOn: hello)  {
	doLast {
		println "I'm Gradle"
	}
}

// 闭包方法依赖
task taskx {
	doLast {
		println 'taskx'
	}
}

taskx.dependsOn {
	tasks.findAll {
		task -> task.name.startsWith('lib')
	}
}

task lib1 {
	doLast {
		println 'lib1'
	}
}
task lib2  {
	doLast {
		println 'lib2'
	}
}
```

####动态任务

Groovy强大功能不仅可用于定义任务的功能。例如，您还可以使用它来动态创建任务。

```
// gradle -q task1
4.times { counter ->
    task "task$counter" {
        doLast {
            println "I'm task number $counter"
        }
    }
}
```

####操纵现有任务
创建任务后，可以通过API访问它们。例如，您可以使用它在运行时动态地向任务添加依赖项。Ant不允许这样的事情。

```
task0.dependsOn task2, task3
```

还可以向现有任务添加行为。

doFirst和doLast可以执行多次。他们将操作添加到任务的操作列表的**开头或结尾**。执行任务时，将按顺序执行操作列表中的操作。

```
task hello {
    doLast {
        println 'Hello Earth'
    }
}
hello.doFirst {
    println 'Hello Venus'
}
hello.configure {
    doLast {
        println 'Hello Mars'
    }
}
hello.configure {
    doLast {
        println 'Hello Jupiter'
    }
}
```

####Groovy DSL快捷方式表示法

有一种方便的表示法来访问现有任务。每个任务都可以作为构建脚本的属性使用
例如将任务作为构建脚本的属性进行访问

```
task hello {
    doLast {
        println 'Hello world!'
    }
}
hello.doLast {
    println "Greetings from the $hello.name task."
}
```

####Extra task properties额外的任务属性
您可以将自己的属性添加到任务中。要添加名为的属性myProperty，请设置ext.myProperty为初始值。从那时起，可以像预定义的任务属性一样读取和设置属性。

```
task myTask {
    ext.myProperty = "myValue"
}

task printTaskProperties {
    doLast {
        println myTask.myProperty
    }
}
```

额外的属性不仅限于任务。还可以：

```
ext {
    springVersion = "3.1.0.RELEASE"
    emailNotification = "build@master.org"
}

task printProperties {
    doLast {
        println springVersion
        println emailNotification
    }
}
```

####默认任务
Gradle允许您定义在未指定其他任务时执行的一个或多个默认任务。

```
defaultTasks 'clean', 'run'

task clean {
    doLast {
        println 'Default Cleaning!'
    }
}

task run {
    doLast {
        println 'Default Running!'
    }
}

task other {
    doLast {
        println "I'm not a default task!"
    }
}
```
这相当于执行 gradle clean run。在多项目构建中，每个子项目都可以拥有自己的特定默认任务。如果子项目未指定默认任务，则使用父项目的默认任务

####标准项目属性
名称  | 类型|默认值
---           | ---          |-----
project  | project |该Project实例
name | String | 项目目录的名称
 path | String | 项目的绝对路径
 description  | String | 项目说明
 projectDir | File | 包含构建脚本的目录
 buildDir | File | projectDir/build
 group | Object | unspecified
 version  | Object | unspecified
   ant | AntBuilder | 一个AntBuilder实例

```
// gradle -q check

println name
println project.name
println path
println description
println projectDir
println buildDir
println group
println version
```

####声明变量
可以在构建脚本中声明两种变量：局部变量和额外属性。

- 局部变量

> 使用def关键字声明局部变量。它们仅在声明它们的范围内可见。局部变量是底层Groovy语言的一个特性。

```
def dest = "dest"

task copy(type: Copy) {
    from "source"
    into dest
}
```

- 额外属性

> ext

```
ext {
    springVersion = "3.1.0.RELEASE"
    emailNotification = "build@master.org"
}

task printProperties {
    doLast {
        println springVersion
        println emailNotification
    }
}

```

####[使用文件](https://docs.gradle.org/current/userguide/working_with_files.html#sec:copying_single_file_example)
增删改查复制移动zip

###构建生命周期
Gradle的构建生命周期分为初始化，配置，执行三个阶段。初始化阶段主要是读取settings.gradle 文件，用于确定哪些项目参与构建，并创建Project实例；而配置阶段主要是为每个build.gradle 文件配置project对象；执行阶段主要是根据gradle命令和传入的参数创建并执行任务。

Gradle构建过程有三个阶段。

- 初始化（Initialization）

Gradle可以构建一个和多个项目。在初始化阶段，Gradle会确定哪些项目参与构建，并且为这些项目创建一个Project实例。

- 配置（Configuration）

在这个阶段，会配置project对象。将执行构建的所有项目的构建脚本。也就是说，会执行每个项目的build.gradle文件。

- 执行（Execution）

Gradle确定要在执行期间创建和配置的任务子集。子集由传递给gradle命令和当前目录的任务名称参数确定。 Gradle然后执行每个选定的任务。


####Settings文件
除了build.gradle 文件外，Gradle定义了一个settings文件。settings文件由Gradle通过命名约定确定。该文件默认明为settings.gradle
settings.gradle是在初始化阶段执行。构建多个项目时，必须在根目录中有settings.gradle文件。因为在这个文件中定义了哪些项目参加构建。在构建Android项目时，我们会在根目录找到settings.gradle文件。除了定义包含的项目之外，您可能还需要将库添加到构建脚本类路径中。下面我们举一个简单的例子。
include ':project2'

```
settings.gradle
println 'This is executed during the initialization phase.'


build.gradle
println 'This is executed during the configuration phase.'

task configured {
    println 'This is also executed during the configuration phase.'
}

task test {
    doLast {
        println 'This is executed during the execution phase.'
    }
}

task testBoth {
    doFirst {
      println 'This is executed first during the execution phase.'
    }
    doLast {
      println 'This is executed last during the execution phase.'
    }
}

运行结果
$ gradle test testBoth
This is executed during the initialization phase.
This is executed during the configuration phase.
This is also executed during the configuration phase.
:test
This is executed during the execution phase.
:testBoth
This is executed first during the execution phase.
This is executed last during the execution phase.

```

###Java项目
####[java插件](https://www.w3cschool.cn/gradle/5vdr1hug.html)

```
plugins {
    id 'java'
}
```
这个插件中定义了许多任务,源集任务,生命周期任务，详情[参考表 23.1-23.4](https://www.w3cschool.cn/gradle/5vdr1hug.html)

####依赖项
指定Java项目的依赖项只需要三条信息：

- 您需要哪种依赖项，例如名称和版本

- 它需要什么，例如编译或运行

- 哪里寻找它

前两个在dependencies {}块中指定，第三个在repositories {}块中指定。例如：

```
repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.hibernate:hibernate-core:3.6.7.Final'
}

```

gradle不提供存储库，需要自己引入到repositories{}

- 存储库（例如：）mavenCentral()

- [配置](https://docs.gradle.org/current/userguide/java_plugin.html#sec:java_plugin_and_dependency_management)（例如implementation） - 一个命名的依赖项集合，为特定目标组合在一起，例如编译或运行模块 - 一种更灵活的Maven范围形式

- 模块坐标（例如org.hibernate:hibernate-core-3.6.7.Final） - 依赖项的ID，通常采用“ <group>：<module>：<version> ”形式（或Maven术语中的“ <groupId>：<artifactId>：<version> ”）


```
compileOnly - 只在编译的时候有效

implementation（取代compile） - 仅实现依赖性。

runtimeOnly（取代runtime） - 仅在运行时使用，不用于编译

testImplementation -在单元测试和打包测试apk的时候有效

```

####[其他插件介绍](https://www.w3cschool.cn/gradle/5vdr1hug.html)