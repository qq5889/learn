#Electron

##关于 Electron

Electron是由Github开发，用HTML，CSS和JavaScript来构建跨平台桌面应用程序的一个开源库。 Electron通过将Chromium和Node.js合并到同一个运行时环境中，并将其打包为Mac，Windows和Linux系统下的应用来实现这一目的。

##支持平台

- macOS

Only 64bit binaries are provided for macOS, and the minimum macOS version supported is macOS 10.10 (Yosemite).

- Windows

仅支持 Windows 7 或更高版本, 旧版操作系统已不再支持(并且无法运行).

为Windows系统提供ia32 (x86) 和 x64 (amd64) 两种二进制版本。 如果在ARM版Windows上使用Electron的话调用ia32库就行了。

- Linux

只有 Ubuntu 12.04 是可以保证能正常运行的，并且以下平台也被证实可以正常运行 Electron 的预编译版本：

Ubuntu 12.04 或更高版本
Fedora 21
Debian 8

##Electron 应用结构

主要分为主进程和渲染器进程

- 主进程

> Electron 运行 package.json 的 main 脚本的进程被称为主进程。 在主进程中运行的脚本通过创建web页面来展示用户界面。 一个 Electron 应用总是有且只有一个主进程。

- 渲染器进程

> 由于 Electron 使用了 Chromium 来展示 web 页面，所以 Chromium 的多进程架构也被使用到。 每个 Electron 中的 web 页面运行在它自己的渲染进程中。

在普通的浏览器中，web页面通常在一个沙盒环境中运行，不被允许去接触原生的资源。 然而 Electron 的用户在 Node.js 的 API 支持下可以在页面中和操作系统进行一些底层交互。

- 区别

主进程使用 BrowserWindow 实例创建页面。 每个 BrowserWindow 实例都在自己的渲染进程里运行页面。 当一个 BrowserWindow 实例被销毁后，相应的渲染进程也会被终止。

主进程管理所有的web页面和它们对应的渲染进程。 每个渲染进程都是独立的，它只关心它所运行的 web 页面。

在页面中调用与 GUI 相关的原生 API 是不被允许的，因为在 web 页面里操作原生的 GUI 资源是非常危险的，而且容易造成资源泄露。 如果你想在 web 页面里使用 GUI 操作，其对应的渲染进程必须与主进程进行通讯，请求主进程进行相关的 GUI 操作。（ipcMain,ipcRenderer）


##[代码签名(略)](https://electronjs.org/docs/tutorial/code-signing)

代码签名是一种用来证明应用是由你创建的一种安全技术。

##开发环境

1. node.js
2. npm
3. 编译器（vscode）
4. 没有了


##模板


入门级[electron-quick-start](https://github.com/electron/electron-quick-start)

入门级2[electron-forge](https://electronforge.io/templates)是一个用来构建现代化Electron应用的完善的工具。 Electron Forge将多个现有的（ 且有稳定维护的 ）Electron构建工具整合为一个简单易用的工具包，所有人都可以用它来快速地搭建Electron开发环境。

for react 完善级[electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate)


##键盘快捷键

- [快捷键说明](https://electronjs.org/docs/api/accelerator)

- 本地快捷键（菜单栏里）

> 您可以使用 [Menu] 模块来配置快捷键，只有在 app 处于焦点状态时才可以触发快捷键。 为此，在创建 MenuItem时必须指定一个 [accelerator] 属性。

```
const { Menu, MenuItem } = require('electron')
const menu = new Menu()

menu.append(new MenuItem({
  label: 'Print',
  accelerator: 'CmdOrCtrl+P',
  click: () => { console.log('time to print stuff') }
}))
你还可以在操作系统中配置不同的组合键。
accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I'
```

- 全局快捷键

> 当应用程序不处于焦点状态时，你可以使用 globalShortcut 模块来检测键盘事件

```
const { app, globalShortcut } = require('electron')

app.on('ready', () => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })
  
  // 检查快捷键是否注册成功
	console.log(globalShortcut.isRegistered('CommandOrControl+X'))
})

app.on('will-quit', () => {
  // 注销快捷键
  globalShortcut.unregister('CommandOrControl+X')

  // 注销所有快捷键
  globalShortcut.unregisterAll()
})
```

- 在浏览器窗口内的快捷方式（渲染进程）

有一个比较好的第三方
[mousetrap](https://github.com/ccampbell/mousetrap)

## 任务栏的进度条

一般来说，将参数设置为 0 以下的值（例如 -1）将会去掉进度条，而设置为 1 以上（例如 2）将会切换这个进度条为100%进度。

win.setProgressBar(0.5)

## 通知

```
渲染进程
const notificationButton = document.getElementById('basic-noti')

notificationButton.addEventListener('click', () => {
  const myNotification = new window.Notification('标题', {
    body: '通知正文内容'
  })

  myNotification.onclick = () => {
    console.log('通知被点击')
  }
})
```


##生命周期（app）

[app](https://electronjs.org/docs/api/app)

控制你的应用程序的事件生命周期。

##BrowserWindow

创建和控制浏览器窗口

[属性](https://electronjs.org/docs/api/browser-window#class-browserwindow)

##打开子窗口

在渲染进程

- [使用window.open方法](https://electronjs.org/docs/api/browser-window-proxy#%E7%B1%BB-browserwindowproxy)

- 使用BrowserWindow

```
// 从渲染进程中使用 `remote`.
// const { BrowserWindow } = require('electron').remote

```

##对话框
对话框用于主线程，可以通过`const { dialog } = require('electron').remote`在渲染进程中使用；或者使用ipcMain和ipcRenderer交互

- [方法以及属性](https://electronjs.org/docs/api/dialog)


##网络（原生）
net 模块是一个发送 HTTP(S) 请求的客户端API。 它类似于Node.js的HTTP 和 HTTPS 模块 ，但它使用的是Chromium原生网络库来替代Node.js的实现，提供更好的网络代理支持。
net 模块 api 被专门设计为尽可能地模仿的Node. js api。 API 组件 (包括classes、methods、properties和event names) 与Nodejs中常用的类似。

```
function requestMenu () {
  const request = net.request({
    url: 'https://www.seasame.com.cn/sesame2/v1/user/login?account=123&pwd=123',
    method: 'post'
  })
  request.on('response', (response) => {
    response.setEncoding('utf8')
    response.on('data', (chunk) => {
      let data = JSON.parse(chunk)
      console.log(`BODY: ${chunk}`)
      console.log(`COde: ${data.code}`)
      let template2 = [{
        label: data.code + '',
        submenu: [{
          label: data.message,
          click: () => {
            mainWindow.loadURL('https://www.seasame.com.cn')
          }
        },
        {
          label: 'localhost:3000',
          click: () => {
            mainWindow.loadURL('http://localhost:3000/')
          }
        },
        { type: 'separator' },
        {
          label: '退出',
          role: 'quit'
        }]
      }]
      setMenu(template2)
    })

    response.on('end', () => {
      console.log('No more data in response.')
    })
  })
  request.end()
}
```

##交互

###ipcMain

从主进程到渲染进程的异步通信。
它处理从渲染器进程（网页）发送出来的异步和同步信息。 从渲染器进程发送的消息将被发送到该模块。

- 发送消息时，事件名称为channel。
- 回复同步信息时，需要设置event.returnValue。
- 将异步消息发送回发件人，需要使用event.sender.send(...)。

```
// 在主进程中.
const { ipcMain } = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.sender.send('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})
```

```
//在渲染器进程 (网页) 中。
const { ipcRenderer } = require('electron')
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})
ipcRenderer.send('asynchronous-message', 'ping')
```

[方法以及属性](https://electronjs.org/docs/api/ipc-main#%E6%96%B9%E6%B3%95)

###ipcRenderer

从渲染器进程到主进程的异步通信。

你可以使用它提供的一些方法从渲染进程 (web 页面) 发送同步或异步的消息到主进程。 也可以接收主进程回复的消息。

[方法以及属性](https://electronjs.org/docs/api/ipc-renderer#%E6%96%B9%E6%B3%95)

##[screen](https://electronjs.org/docs/api/screen)
检索有关屏幕大小、显示器、光标位置等的信息。

在 app 模块发出 ready 事件之前, 您不能引用或者使用此模块。

在渲染进程中传值取决于remote模块，因此在这个模块禁用时无法使用



##其他功能
- [官网](https://electronjs.org/docs)
- [demo](https://github.com/demopark/electron-api-demos-Zh_CN)
- [手动创建react+electron](https://www.imooc.com/article/39978?block_id=tuijian_wz)
- [剪切板](https://electronjs.org/docs/api/clipboard)
- [无边框窗口](https://electronjs.org/docs/api/frameless-window)
- [Mac App Store中的应用内购买介绍](https://electronjs.org/docs/tutorial/in-app-purchases)
- [Mac App Store中的应用内购买code](https://electronjs.org/docs/api/in-app-purchase)
- [本地化](https://electronjs.org/docs/api/locales)
- [菜单](https://electronjs.org/docs/api/menu) 、[菜单项](https://electronjs.org/docs/api/menu-item)
- [原生文件拖放](https://electronjs.org/docs/tutorial/native-file-drag-drop)
- [电源监视器](https://electronjs.org/docs/api/power-monitor)
- [省电拦截器](https://electronjs.org/docs/api/power-save-blocker)
- [进程](https://electronjs.org/docs/api/process#processtype)
- [session](https://electronjs.org/docs/api/session)
- [shell:使用默认应用程序管理文件和 url](https://electronjs.org/docs/api/shell)
- [获取系统相关信息](http://www.runoob.com/nodejs/nodejs-os-module.html)
- [代码签名](https://electronjs.org/docs/tutorial/code-signing)
- [electron-builder官网](https://www.electron.build/)
- [electron-builder实现 署名／打包／发布以及自动更新](https://segmentfault.com/a/1190000012839354#articleHeader10)
- [应用更新](https://electronjs.org/docs/tutorial/updates)

