import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import theme from '@/themes'
export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <html lang="en">
        <body>{children}</body>
      </html>
    </ThemeProvider>
  )
}
