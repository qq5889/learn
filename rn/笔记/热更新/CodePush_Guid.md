# 概念
## 更新模式
- `Silent mode`: 会在下载完毕后的下次重启生效
  - `IMMEDIATE`: 立即生效
  - `ON_NEXT_RESTART`: 下次启动生效
  - `ON_NEXT_RESUME`: 下次 `RESUME`或者`RESTART` 生效
- `Active mode`: 对用户做提示
- `Custom mode`: 自定义模式
## VSTS 持续集成

## 部署状态:
- `Active`: 当前版本的用户
- `Total`:  成功安装当前版本的用户计数
- `Pending`: 已经下载,但是还未安装的用户计数
- `Rollbacks`: 回滚次数
- `Rollout`: 指示允许安装的用户百分比
- `Disabled`: 是否无用

## 协作者权限
- 查看 `app`,协助者,部署,发布历史
- 发布更新
- 迁移更新
- 回滚
- 打补丁

## 合作流程:
- 注册/登录: `code-push register`
- 创建项目:  `code-push app add` -> 生成 `key`
- 添加成员:  `code-push collaborator add`
- 操作:
  - `release` : 通用发布
  - `release-react`: `react` 专用发布
  - `debug`: 调试
  - `patch`: 补丁
  - `promote`: 迁移
  - `rollback`: 回滚

# CLI
- **工具安装**
  - `Node.js`
  - `npm install -g code-push-cli`

## 账户管理
- **账户管理**
  - `code-push register`: 注册账户
  - `code-push link`: 连接账户
- **授权**
  - `code-push login`: 登录
  - `code-push logout`: 退出登录
  - `code-push whoami`: 当前账户信息查询
  - `code-push code-push session` : `session` 管理
- **Access Keys**: `code-push access-key`
  - `code-push access-key add`: 生成 key
  - `code-push login --accessKey <accessKey>` : 通过 `access-key` 登录
  - `code-push access-key patch`: 更新 `access-key` 信息
- **代理**
  - `--noProxy`
  - `--proxy`

## APP 管理
- **应用管理**
  - `code-push app add`: 在 `CodePush` 服务器注册一个 `app`
  - `code-push app rename`: 应用重命名
  - `code-push app rm`: 删除
  - `code-push app ls`
- **协作**
  - `code-push collaborator add`
  - `code-push collaborator rm`
  - `code-push collaborator ls`
  - `code-push app transfer`: 移交所有权
- **部署管理**
  - `code-push deployment add`
  - `code-push deployment rm`
  - `code-push deployment rename`
  - `code-push deployment ls`
  - `code-push deployment history <appName> <deploymentName> [--displayAuthor/-a]`: 发布历史
  - `code-push deployment clear <appName> <deploymentName>`: 清除历史
- **发布更新**
  - **General**: 发布通过三方工具生成的包
    - **指令**: `code-push release <appName> <updateContents> <targetBinaryVersion>`
    - **参数**:
      - `appName`: 工程名
      - `updateContents`: 需要更新文件
      - `targetBinaryVersion`: 二进制版本号
    - **可选参数**:
      - `--deploymentName`: 指定部署环境,默认`Staging`
      - `--description`: 描述信息,会被下发到客户端
      - `--disabled`: 是否不可用
      - `--mandatory`: 标记为必要更新包
      - `--noDuplicateReleaseError`: 如果更新与最新版本相同,提示警告,而不是错误,适用于持续集成提交小的修改
      - `--rollout`: 设置有权更新的用户百分比,适用于小规模测试
  - **React Native**: 直接生成包并发布
    - **指定**: `code-push release-react <appName> <platform>`
    - **参数**:
      - `appName`: 工程名
      - `platform`: 平台, `ios/android`
    - **可选参数**:
      - `--bundleName`: 生成的 `jsBundle` 名
      - `--deploymentName`: 指定部署环境,默认`Staging`
      - `--description`: 描述信息,会被下发到客户端
      - `--development`: 是否为开发包
      - `--disabled`: 是否不可用
      - `--entryFile`: 入口名
      - `--gradleFile`: `ANDROID` 的 `GRADLE`文件
      - `--mandatory`: 标记为必要更新包
      - `--noDuplicateReleaseError`: 如果更新与最新版本相同,提示警告,而不是错误
      - `--plistFile`: 指定 `plist` 相对路径
      - `--plistFilePrefix`: 指定 `plist` 文件的前缀
      - `--sourcemapOutput`: 生成 ` JS bundle` 的 `sourcemap` 相对路径
      - `--targetBinaryVersion`: 二进制版本号
      - `--rollout`: 设置有权更新的用户百分比
  - **Cordova**: 略
- **CodePush调试**: `code-push debug <platform>`
- **更新补丁**
  - **指令**: `code-push patch <appName> <deploymentName>`
  - **参数**:
    - `appName`
    - `deploymentName`
  - **可选参数**:
    - `label`: 指定部署中的那个版本号
    - `mandatory`
    - `description`
    - `rollout`
    - `disabled`
    - `targetBinaryVersion`
- **部署环境迁移**
  - **指令**: `code-push promote <appName> <sourceDeploymentName> <destDeploymentName>`
  - **参数**:
    - `appName`
    - `sourceDeploymentName`
    - `destDeploymentName`
  - **可选参数**:
    - `description`
    - `disabled`
    - `mandatory`
    - `noDuplicateReleaseError`
    - `rollout`
    - `targetBinaryVersion`
- **回滚**: `code-push rollback <appName> <deploymentName> [--targetRelease]`



# 示例代码
- 更新:
```
codePush.sync();
```

- 更新模式:
```
codePush.sync({installMode: InstallMode.IMMEDIATE});
```

- xx
```
codePush.sync({ installMode: InstallMode.ON_NEXT_RESUME, minimumBackgroundDuration: 60 * 10 });
```
