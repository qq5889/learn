# ESLint

## 什么是ESLint？

  - ESLint 是在 ECMAScript/JavaScript 代码中识别和报告模式匹配的工具，它的目标是保证代码的一致性和避免错误。在许多方面，它和 JSLint、JSHint 相似，除了少数的例外：

    - ESLint 使用 Espree 解析 JavaScript。
    - ESLint 使用 AST 去分析代码中的模式
    - ESLint 是完全插件化的。每一个规则都是一个插件并且你可以在运行时添加更多的规则。

  - 官网：   
  http://eslint.org   
  http://eslint.cn

## 安装

  - 有两种方式，全局安装和本地安装。我是全局安装的：   
  `npm install -g eslint`
  接下来提示什么就安装什么，具体可以去官网了解。

## 配置

  - 安装完成之后，运行`eslint --init`,逐步回答问题，会生成一个配置文件 `.eslintrc`

  - Specifying Environments   
  ```
  "env": {
    "es6": true,
    "browser": true,
    "node": true,
    "commonjs": true,
    "amd": true
  }
  ```
  - Specifying Parser   
  ```
  "parser": "babel-eslint"
  ```
  https://www.npmjs.com/package/babel-eslint

  - Extending Configuration Files
  ```
  "extends": "airbnb"
  ```

  airbnb 安装：   
  https://www.npmjs.com/package/eslint-config-airbnb

  airbnb github地址：   
  https://github.com/airbnb/javascript

  airbnb 中文翻译地址：   
  https://github.com/yuche/javascript

  - plugin
  ```
  "plugins": [
    "react"
  ],
  ```

  - Ignoring Files and Directories

    - 你可以通过在项目根目录创建一个 .eslintignore 文件告诉 ESLint 去忽略特定的文件和目录。.eslintignore 文件是一个纯文本文件，其中的每一行都是一个 glob 模式表明哪些路径应该忽略检测。例如，以下将忽略所有的 JavaScript 文件：**/*.js

    - 我们项目中 ignore dist/

## rules

 "off" 或 0 - 关闭规则   
 "warn" 或 1 - 开启规则，使用警告级别的错误：warn ,    
 "error" 或 2 - 开启规则，使用错误级别的错误：error
