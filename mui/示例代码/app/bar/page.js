import React from 'react'
import { Menu, MenuItem } from './menu'
import InboxIcon from '@mui/icons-material/Inbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'

export default function Page() {
  return (
    <Box sx={{ background: '#777', height: '100vh' }}>
      <Menu
        sx={{
          width: 256,
          height: 500,
        }}
      >
        <MenuItem label={'Inbox'} icon={<InboxIcon />} />
        <MenuItem label={'Drafts'} icon={<DraftsIcon />} />
        <Divider />
        <MenuItem label={'Trash'} />
        <MenuItem label={'Spam'} />
      </Menu>
    </Box>
  )
}
