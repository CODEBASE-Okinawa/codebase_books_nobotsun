import { FC, SetStateAction, Dispatch } from 'react'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles'
import { Drawer as MuiDrawer, List, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { DrawerHeader } from './DrawerHeader'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import PeopleIcon from '@mui/icons-material/People'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import WorkIcon from '@mui/icons-material/Work'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import Link from 'next/link'

const drawerWidth = 240

interface Props {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

const SIDE_MENU_LIST = [
  { title: '本管理', icon: <AdminPanelSettingsIcon />, link: '/manages/books' },
  { title: 'ユーザー一覧', icon: <PeopleIcon />, link: '/manages/users' },
  { title: '本一覧', icon: <MenuBookIcon />, link: '/books' },
  { title: '借りている本一覧', icon: <WorkIcon />, link: '/lendings' },
  { title: '予約している本一覧', icon: <CalendarMonthIcon />, link: '/reservations' },
]

export const Sidebar: FC<Props> = ({ isOpen, setIsOpen }) => {
  const theme = useTheme()

  return (
    <>
      <Drawer variant="permanent" open={isOpen}>
        <DrawerHeader>
          <IconButton onClick={() => setIsOpen(false)}>{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}</IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {SIDE_MENU_LIST.map((menu, index) => (
            <Link href={menu.link} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem key={menu.title} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: isOpen ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: isOpen ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {menu.icon}
                  </ListItemIcon>
                  <ListItemText primary={menu.title} sx={{ opacity: isOpen ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </>
  )
}
