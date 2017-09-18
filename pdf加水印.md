## pdftk

[服务地址](https://www.pdflabs.com/tools/pdftk-server/)

[中文blog](http://www.cnblogs.com/basterdaidai/p/6204518.html)

pdftk --help

# mac

1. [下载pdftk](https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/pdftk_server-2.02-mac_osx-10.11-setup.pkg
)
2. 制作stamp.pdf模板，即带水印的pdf
3. 执行以下命令做合并pdf操作，注：目标文件和输出文件不能同名

```
pdftk 目标.pdf multistamp stamp.pdf output 输出.pdf
```

## linux

- 安装依赖包

```
yum install gcc gcc-c++ libXrandr gtk2 libXtst libart_lgpl
```

- [安装libgcj](http://rpmfind.net/linux/rpm2html/search.php?query=libgcj&submit=Search+...&system=&arch=)

```
wget rpmfind.net/linux/centos/6.9/os/x86_64/Packages/libgcj-4.4.7-18.el6.x86_64.rpm

rpm -ivh --nodeps libgcj-4.4.7-18.el6.x86_64.rpm
```

- [安装PDFtk](https://www.pdflabs.com/docs/install-pdftk-on-redhat-or-centos/)

```
wget https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/pdftk-2.02-1.el6.x86_64.rpm

yum install pdftk-2.02-1.el6.x86_64.rpm
```
- 增加水印
```
pdftk 目标.pdf multistamp stamp.pdf output 输出.pdf
```