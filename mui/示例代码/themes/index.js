'use client'

import createTheme from '@mui/material/styles/createTheme'
import components from './components'

const overrides = {
  palette: {
    primary: {
      main: '#2E50DF',
    },
  },
  components: {
    ...components,
  },
}

/**
 * 多个主题是可以覆盖的
 */
const theme = createTheme({}, overrides)

export default theme
