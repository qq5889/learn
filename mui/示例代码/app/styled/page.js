'use client'

import styled from '@mui/material/styles/styled'

/**
 * 基本用法 - 支持原生标签
 */
const Root = styled('div')({})

/**
 * 1. 从主题取值约定的名字
 * 2. 插槽，自定义组件中详解
 * 3. 如果返回值为 true， 则该属性会透传， 用户忽略仅作用于当前组件的属性
 * 4. 从主题中取出的样式， name 已在第一步指定
 * 5. 禁用 variants 属性
 * 6. 当前组件禁用 sx 属性
 * 7. 组件属性控制样式的用法
 * 8. ownerState 默认忽略透传， 不能使用 shouldForwardProp
 * 9. 使用主题变体
 */
const Foo = styled('div', {
  name: 'GuiFoo', // 1
  slot: 'Root', // 2
  shouldForwardProp: prop => !['color', 'size', 'ownerState'].includes(prop), // 3
  overridesResolver: (props, styles) => [styles.root], // 4
  // skipVariantsResolver: true, // 5
  // skipSx: true, //6
})(({ color, ownerState }) => ({
  //7
  color,
  ...(ownerState.isError
    ? {
        color: 'red',
      }
    : {}),
}))

export default function JSSSimpleDemo() {
  // 8
  const ownerState = {
    isError: true,
  }

  return (
    <Root>
      {/*<Foo color={'red'}>*/}
      {/* 9. 使用 medium 变体*/}
      {/*<Foo color={'red'} size={'medium'}>*/}
      <Foo ownerState={ownerState} color={'red'} size={'large'}>
        Foo
      </Foo>
    </Root>
  )
}
