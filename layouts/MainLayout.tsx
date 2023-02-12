import { FC, ReactNode, useState } from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
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
      <CssBaseline />
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: '100vh' }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  )
}
