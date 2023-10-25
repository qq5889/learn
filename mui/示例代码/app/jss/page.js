'use client'

import { styled, Button as MuiButton, Box } from '@mui/material'

/**
 * 1. 基本用法 - 支持原生标签
 * 2. css 选择器示例
 * 3. 基本用法 - 自定义组件
 * 4. 自定义组件以及 sx 示例
 * 5. 组件注入
 */

/**
 * 1
 *
 */
const Root = styled('div')({
  display: 'flex',
  background: '#777',
  // width: 500,
  flexDirection: 'column',
  alignItems: 'center',
  border: '1px solid grey',
})

/**
 * 2
 */
const JSSSelect = styled('div')({
  '.test': {
    color: 'red',
    fontSize: '70px',
    ':hover': {
      color: 'blue',
    },
  },
})

/**
 * 3
 */
const Button = styled(MuiButton)({
  color: 'black',
  fontSize: 20,
})

/**
 * 4
 */
const CustomComponent = styled(inProps => {
  const { label, value, ...props } = inProps
  return (
    <div {...props}>
      <div>{label}</div>
    </div>
  )
})({
  color: 'red',
  fontSize: 30,
})

/**
 * 5
 */
const InjectRoot = styled('div')({
  fontSize: '80px',
  color: 'blue',
})

const InjectItem = inProps => {
  const { label, component, ...props } = inProps

  return (
    <InjectRoot as={component} {...props}>
      {label}
    </InjectRoot>
  )
}
const Inject = inProps => {
  const { title, children, ...props } = inProps
  return (
    <Box {...props}>
      <Box textAlign={'center'} color={'lightblue'}>
        {title}
      </Box>
      {children}
    </Box>
  )
}

export default function JSSSimpleDemo() {
  return (
    <Root>
      <JSSSelect>
        <div className={'test'}>这里是一个选择器演示</div>
      </JSSSelect>
      <Button sx={{ color: 'green', fontSize: 80 }}>一个演示按钮</Button>
      <CustomComponent
        label={'自定义组件'}
        sx={{ color: 'black', fontSize: 80 }}
      />
      <InjectItem label={'普通 Item'} />
      <InjectItem component={Inject} title={'标题'} label={'实现注入的 Item'} />
    </Root>
  )
}
