# iOS 集成
## 环境配置
- [参考](http://microsoft.github.io/code-push/docs/react-native.html)
- `RNPM`: `rnpm link react-native-code-push`
- `CocoaPods`:
  - `pod 'CodePush', :path => './node_modules/react-native-code-push'`
  - `pod 'CodePush', :path => './node_modules/react-native-code-push', :subspecs => ['Core']`
- 手动集成: 略

## API
- `(NSURL *)bundleURL`: 返回最近使用的 `JS bundle URL`
- `(NSURL *)bundleURLForResource:(NSString *)resourceName`
- `(NSURL *)bundleURLForResource:(NSString *)resourceName withExtension:(NSString *)resourceExtension`
- `(void)overrideAppVersion:(NSString *)appVersionOverride`
- `(void)setDeploymentKey:(NSString *)deploymentKey`

# Android 集成 略

# JS API
- 头文件: `react-native-code-push`
- 方法
  - `allowRestart`: 允许程序自动重启,仅当`disallowRestart`方法显示调用时需要
  - `checkForUpdate:`: 询问`CodePush`服务器是否有新的更新
  - `disallowRestart`: 禁用自动重启
  - `getCurrentPackage:`: deprecated
  - `getUpdateMetadata:`: 获取安装过的更新`metadata`
  - `notifyAppReady`: 通知 `CodePush` 运行时一个有效的更新已经就绪.如果手动配置跟新,必须调用这个方法.
  - `restartApp`: 立即重启应用

## sync : 允许检查更新,下载,安装的一键式配置
`codePush.sync(options: Object, syncStatusChangeCallback: function(syncStatus: Number), downloadProgressCallback: function(progress: DownloadProgress)): Promise<Number>;`
- `options`: 控制行为的对象
  - `checkFrequency : codePush.CheckFrequency`: 检测更新的频率
  - `deploymentKey : String` : 部署的 `key` 值,可以从 `Info.plist` 推导
  - `installMode : codePush.InstallMode`: 安装时机
  - `mandatoryInstallMode : codePush.InstallMode` : 标记为 `mandatory` 更新的安装时机
  - `minimumBackgroundDuration : Number`: 指定最小的后台时间
- `syncStatusChangedCallback`: 状态回调方法
- `downloadProgressCallback`: 下载进度的回调


## 对象描述
- `codePush.CheckFrequency`: 频率
  - `ON_APP_START` : 程序启动时,默认值
  - `ON_APP_RESUME`: 回复前台时
  - `MANUAL`: 手动触发
- `codePush.InstallMode`: 指定安装时机
  - `IMMEDIATE`: 立即
  - `ON_NEXT_RESTART`: 下次启动
  - `ON_NEXT_RESUME `: 从后台恢复
- `UpdateDialogOptions`
- `codePush.SyncStatus`
  - `CHECKING_FOR_UPDATE`:
  - `AWAITING_USER_ACTION`
  - `DOWNLOADING_PACKAGE`
  - `INSTALLING_UPDATE `
  - `UP_TO_DATE`
  - `UPDATE_IGNORED`
  - `UPDATE_INSTALLED`
  - `SYNC_IN_PROGRESS`
  - `UNKNOWN_ERROR`
- `codePush.UpdateState`
  - `RUNNING`
  - `PENDING`
  - `LATEST`
- `updateDialog: UpdateDialogOptions` : 自定义提示框
  - `appendReleaseDescription : Boolean` : 配置是否显示 `description` 信息,默认为 `false`
  - `descriptionPrefix : String` : `description` 信息的前缀,默认`Description:`
  - `mandatoryContinueButtonLabel : String` : `mandatory` 更新必须点击的按钮文本,默认为 `"Continue".`
  - `mandatoryUpdateMessage : String` : `mandatory` 模式的提示文本 默认 `"An update is available that must be installed.`
  - `optionalIgnoreButtonLabel: String`: 可以忽略的提示的取消按钮文本 默认 `Ignore`
  - `optionalInstallButtonLabel` : 可以忽略的更新的按钮的确认按钮,默认 `Install`
  - `optionalUpdateMessage` : 可以忽略的更新的信息 `"An update is available. Would you like to install it?"`
  - `title`: 更新提示标题 默认值: `Update available`



# END
