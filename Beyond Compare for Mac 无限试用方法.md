# Beyond Compare for Mac 无限试用方法

- 原理：
> 删除注册文件即可永久保持30天免费


- 在[官网](https://www.scootersoftware.com/download.php)下载最新的 Beyond Compare

- 把 Beyond Compare 复制到应用程序中.

- 显示隐藏文件

```
MAC中显示隐藏文件有很多种方法，最简单的是通过在Mac终端输入命令。 
显示隐藏文件（注意空格和大小写）： 
defaults write com.apple.finder AppleShowAllFiles -bool true 
或 
defaults write com.apple.finder AppleShowAllFiles YES
```

- 重启finder

- 确认注册文件位置，一般在

```
电脑磁盘->用户->用户名->资源库（隐藏文件夹）->Application Support->Beyond Compare->registry.dat

或者

电脑磁盘->资源库->Application Support->Beyond Compare->registry.dat

```

- 选中图标，右键点击“显示包内容”，逐步进入 Beyond Compare 应用程序的 MacOS 目录下(/Applications/Beyond Compare.app/Contents/MacOS)

- 将主启动程序 BCompare 重命名为 BCompare.real

- 在同级目录下新建一个脚本文件,命名为 BCompare,这样 BCompare 在启动的时候就会执行该脚本文件

```
#!/bin/bash
# 修改删除路径为你确认的路径
rm "/Users/admin/Library/Application Support/Beyond Compare/registry.dat"
"`dirname "$0"`"/BCompare.real $@
```


- 创建脚本文件的方法：

> 1. 使用 Mac 自带的文本编辑器，将脚本内容录入保存为 rtf
然后选中文件，`Command + i` 会显示简介，去掉 .rtf 扩张名或者先改成 .sh
2. 然后双击打开文件编辑，将 rtf 格式的相关内容去掉,只保留上文提到的脚本代码，保存，如果有 .sh 扩展名就去掉
3. 最后在终端使用 cd 命令进入 MacOS 目录，执行 chmod a+x BCompare。
`cd /Applications/Beyond Compare.app/Contents/MacOS/`
`chmod a+x BCompare`
4. 完成后关闭就好了，然后你就可以无限试用了！