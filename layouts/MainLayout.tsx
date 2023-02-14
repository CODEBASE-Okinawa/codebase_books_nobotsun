import { FC, ReactNode, useState } from 'react'
import { Box, Grid } from '@mui/material'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { DrawerHeader } from '@/components/DrawerHeader'

interface Props {
  children: ReactNode
}

export const MainLayout: FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Box sx={{ display: 'flex' }}>
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: '100vh' }}>
        <DrawerHeader />
        <Grid container spacing={3}>
          {children}
        </Grid>
      </Box>
    </Box>
  )
}
