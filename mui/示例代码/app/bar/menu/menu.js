import * as React from 'react'
import styled from '@mui/material/styles/styled'
import ListItem from '@mui/material/MenuList'
import connectThemeSystem from './connectThemeSystem'

const name = 'GuiMenu'

const { useClasses, useThemeProps } = connectThemeSystem(name, {
  root: ['root'],
})

const Root = styled(ListItem, {
  name,
  slot: 'Root',
  overridesResolver: (props, styles) => [styles.root],
})({
  background: '#fff',
})

export default function Menu(inProps) {
  const { classes, ...props } = useThemeProps(inProps)

  const classNames = useClasses({ classes })

  return <Root className={classNames.root} {...props} />
}
