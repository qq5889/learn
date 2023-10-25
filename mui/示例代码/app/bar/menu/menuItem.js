import * as React from 'react'
import styled from '@mui/material/styles/styled'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import connectThemeSystem from './connectThemeSystem'

const name = 'GuiMenuItem'

// 第二个参数可以是函数
// props => ({
//   root: ['root'],
//   button: ['button'],
//   icon: ['icon'],
//   text: ['text'],
// })
const { useClasses, useThemeProps } = connectThemeSystem(name, {
  root: ['root'],
  button: ['button'],
  icon: ['icon'],
  text: ['text'],
})

const Root = styled(ListItem, {
  name,
  slot: 'Root',
  overridesResolver: (props, styles) => [styles.root],
})({})

const Button = styled(ListItemButton, {
  name,
  slot: 'Button',
  overridesResolver: (props, styles) => [styles.button],
})({})

const Icon = styled(ListItemIcon, {
  name,
  slot: 'Icon',
  overridesResolver: (props, styles) => [styles.icon],
})({})

const Text = styled(ListItemText, {
  name,
  slot: 'Text',
  overridesResolver: (props, styles) => [styles.text],
})({})

export default function MenuItem(inProps) {
  const {
    classes,
    icon,
    label,
    components = {},
    componentsProps = {},
    ...props
  } = useThemeProps(inProps)

  const {
    Button: ButtonComponent,
    Icon: IconComponent,
    Text: TextComponent,
  } = components

  const classNames = useClasses({ classes })

  return (
    <Root disablePadding className={classNames.root} {...props}>
      <Button as={ButtonComponent} className={classNames.button}>
        {icon && (
          <Icon as={IconComponent} className={classNames.icon}>
            {icon}
          </Icon>
        )}
        <Text as={TextComponent} className={classNames.text} primary={label} />
      </Button>
    </Root>
  )
}
