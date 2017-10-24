## npm上发布module简单步骤
**NPM的全称是Node Package Manager，是一个NodeJS包管理和分发工具，已经成为了非官方的发布Node模块（包）的标准**
### 一.注册npm网站账号
`https://www.npmjs.com`去注册一个账号备用。
### 二.创建本地js库文件
在本地写好自己的模块代码，npm上的都是模块化
### 三.添加用户
```
$ npm adduser --registry http://registry.npmjs.org
```
### 四.发布你的模块
CD到你的模块目录下，执行：

```
$ npm init
```
会生成`package.json`文件,也就是模块的相关信息
  
```json
{
  "name": "模块名称",
  "version": "1.0.0",
  "description": "描述",
  "main": "index.js",//入口
  "scripts": {
    "test": "echo /"Error: no test specified/" && exit 1"//测试脚本
  },
  "keywords": [	//关键字
    "react-native",
    "banner",
  ],
  "author": "Cain",//作者
  "license": "MIT" //开源协议
}
```
完成之后，就正式发布到npm上去了，执行：  
```
$ npm publish --registry http://registry.npmjs.org
```
命令执行完成后，打开npm链接：https://www.npmjs.com/ + 插件名， 就可以看到已经成功发布了，当然你开源道自己的账户里面去看，或者搜索了

### 五.错误
```
you do not have permission to publish "XXXXXX". Are you logged in as the correct user?
```
如果报以上错误，那就是模块名称已经被占用了，换一个名称重新发布就好了！

##
unserName: bigwit
email: bigwit@126.com
pwd: bigwit1234