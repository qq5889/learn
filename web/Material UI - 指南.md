### Material UI - 指南



# 摘要

JSS 即 CSS-in-JS 为什么要采用 JSS 技术？最重要的一点是 结合 js 后， css 便拓展了动态特性。 因此也带来的无限的可能性。

文档的目录结构如下：

- Material-UI 的样式方案中， 我会告诉你常用的样式方案
- 主题中告诉你如何使用主题



# MUI 样式系统

Material-UI 的样式方案来自于许多其他 CSS-in-JS 库的启发，例如 [styled-components](https://www.styled-components.com/) 和 [emotion](https://emotion.sh/)。 有三种形式使用样式：

- styled-components： 这种写法使用起来更离散，颗粒度更细， 可以便捷的生成一个携带样式的组件
- Hook： 聚合性更高， 应当优先使用
- 高阶组件： 优缺点同 Hook， 只是写法不一样。既然都 HOC 了， 这些样式更加灵活。

> Material-UI 可以通过 @material-ui/styles 和 @material-ui/core/styles 两种形式引入样式。 [区别是](https://material-ui.com/zh/styles/basics/#material-ui-core-styles-vs-material-ui-styles) @material-ui/styles 是一个独立版本， 他并不携带 mui 中的默认主题， @material-ui/core/styles 是一个结合 mui 的版本， 被重新导出的， 增强版 @material-ui/styles。



## Styled-components

下面是一个例子，这例子展示了一些你们想要的功能(这些功能适用于后面的两套样式方案)， 这包括：

1. 嵌套选择器的写法。 改写法支持伪类选择器等你可以想到的常规写法...
2. 

```

import React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  // 1. 嵌套选择器
  '& p': { 
      color: 'green',
      '& span': {
        color: 'blue'
      }
  },
  height: 48,
  padding: '0 30px',
});

export default function StyledComponents() {
  return <MyButton>Styled Components</MyButton>;
}

```



### 对主题和参数的支持

样式方案都能很好的支持主题和参数， 例子：

```
import React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// 解构，避免样式需要的属性传入组件
const MyButton = styled(({ color, ...other }) => <Button {...other} />)( ({theme, props}) =>({
    backgroundColor: props.backgroundColor,
    color: theme.palette.common.black,
}))

export default function AdaptingStyledComponents() {
  // 1. 传参， 注意 color 属性
  return (
    <React.Fragment>
      <MyButton color="red">Red</MyButton>
    </React.Fragment>
  );
}


```



## Hook - makeStyle/useStyle

一个简单的例子：

```
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
  },
})

export default function Hook() {
  const classes = useStyles();
  return <Button className={classes.root}>Hook</Button>;
}


```



### 对主题和参数的支持

```
// 接受主题对象
const useStyles = makeStyles( theme => ({
  // 1.2.1 接受属性
  foo: props => ({
    backgroundColor: props.backgroundColor,
    // 使用主题属性
    color: theme.palette.common.black,
  }),
  bar: {
    // 1.2.2 接受属性
    color: props => props.color,
  },
}));

function MyComponent() {
  const props = { backgroundColor: 'black', color: 'white' };
  // 1.1 props 作为 useStyles() 的第一个属性传入
  const classes = useStyles(props);

  return <div className={`${classes.foo} ${classes.bar}`} />
}


```



## 高阶组件

我只会用代码说话。 注意 1，2，3 的逻辑。

```
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

//1. 一个普通的样式对象
const styles = {
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
  },
};

function HigherOrderComponent(props) {
  // 3. 读取 classes 属性
  const { classes } = props;
  return <Button className={classes.root}>Higher-order component</Button>;
}

HigherOrderComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

// 2. 通过高阶组件函数注入样式
export default withStyles(styles)(HigherOrderComponent);


```



### 对主题和参数的支持

```
const useStyles = makeStyles(theme => ({
  root: props => ({
    backgroundColor: props.backgroundColor,
    color: theme.color,
  }),
}));


```





# 其他样式系统

我称之为样式系统， 因为 mui 的样式方案是基于这些系统构建的（理念上）。并且， 他们确实是存在的系统。 在一番实践后， 我并不推荐直接使用这里的样式方案，mui 样式系统的 styled-components 已经支持样式组件， 区别仅在于书写体验。 这些系统包括：

- [styled-components](https://styled-components.com/) 
- [emotion](https://emotion.sh/docs/introduction)

感兴趣的可以自信查看官网。

# 主题

在 MUI 样式方案 中已经使用到了主题。在 mui 系统中， 提供了一套[默认样式](https://material-ui.com/zh/customization/default-theme/) ， 并且， mui 支持自定义主题。 主题的特性包括：

1. 支持嵌套
2. 通过多种形式访问。 我们不仅可以在样式系统中访问（mui 样式系统中已经说明），以及其他的访问形式

### 提供自定义主题

```
import { ThemeProvider } from '@material-ui/core/styles';
import DeepChild from './my_components/DeepChild';

const theme = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
};

function Theming() {
  return (
    <ThemeProvider theme={theme}>
      <DeepChild />
    </ThemeProvider>
  );
}


```



### 主题对象访问

```
import { useTheme, withTheme} from '@material-ui/core/styles';

// HOOK
function DeepChild() {
  const theme = useTheme();
  return <span>{`spacing ${theme.spacing}`}</span>;
}

// HOC
function DeepChildRaw(props) {
  return <span>{`spacing ${props.theme.spacing}`}</span>;
}
const DeepChild2 = withTheme(DeepChildRaw);

```





# StylesProvider

StylesProvider 提供了一些特性， 例如：

- 提供 JSS 扩展插件的机制
- 控制注入顺序（也就是优先级）

## JSS 插件

Mui 样式系统通过 `StylesProvider` 支持[插件系统](https://material-ui.com/zh/styles/advanced/#jss-plugins)， 默认的插件集包含的能力：

- [jss-plugin-rule-value-function](https://cssinjs.org/jss-plugin-rule-value-function/) ：支持函数样式
- [jss-plugin-global](https://cssinjs.org/jss-plugin-global/)：`@global` 样式
- [jss-plugin-nested](https://cssinjs.org/jss-plugin-nested/)：嵌套选择器
- [jss-plugin-camel-case](https://cssinjs.org/jss-plugin-camel-case/)：驼峰语法
- [jss-plugin-default-unit](https://cssinjs.org/jss-plugin-default-unit/)：缺省数值单位
- [jss-plugin-vendor-prefixer](https://cssinjs.org/jss-plugin-vendor-prefixer/)：prefix
- [jss-plugin-props-sort](https://cssinjs.org/jss-plugin-props-sort/)：自动调整顺序

除此， 我们还能找一些有趣的插件，例如：

- [jss-plugin-template](https://cssinjs.org/jss-plugin-template/)： 支持 css 语法（注意：此插件不支持选择器或嵌套规则）
- 有兴趣的同学再研究一下？

一个扩展插件的例子：

```
import React from 'react';
import { jssPreset, StylesProvider, makeStyles } from '@material-ui/core/styles';
import { create } from 'jss';
import jssTemplate from 'jss-plugin-template';

// 1. 创建插件
const jss = create({
  plugins: [jssTemplate(), ...jssPreset().plugins],
});

const useStyles = makeStyles({
  // 3. 使用 css 特性
  root: `
    background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
    border-radius: 3px;
    font-size: 16px;
    border: 0;
    color: white;
    height: 48px;
    padding: 0 30px;
    box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
  `,
});

function Child() {
  const classes = useStyles();
  return (
    <button type="button" className={classes.root}>
      String templates
    </button>
  );
}

function StringTemplates() {
  // 2. StylesProvider 注入插件
  return (
    <StylesProvider jss={jss}>
      <Child />
    </StylesProvider>
  );
}

export default StringTemplates;


```



## 注入顺序

控制 CSS 的注入顺序有这么几个方法：

- 通过 `injectFirst` 直接注入到页头，这是一种低优先级的注入方式

- 通过 `insertionPoint` 插入到指定位置

- - 插入到指定注释的位置。（这个方法的问题是某些生产环境可能移除注释）
  - 插入到指定节点的未知
  - [codesandbox.io](http://codesandbox.io) 阻止访问 <head> 元素。 要解决这个问题，您可以使用 JavaScript 中的 document.createComment() API。

## 其他

- 服务端渲染需要做一些[额外处理](https://material-ui.com/zh/styles/advanced/#server-side-rendering)，mui 可以支持 Gatsby 和 next。js
- 全局类名是默认提供的
- css 前缀也是默认提供的
- 安全方面，如何[支持 CSP](https://material-ui.com/zh/styles/advanced/#how-does-one-implement-csp)
- 主题相关的[API](https://material-ui.com/zh/styles/api/)

# 更多操作

TBD

我暂时不知道这里的标题应该是怎么取名。 内容是与 styled-components 的属性相关的。 属性相关的 API [看这里](https://material-ui.com/zh/system/api/)。

# 参考:

## 工具

- [调色板工具](https://material.io/resources/color/#!/?view.left=0&view.right=0)
- [create-mui-theme](https://react-theming.github.io/create-mui-theme/)：使用 Material Design 颜色工具来创建 Material-UI 主题的在线工具。
- [material-ui-theme-editor](https://in-your-saas.github.io/material-ui-theme-editor/)：只需要选择颜色即可为你的 Material-UI 应用生成主题的工具，同时还支持在线预览。
- [Material palette generator](https://material.io/inline-tools/color/)：它可用于通过您输入的任何颜色生成一系列的调色板。

## API 文档:

- [主题相关 API](https://material-ui.com/zh/customization/theming/#api)

- [断点相关API](https://material-ui.com/zh/customization/breakpoints/#api)
- [默认主题](https://material-ui.com/zh/customization/default-theme/)