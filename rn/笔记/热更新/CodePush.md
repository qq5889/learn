# 基本流程
- 安装客户端: `npm install -g code-push-cli`
- 注册: `code-push register`
  - key: `O6vxb5INUBLSnmYcdllpMlv8rGa7NJvTHsWNM`
- 添加项目: `code-push app add <MyAppName>`
- 安装插件: `npm install --save react-native-code-push`
- 引入库:
  - `react-native-code-push`文件下的 `CodePush.xcodeproj` 加入项目
  - `Libraries/CodePush.xcodeproj/Products`的 `.a`文件加入 `Link Binary With Libraries`
  - `Build Settings -> Header Search Paths` 加入 `$(SRCROOT)/../node_modules/react-native-code-push`
- 检出`Staging`值: `code-push deployment ls <AppName> --displayKeys`
- 配置代码
  - 本地代码部分
  ```
  #import "CodePush.h"
  //jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  jsCodeLocation = [CodePush bundleURL];
  NSURL *jsCodeLocation;

  //或者
  #ifdef DEBUG
      jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];
  #else
      jsCodeLocation = [CodePush bundleURL];
  #endif
  ```
  - 配置 `info.plist`
    - `CodePushDeploymentKey` = `<Staging>`
    - `Bundle versions string` 的 `short` = `1.0.0`
  - js 文件配置:
  ```
  import codePush from "react-native-code-push";
  componentDidMount(){
    codePush.sync();
  }
  ```
- 发布 js 更新
  - 将 js 文件打包 `react-native bundle --platform ios --entry-file index.ios.js --bundle-output codepush.js --dev false`
  - 将二进制文件推送到 `staging`
  ```
  code-push release <appName> <updateContents> <targetBinaryVersion> [--deploymentName <deploymentName>] [--description <description>] [--mandatory]

  code-push release <ProjectName>  codepush.js 1.0.0

  //or
  code-push release-react MyApp ios
  ```
- 发布 js 与 image
  - 打包: `react-native bundle --platform ios --entry-file index.ios.js --bundle-output ./main.jsbundle --assets-dest ./`
  - 推送环境: `code-push release <ProjectName>  codepush.js 1.0.0`


# 其他
- 登出: `code-push logout`



# Demo 相关
┌────────────┬───────────────────────────────────────┐
│ Name       │ Deployment Key                        │
├────────────┼───────────────────────────────────────┤
│ Production │ yrnORgrUiD0BnaAF8Rj-HIaSwhJGNJvTHsWNM │
├────────────┼───────────────────────────────────────┤
│ Staging    │ z9tc-G7UuFBYvJAuSlZEIeMAQUlGNJvTHsWNM │
└────────────┴───────────────────────────────────────┘
